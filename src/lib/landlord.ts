import { NOT_ALLOCABLE, CATEGORY_LABELS, eur, type CheckInput, type Finding } from "./checks.ts";

// Vermieter-Modus: formale Vorpruefung der EIGENEN Abrechnung vor dem Versand.
// input.receivedOn = geplantes Versanddatum. Keine Rechtsberatung.
const DAY = 86400000;
const parse = (s: string) => new Date(s + "T00:00:00Z");
const r2 = (n: number) => Math.round(n * 100) / 100;

export function runLandlordChecks(i: CheckInput): { findings: Finding[]; sendDeadline: string; daysLeft: number } {
  const f: Finding[] = [];
  const end = parse(i.periodEnd);
  const dl = new Date(end);
  dl.setUTCMonth(dl.getUTCMonth() + 12);
  const sendDeadline = dl.toISOString().slice(0, 10);
  const send = parse(i.receivedOn);
  const daysLeft = Math.ceil((dl.getTime() - send.getTime()) / DAY);

  if (daysLeft < 0) {
    f.push({ id: "l-frist-abgelaufen", severity: "hoch", title: "Abrechnungsfrist bereits abgelaufen",
      detail: `Die Abrechnung muss dem Mieter bis ${sendDeadline} zugehen. Bei Versand am ${i.receivedOn} sind Nachforderungen grundsätzlich ausgeschlossen, außer Sie haben die Verspätung nicht zu vertreten. Ein Guthaben des Mieters bleibt bestehen.`,
      legal: "§ 556 Abs. 3 Satz 3 BGB", potentialEur: i.statedResult > 0 ? i.statedResult : undefined });
  } else if (daysLeft <= 30) {
    f.push({ id: "l-frist-knapp", severity: "mittel", title: `Frist knapp: noch ${daysLeft} Tage`,
      detail: `Die Abrechnung muss dem Mieter bis ${sendDeadline} zugehen, nicht nur abgesendet sein. Versenden Sie nachweisbar (Bote, Einwurf-Einschreiben) und rechnen Sie Postlaufzeit ein.`,
      legal: "§ 556 Abs. 3 BGB" });
  }

  const days = (end.getTime() - parse(i.periodStart).getTime()) / DAY + 1;
  if (days > 366) f.push({ id: "l-zeitraum", severity: "hoch", title: "Abrechnungszeitraum länger als 12 Monate",
    detail: `Der Zeitraum umfasst ${Math.round(days)} Tage. Teilen Sie die Abrechnung in zwei Zeiträume.`, legal: "§ 556 Abs. 3 Satz 1 BGB" });

  let sumShare = 0;
  for (const it of i.items) {
    sumShare += it.tenantShare;
    const name = it.label || CATEGORY_LABELS[it.category];
    if (NOT_ALLOCABLE.includes(it.category)) {
      f.push({ id: `l-nicht-umlagefaehig-${it.id}`, severity: "hoch", title: `Nicht umlagefähig: ${name}`,
        detail: `Diese Kostenart darf nicht auf Mieter umgelegt werden. Nehmen Sie die Position heraus (Anteil ${eur(it.tenantShare)}), sonst droht Rückforderung.`, legal: "§ 1 Abs. 2 BetrKV" });
      continue;
    }
    if (!it.inContract) f.push({ id: `l-vertrag-${it.id}`, severity: "hoch", title: `Nicht im Mietvertrag vereinbart: ${name}`,
      detail: "Ohne ausdrückliche Vereinbarung (z. B. Verweis auf die BetrKV) ist die Umlage unwirksam.", legal: "§ 556 Abs. 1 BGB" });
    if (it.category === "sonstiges") f.push({ id: `l-unklar-${it.id}`, severity: "mittel", title: `Position nicht zuordenbar: ${name}`,
      detail: "Nennen Sie die Kostenart nach BetrKV und halten Sie die Belege bereit.", legal: "§ 2 BetrKV" });
    if (it.key === "unbekannt") f.push({ id: `l-schluessel-${it.id}`, severity: "hoch", title: `Verteilerschlüssel fehlt: ${name}`,
      detail: "Der Umlageschlüssel muss in der Abrechnung angegeben und erläutert werden, sonst ist sie formal nicht nachvollziehbar.", legal: "§ 259 BGB" });
    if ((it.category === "wasser" || it.category === "abwasser") && it.key === "flaeche") f.push({ id: `l-wasser-${it.id}`, severity: "mittel", title: `Wasser nach Fläche: ${name}`,
      detail: "Bei vorhandenen Zählern oder entsprechender Vereinbarung ist nach Verbrauch abzurechnen.", legal: "§ 556a Abs. 1 BGB" });
    if (it.category === "heizung" || it.category === "warmwasser") {
      if (it.key === "flaeche" || it.consumptionPercent === 0) f.push({ id: `l-heiz-${it.id}`, severity: "hoch", title: `Heizkosten ohne Verbrauchsanteil: ${name}`,
        detail: "Es müssen 50 bis 70 Prozent nach Verbrauch verteilt werden; sonst können Mieter ihren Anteil um 15 Prozent kürzen.", legal: "§ 7, § 12 HeizkostenV" });
      else if (it.consumptionPercent !== undefined && (it.consumptionPercent < 50 || it.consumptionPercent > 70)) f.push({ id: `l-heiz-quote-${it.id}`, severity: "mittel", title: `Verbrauchsanteil ${it.consumptionPercent} Prozent: ${name}`,
        detail: "Zulässig sind grundsätzlich 50 bis 70 Prozent. Prüfen Sie die Vorgabe.", legal: "§ 7 Abs. 1 HeizkostenV" });
    }
    if (it.tenantShare > it.totalCost && it.totalCost > 0) f.push({ id: `l-anteil-${it.id}`, severity: "hoch", title: `Mieteranteil höher als Gesamtkosten: ${name}`,
      detail: "Rechenfehler: Der Anteil übersteigt die Hauskosten.", legal: "§ 259 BGB" });
    else if (it.key === "flaeche" && it.totalCost > 0 && i.totalArea > 0) {
      const exp = r2((it.totalCost * i.tenantArea) / i.totalArea);
      if (Math.abs(exp - it.tenantShare) > Math.max(1, exp * 0.02)) f.push({ id: `l-rechnung-${it.id}`, severity: "mittel", title: `Anteil weicht vom Flächenschlüssel ab: ${name}`,
        detail: `Rechnerisch ${eur(exp)}, angesetzt ${eur(it.tenantShare)}.`, legal: "§ 556a Abs. 1 BGB" });
    }
  }

  if (i.tenantArea > i.totalArea) f.push({ id: "l-flaeche", severity: "hoch", title: "Wohnfläche größer als Gesamtfläche", detail: "Der Flächenschlüssel ist fehlerhaft.", legal: "§ 556a BGB" });
  if (i.contractArea && i.contractArea > 0 && Math.abs(i.tenantArea - i.contractArea) / i.contractArea > 0.1)
    f.push({ id: "l-flaeche-vertrag", severity: "mittel", title: "Abrechnungsfläche weicht über 10 Prozent vom Mietvertrag ab", detail: "Prüfen Sie die tatsächliche Fläche; Mieter können nachmessen.", legal: "§ 556a BGB, WoFlV" });
  if (i.monthlyPrepayment > 0) {
    const months = Math.max(1, (end.getUTCFullYear() - parse(i.periodStart).getUTCFullYear()) * 12 + end.getUTCMonth() - parse(i.periodStart).getUTCMonth() + 1);
    const exp = r2(sumShare - i.monthlyPrepayment * months);
    if (Math.abs(exp - i.statedResult) > 1) f.push({ id: "l-ergebnis", severity: "hoch", title: "Endergebnis passt nicht zu den Einzelpositionen",
      detail: `Summe der Anteile minus Vorauszahlungen ergibt ${eur(exp)}, angegeben sind ${eur(i.statedResult)}.`, legal: "§ 259 BGB" });
  }
  if (i.vacancy) f.push({ id: "l-leerstand", severity: "mittel", title: "Leerstand: Anteil selbst tragen",
    detail: "Kosten leerstehender Einheiten dürfen nicht auf die übrigen Mieter verteilt werden.", legal: "§ 556a BGB" });
  if (i.previousYearTotal && i.previousYearTotal > 0 && (sumShare - i.previousYearTotal) / i.previousYearTotal > 0.2)
    f.push({ id: "l-vorjahr", severity: "hinweis", title: "Kosten über 20 Prozent höher als im Vorjahr", detail: "Legen Sie eine kurze Erläuterung bei; das senkt Rückfragen und Streit.", legal: "Wirtschaftlichkeitsgebot, § 556 Abs. 3 BGB" });

  f.push({ id: "l-belege", severity: "hinweis", title: "Belege vollständig bereithalten", detail: "Mieter dürfen die Originalbelege einsehen. Sortieren Sie Rechnungen, Verträge und Zählerprotokolle je Position vorab.", legal: "§ 259 BGB" });
  f.push({ id: "l-vorauszahlung", severity: "hinweis", title: "Vorauszahlungen anpassen", detail: "Nach der Abrechnung können Sie die Vorauszahlungen auf eine angemessene Höhe anheben (Mitteilung in Textform).", legal: "§ 560 Abs. 4 BGB" });
  f.push({ id: "l-zugang", severity: "hinweis", title: "Zugang nachweisen", detail: "Maßgeblich ist der Zugang beim Mieter. Dokumentieren Sie Einwurf oder Übergabe.", legal: "§ 556 Abs. 3 BGB" });

  const order = { hoch: 0, mittel: 1, hinweis: 2 } as const;
  f.sort((a, b) => order[a.severity] - order[b.severity]);
  return { findings: f, sendDeadline, daysLeft };
}
