// Regelbasierte Prüfung einer Nebenkostenabrechnung. Reine Funktionen, keine Rechtsberatung.

export type Category =
  | "grundsteuer" | "wasser" | "abwasser" | "heizung" | "warmwasser" | "aufzug"
  | "strassenreinigung_muell" | "hausreinigung" | "garten" | "beleuchtung"
  | "schornstein" | "versicherung" | "hausmeister" | "kabel" | "waschraum"
  | "sonstige_betriebskosten"
  | "verwaltung" | "instandhaltung" | "ruecklage" | "bankgebuehren" | "leerstand" | "sonstiges";

export const CATEGORY_LABELS: Record<Category, string> = {
  grundsteuer: "Grundsteuer",
  wasser: "Wasserversorgung",
  abwasser: "Entwässerung / Abwasser",
  heizung: "Heizkosten",
  warmwasser: "Warmwasser",
  aufzug: "Aufzug",
  strassenreinigung_muell: "Straßenreinigung / Müllabfuhr",
  hausreinigung: "Hausreinigung / Ungezieferbekämpfung",
  garten: "Gartenpflege",
  beleuchtung: "Allgemeinstrom / Beleuchtung",
  schornstein: "Schornsteinreinigung",
  versicherung: "Gebäude- / Haftpflichtversicherung",
  hausmeister: "Hausmeister",
  kabel: "Kabel / Antenne",
  waschraum: "Gemeinschaftswaschmaschine",
  sonstige_betriebskosten: "Sonstige Betriebskosten (laut Mietvertrag)",
  verwaltung: "Verwaltungskosten",
  instandhaltung: "Instandhaltung / Reparatur",
  ruecklage: "Rücklagen / Instandhaltungsrücklage",
  bankgebuehren: "Bankgebühren / Kontoführung",
  leerstand: "Leerstand / Mietausfall",
  sonstiges: "Sonstiges (nicht zuordenbar)",
};

export const NOT_ALLOCABLE: Category[] = ["verwaltung", "instandhaltung", "ruecklage", "bankgebuehren", "leerstand"];

export type Key = "flaeche" | "verbrauch" | "personen" | "einheit" | "miteigentum" | "unbekannt";
export const KEY_LABELS: Record<Key, string> = {
  flaeche: "Wohnfläche",
  verbrauch: "Verbrauch (Zähler)",
  personen: "Personenzahl",
  einheit: "Pro Wohneinheit",
  miteigentum: "Miteigentumsanteile",
  unbekannt: "Nicht angegeben",
};

export interface CostItem {
  id: string;
  category: Category;
  label: string;
  totalCost: number; // Gesamtkosten Haus in EUR
  tenantShare: number; // Anteil Mieter in EUR laut Abrechnung
  key: Key;
  inContract: boolean; // laut Mietvertrag umlagefähig vereinbart
  consumptionPercent?: number; // nur Heizung/Warmwasser: verbrauchsabhängiger Anteil in %
}

export interface CheckInput {
  periodStart: string; // ISO yyyy-mm-dd
  periodEnd: string;
  receivedOn: string;
  today?: string;
  monthlyPrepayment: number;
  statedResult: number; // positiv = Nachzahlung, negativ = Guthaben
  tenantArea: number;
  totalArea: number;
  contractArea?: number;
  previousYearTotal?: number;
  vacancy: boolean;
  items: CostItem[];
}

export type Severity = "hoch" | "mittel" | "hinweis";

export interface Finding {
  id: string;
  severity: Severity;
  title: string;
  detail: string;
  legal: string;
  potentialEur?: number;
}

export interface Deadlines {
  abrechnungsfristEnde: string;
  einwendungsfristEnde: string;
  abrechnungVerspaetet: boolean;
  einwendungsfristLaeuft: boolean;
  tageBisEinwendung: number;
}

const DAY = 86400000;
const parse = (s: string) => new Date(s + "T00:00:00Z");
const iso = (d: Date) => d.toISOString().slice(0, 10);
const addMonths = (s: string, m: number) => {
  const d = parse(s);
  d.setUTCMonth(d.getUTCMonth() + m);
  return d;
};
const r2 = (n: number) => Math.round(n * 100) / 100;
export const eur = (n: number) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });

export function computeDeadlines(i: CheckInput): Deadlines {
  const today = parse(i.today ?? iso(new Date()));
  // Abrechnung muss dem Mieter spätestens 12 Monate nach Ende des Abrechnungszeitraums zugehen (§ 556 Abs. 3 BGB).
  const abrEnde = addMonths(i.periodEnd, 12);
  const einw = addMonths(i.receivedOn, 12);
  return {
    abrechnungsfristEnde: iso(abrEnde),
    einwendungsfristEnde: iso(einw),
    abrechnungVerspaetet: parse(i.receivedOn) > abrEnde,
    einwendungsfristLaeuft: today <= einw,
    tageBisEinwendung: Math.ceil((einw.getTime() - today.getTime()) / DAY),
  };
}

export function validateInput(i: CheckInput): string[] {
  const e: string[] = [];
  if (!i.periodStart || !i.periodEnd) e.push("Bitte den Abrechnungszeitraum angeben.");
  else if (parse(i.periodEnd) < parse(i.periodStart)) e.push("Das Ende des Abrechnungszeitraums liegt vor dem Beginn.");
  if (!i.receivedOn) e.push("Bitte das Datum angeben, an dem die Abrechnung zugegangen ist.");
  if (!(i.tenantArea > 0) || !(i.totalArea > 0)) e.push("Bitte Wohnfläche und Gesamtfläche (größer 0) angeben.");
  if (!i.items || i.items.length === 0) e.push("Bitte mindestens eine Kostenposition erfassen.");
  return e;
}

export function runChecks(i: CheckInput): { findings: Finding[]; deadlines: Deadlines } {
  const f: Finding[] = [];
  const d = computeDeadlines(i);

  // 1) Abrechnungsfrist
  if (d.abrechnungVerspaetet) {
    const nachzahlung = Math.max(0, i.statedResult);
    f.push({
      id: "frist-abrechnung",
      severity: "hoch",
      title: "Abrechnung wurde zu spät zugestellt",
      detail: `Der Abrechnungszeitraum endete am ${i.periodEnd}, die Frist von 12 Monaten lief am ${d.abrechnungsfristEnde} ab, zugegangen ist die Abrechnung aber erst am ${i.receivedOn}. Nachforderungen sind nach Fristablauf grundsätzlich ausgeschlossen, es sei denn, der Vermieter hat die Verspätung nicht zu vertreten. Ein Guthaben bleibt Ihnen erhalten.`,
      legal: "§ 556 Abs. 3 Satz 2 BGB",
      potentialEur: nachzahlung || undefined,
    });
  }

  // 2) Zeitraum
  const days = (parse(i.periodEnd).getTime() - parse(i.periodStart).getTime()) / DAY + 1;
  if (days > 366) {
    f.push({
      id: "zeitraum",
      severity: "mittel",
      title: "Abrechnungszeitraum länger als 12 Monate",
      detail: `Der angegebene Zeitraum umfasst ${Math.round(days)} Tage. Abrechnungszeiträume dürfen höchstens 12 Monate betragen.`,
      legal: "§ 556 Abs. 3 Satz 1 BGB",
    });
  }

  // 3) Einwendungsfrist-Hinweis
  if (d.einwendungsfristLaeuft) {
    f.push({
      id: "frist-einwendung",
      severity: d.tageBisEinwendung <= 60 ? "hoch" : "hinweis",
      title: `Einwendungsfrist endet am ${d.einwendungsfristEnde}`,
      detail: `Einwendungen gegen die Abrechnung müssen dem Vermieter spätestens 12 Monate nach Zugang mitgeteilt werden (noch ${d.tageBisEinwendung} Tage). Danach können Sie Fehler nur noch geltend machen, wenn Sie die Verspätung nicht zu vertreten haben. Widersprechen Sie schriftlich und nachweisbar.`,
      legal: "§ 556 Abs. 3 Satz 5 und 6 BGB",
    });
  } else {
    f.push({
      id: "frist-einwendung-abgelaufen",
      severity: "mittel",
      title: "Einwendungsfrist ist voraussichtlich abgelaufen",
      detail: `Die 12-Monats-Frist ab Zugang endete am ${d.einwendungsfristEnde}. Formale Einwendungen sind damit meist ausgeschlossen. Prüfen Sie, ob Sie die Verspätung nicht zu vertreten haben.`,
      legal: "§ 556 Abs. 3 Satz 5 BGB",
    });
  }

  // 4) Positionen
  let sumTotal = 0;
  let sumShare = 0;
  for (const it of i.items) {
    sumTotal += it.totalCost;
    sumShare += it.tenantShare;
    const name = it.label || CATEGORY_LABELS[it.category];

    if (NOT_ALLOCABLE.includes(it.category)) {
      f.push({
        id: `nicht-umlagefaehig-${it.id}`,
        severity: "hoch",
        title: `Nicht umlagefähig: ${name}`,
        detail: `„${CATEGORY_LABELS[it.category]}“ gehört nicht zu den Betriebskosten, die auf Mieter umgelegt werden dürfen. Der Anteil von ${eur(it.tenantShare)} kann in der Regel gestrichen werden.`,
        legal: "§ 1 Abs. 2 BetrKV, § 556 BGB",
        potentialEur: it.tenantShare,
      });
      continue;
    }
    if (it.category === "sonstiges") {
      f.push({
        id: `unklar-${it.id}`,
        severity: "mittel",
        title: `Unklare Position: ${name}`,
        detail: `Die Position ist keiner Betriebskostenart der Betriebskostenverordnung zuzuordnen. Fordern Sie eine Erläuterung und die Belege an.`,
        legal: "§ 2 BetrKV, § 259 BGB",
        potentialEur: it.tenantShare,
      });
    }
    if (it.category === "hausmeister") {
      f.push({
        id: `hausmeister-${it.id}`,
        severity: "hinweis",
        title: "Hausmeisterkosten: Anteile für Verwaltung und Reparatur abziehen",
        detail: `Nur Tätigkeiten wie Reinigung, Gartenpflege oder Winterdienst sind umlagefähig. Reparatur- und Verwaltungsanteile müssen herausgerechnet sein. Fragen Sie nach der Tätigkeitsaufstellung.`,
        legal: "§ 2 Nr. 14 BetrKV",
      });
    }
    if (it.category === "kabel") {
      f.push({
        id: `kabel-${it.id}`,
        severity: "hinweis",
        title: "Kabelgebühren: Umlage nur bei wirksamer Vereinbarung",
        detail: `Seit dem 1. Juli 2024 ist die Umlage von Kabelgebühren über die Betriebskosten (Nebenkostenprivileg) entfallen. Prüfen Sie, ob die Kosten noch abgerechnet werden dürfen.`,
        legal: "§ 2 Nr. 15 BetrKV (a. F.), TKG",
      });
    }
    if (!it.inContract && !NOT_ALLOCABLE.includes(it.category)) {
      f.push({
        id: `vertrag-${it.id}`,
        severity: "hoch",
        title: `Im Mietvertrag nicht vereinbart: ${name}`,
        detail: `Betriebskosten dürfen nur umgelegt werden, wenn der Mietvertrag dies ausdrücklich vorsieht (Verweis auf die Betriebskostenverordnung genügt). Prüfen Sie den Vertrag. Anteil: ${eur(it.tenantShare)}.`,
        legal: "§ 556 Abs. 1 BGB",
        potentialEur: it.tenantShare,
      });
    }
    // Verteilerschlüssel
    if ((it.category === "wasser" || it.category === "abwasser") && it.key === "flaeche") {
      f.push({
        id: `schluessel-${it.id}`,
        severity: "mittel",
        title: `Wasserkosten nach Fläche verteilt: ${name}`,
        detail: `Verbrauchsabhängige Kosten sollen nach Verbrauch abgerechnet werden, sofern Zähler vorhanden sind oder die Abrechnung nach Verbrauch vereinbart ist. Prüfen Sie, ob ein anderer Schlüssel zulässig ist.`,
        legal: "§ 556a Abs. 1 BGB",
      });
    }
    if (it.key === "unbekannt") {
      f.push({
        id: `schluessel-unbekannt-${it.id}`,
        severity: "mittel",
        title: `Verteilerschlüssel fehlt: ${name}`,
        detail: `Die Abrechnung muss den Umlageschlüssel erkennen lassen, sonst ist sie formal nicht nachvollziehbar.`,
        legal: "§ 259 BGB, § 556 Abs. 3 BGB",
      });
    }
    // Heizkosten
    if (it.category === "heizung" || it.category === "warmwasser") {
      if (it.key === "flaeche" || it.consumptionPercent === 0) {
        f.push({
          id: `heiz-verbrauch-${it.id}`,
          severity: "hoch",
          title: `Heizkosten ohne Verbrauchserfassung: ${name}`,
          detail: `Heiz- und Warmwasserkosten müssen zu 50 bis 70 Prozent nach Verbrauch abgerechnet werden. Bei Verstoß dürfen Sie Ihren Kostenanteil um 15 Prozent kürzen (rechnerisch ${eur(r2(it.tenantShare * 0.15))}).`,
          legal: "§ 7 Abs. 1, § 12 Abs. 1 HeizkostenV",
          potentialEur: r2(it.tenantShare * 0.15),
        });
      } else if (it.consumptionPercent !== undefined && (it.consumptionPercent < 50 || it.consumptionPercent > 70)) {
        f.push({
          id: `heiz-quote-${it.id}`,
          severity: "mittel",
          title: `Verbrauchsanteil außerhalb 50 bis 70 Prozent: ${name}`,
          detail: `Angegebener Verbrauchsanteil: ${it.consumptionPercent} Prozent. Zulässig sind grundsätzlich 50 bis 70 Prozent (Ausnahmen für sehr schlecht gedämmte Gebäude). Ein Kürzungsrecht von 15 Prozent kommt in Betracht.`,
          legal: "§ 7 Abs. 1, § 12 HeizkostenV",
          potentialEur: r2(it.tenantShare * 0.15),
        });
      }
    }
    // Plausibilität Anteil
    if (it.tenantShare > it.totalCost && it.totalCost > 0) {
      f.push({
        id: `anteil-${it.id}`,
        severity: "hoch",
        title: `Mieteranteil höher als Gesamtkosten: ${name}`,
        detail: `Ihr Anteil (${eur(it.tenantShare)}) übersteigt die Gesamtkosten des Hauses (${eur(it.totalCost)}). Das ist ein Rechenfehler.`,
        legal: "§ 259 BGB",
        potentialEur: r2(it.tenantShare - it.totalCost),
      });
    } else if (it.key === "flaeche" && it.totalCost > 0 && i.totalArea > 0) {
      const expected = r2((it.totalCost * i.tenantArea) / i.totalArea);
      if (Math.abs(expected - it.tenantShare) > Math.max(1, expected * 0.02)) {
        f.push({
          id: `rechnung-${it.id}`,
          severity: it.tenantShare > expected ? "mittel" : "hinweis",
          title: `Anteil weicht von Flächenschlüssel ab: ${name}`,
          detail: `Bei Verteilung nach Fläche (${i.tenantArea} von ${i.totalArea} m²) ergibt sich ${eur(expected)}, abgerechnet wurden ${eur(it.tenantShare)}.`,
          legal: "§ 556a Abs. 1 BGB",
          potentialEur: it.tenantShare > expected ? r2(it.tenantShare - expected) : undefined,
        });
      }
    }
  }

  // 5) Fläche
  if (i.tenantArea > i.totalArea) {
    f.push({
      id: "flaeche-gesamt",
      severity: "hoch",
      title: "Wohnfläche größer als Gesamtfläche",
      detail: "Ihre Wohnfläche übersteigt die angesetzte Gesamtfläche. Der Flächenschlüssel ist damit fehlerhaft.",
      legal: "§ 556a Abs. 1 BGB",
    });
  }
  if (i.contractArea && i.contractArea > 0 && i.tenantArea > i.contractArea * 1.0) {
    const dev = ((i.tenantArea - i.contractArea) / i.contractArea) * 100;
    if (dev > 0.5) {
      f.push({
        id: "flaeche-abweichung",
        severity: dev > 10 ? "hoch" : "mittel",
        title: `Abrechnungsfläche ${dev.toFixed(1)} Prozent größer als im Mietvertrag`,
        detail: `Die Abrechnung setzt ${i.tenantArea} m² an, der Mietvertrag nennt ${i.contractArea} m². Abgerechnet werden muss nach der tatsächlichen Fläche; messen Sie nach (WoFlV). Abweichungen sollten Sie klären lassen.`,
        legal: "§ 556a BGB, WoFlV",
      });
    }
  }

  // 6) Summen
  const itemSum = r2(sumTotal);
  void itemSum;
  const prepaid = r2(i.monthlyPrepayment * monthsBetween(i.periodStart, i.periodEnd));
  if (i.monthlyPrepayment > 0) {
    const expectedResult = r2(sumShare - prepaid);
    if (Math.abs(expectedResult - i.statedResult) > 1) {
      f.push({
        id: "ergebnis",
        severity: "hoch",
        title: "Endergebnis stimmt nicht mit den Einzelpositionen überein",
        detail: `Summe Ihrer Anteile ${eur(r2(sumShare))} abzüglich Vorauszahlungen ${eur(prepaid)} ergibt ${eur(expectedResult)}. In der Abrechnung steht ${eur(i.statedResult)}. Positiv = Nachzahlung.`,
        legal: "§ 259 BGB",
        potentialEur: i.statedResult > expectedResult ? r2(i.statedResult - expectedResult) : undefined,
      });
    }
  }

  // 7) Vorjahr
  if (i.previousYearTotal && i.previousYearTotal > 0) {
    const inc = ((sumShare - i.previousYearTotal) / i.previousYearTotal) * 100;
    if (inc > 20) {
      f.push({
        id: "vorjahr",
        severity: "mittel",
        title: `Kosten ${inc.toFixed(0)} Prozent höher als im Vorjahr`,
        detail: `Starke Steigerungen sind kein Fehler an sich, aber ein Anlass für Belegeinsicht. Der Vermieter muss unnötig hohe Kosten vermeiden (Wirtschaftlichkeitsgebot).`,
        legal: "§ 556 Abs. 3 Satz 1 BGB (Wirtschaftlichkeitsgebot)",
      });
    }
  }

  // 8) Leerstand
  if (i.vacancy) {
    f.push({
      id: "leerstand",
      severity: "mittel",
      title: "Leerstand im Haus: Anteil darf nicht auf Sie umgelegt werden",
      detail: "Kosten für leerstehende Wohnungen trägt der Vermieter. Prüfen Sie, ob Gesamtfläche und Gesamtkosten korrekt angesetzt sind und der Leerstand nicht auf die übrigen Mieter verteilt wurde.",
      legal: "§ 556a BGB",
    });
  }

  // 9) Immer
  f.push({
    id: "belegeinsicht",
    severity: "hinweis",
    title: "Belegeinsicht verlangen",
    detail: "Sie haben das Recht, die Originalbelege (Rechnungen, Verträge, Zählerstände) einzusehen. Das ist der wirksamste Hebel, um Fehler zu belegen.",
    legal: "§ 259 BGB",
  });
  f.push({
    id: "vorauszahlung",
    severity: "hinweis",
    title: "Vorauszahlungen anpassen",
    detail: "Nach einer Abrechnung können Sie und der Vermieter die Vorauszahlungen auf eine angemessene Höhe anpassen.",
    legal: "§ 560 Abs. 4 BGB",
  });

  const order = { hoch: 0, mittel: 1, hinweis: 2 } as const;
  f.sort((a, b) => order[a.severity] - order[b.severity]);
  return { findings: f, deadlines: d };
}

function monthsBetween(start: string, end: string): number {
  if (!start || !end) return 12;
  const s = parse(start);
  const e = parse(end);
  const m = (e.getUTCFullYear() - s.getUTCFullYear()) * 12 + (e.getUTCMonth() - s.getUTCMonth()) + 1;
  return Math.max(1, m);
}

export function preview(findings: Finding[]) {
  const real = findings.filter((x) => x.severity !== "hinweis");
  return {
    total: findings.length,
    relevant: real.length,
    potentialEur: r2(real.reduce((s, x) => s + (x.potentialEur ?? 0), 0)),
    teasers: real.slice(0, 3).map((x) => ({ severity: x.severity, title: x.title })),
  };
}

export function widerspruchsbrief(i: CheckInput, findings: Finding[]): string {
  const real = findings.filter((x) => x.severity !== "hinweis");
  const lines = real.map((x, n) => `${n + 1}. ${x.title} (${x.legal})`).join("\n");
  return `[Ihr Name]
[Ihre Anschrift]

[Name Vermieter / Hausverwaltung]
[Anschrift]

[Ort], den [Datum]

Betrifft: Nebenkostenabrechnung für den Zeitraum ${i.periodStart} bis ${i.periodEnd}, Mietobjekt [Adresse]

Sehr geehrte Damen und Herren,

die Abrechnung vom [Datum der Abrechnung], zugegangen am ${i.receivedOn}, habe ich geprüft. Ich erhebe fristgerecht Einwendungen gegen die Abrechnung, insbesondere wegen folgender Punkte:

${lines || "(keine Beanstandungen aus der Regelprüfung)"}

Bitte übersenden Sie mir korrigierte Abrechnung. Zur Prüfung bitte ich um Einsicht in die Originalbelege (§ 259 BGB); bitte nennen Sie mir einen Termin oder senden Sie Kopien gegen Kostenerstattung zu. Bis zur Klärung behalte ich mir die Zahlung einer etwaigen Nachforderung vor. Ich bitte um Antwort bis zum [Datum, ca. 14 Tage].

Mit freundlichen Grüßen
[Unterschrift]

Hinweis: Dieser Mustertext ist keine Rechtsberatung. Bitte prüfen und passen Sie ihn an Ihren Einzelfall an.`;
}
