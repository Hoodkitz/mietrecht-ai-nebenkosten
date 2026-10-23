import { test } from "node:test";
import assert from "node:assert/strict";
import { runChecks, computeDeadlines, validateInput, preview, potentialTotal, widerspruchsbrief, type CheckInput, type CostItem } from "../src/lib/checks.ts";

const item = (o: Partial<CostItem> = {}): CostItem => ({
  id: "a", category: "grundsteuer", label: "", totalCost: 1000, tenantShare: 100, key: "flaeche", inContract: true, ...o,
});
const mk = (o: Partial<CheckInput> = {}): CheckInput => ({
  periodStart: "2023-01-01", periodEnd: "2023-12-31", receivedOn: "2024-06-01", today: "2024-07-01",
  monthlyPrepayment: 0, statedResult: 0, tenantArea: 50, totalArea: 500, vacancy: false, items: [item()], ...o,
});
const ids = (i: CheckInput) => runChecks(i).findings.map((f) => f.id);
const has = (i: CheckInput, id: string) => ids(i).includes(id);

test("Frist: rechtzeitig vs verspätet, Grenzfall genau 12 Monate", () => {
  assert.ok(!has(mk(), "frist-abrechnung"));
  assert.ok(!has(mk({ receivedOn: "2024-12-31" }), "frist-abrechnung"));
  assert.ok(has(mk({ receivedOn: "2025-01-01" }), "frist-abrechnung"));
});
test("Frist: Schaltjahr/Monatsende wird berechnet", () => {
  const d = computeDeadlines(mk({ periodEnd: "2023-12-31", receivedOn: "2024-02-29" }));
  assert.equal(d.abrechnungsfristEnde, "2024-12-31");
  assert.equal(d.einwendungsfristEnde, "2025-03-01");
});
test("Einwendungsfrist: laufend (knapp = hoch), abgelaufen", () => {
  const near = runChecks(mk({ receivedOn: "2024-08-01", today: "2025-07-01" })).findings.find((f) => f.id === "frist-einwendung");
  assert.equal(near?.severity, "hoch");
  const far = runChecks(mk()).findings.find((f) => f.id === "frist-einwendung");
  assert.equal(far?.severity, "hinweis");
  assert.ok(has(mk({ receivedOn: "2024-01-10", today: "2025-06-01" }), "frist-einwendung-abgelaufen"));
});
test("Zeitraum länger als 12 Monate", () => {
  assert.ok(has(mk({ periodStart: "2022-12-01" }), "zeitraum"));
  assert.ok(!has(mk(), "zeitraum"));
});
test("nicht umlagefähige Kategorien", () => {
  for (const c of ["verwaltung", "instandhaltung", "ruecklage", "bankgebuehren", "leerstand"] as const)
    assert.ok(has(mk({ items: [item({ category: c })] }), "nicht-umlagefaehig-a"), c);
  assert.ok(!has(mk(), "nicht-umlagefaehig-a"));
});
test("sonstiges, Hausmeister, Kabel Hinweise", () => {
  assert.ok(has(mk({ items: [item({ category: "sonstiges" })] }), "unklar-a"));
  assert.ok(has(mk({ items: [item({ category: "hausmeister" })] }), "hausmeister-a"));
  assert.ok(has(mk({ items: [item({ category: "kabel" })] }), "kabel-a"));
});
test("nicht im Mietvertrag vereinbart", () => {
  assert.ok(has(mk({ items: [item({ inContract: false })] }), "vertrag-a"));
  // nicht umlagefähig wird nicht doppelt als Vertragsfehler gemeldet
  assert.ok(!has(mk({ items: [item({ category: "verwaltung", inContract: false })] }), "vertrag-a"));
});
test("Verteilerschlüssel: Wasser nach Fläche, unbekannt", () => {
  assert.ok(has(mk({ items: [item({ category: "wasser", totalCost: 500, tenantShare: 50 })] }), "schluessel-a"));
  assert.ok(!has(mk({ items: [item({ category: "wasser", key: "verbrauch" })] }), "schluessel-a"));
  assert.ok(has(mk({ items: [item({ key: "unbekannt" })] }), "schluessel-unbekannt-a"));
});
test("Heizkosten: keine Verbrauchserfassung, Quote außerhalb 50-70, Grenzwerte ok", () => {
  const h = (o: Partial<CostItem>) => mk({ items: [item({ category: "heizung", key: "verbrauch", tenantShare: 100, ...o })] });
  assert.ok(has(h({ key: "flaeche", totalCost: 1000, tenantShare: 100 }), "heiz-verbrauch-a"));
  assert.ok(has(h({ consumptionPercent: 0 }), "heiz-verbrauch-a"));
  assert.ok(has(h({ consumptionPercent: 49 }), "heiz-quote-a"));
  assert.ok(has(h({ consumptionPercent: 71 }), "heiz-quote-a"));
  for (const p of [50, 70]) assert.ok(!has(h({ consumptionPercent: p }), "heiz-quote-a"), String(p));
  assert.ok(!has(h({}), "heiz-quote-a"));
  const f = runChecks(h({ key: "flaeche", tenantShare: 100 })).findings.find((x) => x.id === "heiz-verbrauch-a");
  assert.equal(f?.potentialEur, 15);
});
test("Anteil größer als Gesamtkosten; Abweichung vom Flächenschlüssel", () => {
  assert.ok(has(mk({ items: [item({ totalCost: 100, tenantShare: 150 })] }), "anteil-a"));
  assert.ok(has(mk({ items: [item({ totalCost: 1000, tenantShare: 300 })] }), "rechnung-a")); // erwartet 100
  assert.ok(!has(mk({ items: [item({ totalCost: 1000, tenantShare: 100.5 })] }), "rechnung-a")); // Toleranz
  assert.ok(!has(mk({ items: [item({ totalCost: 0, tenantShare: 0 })] }), "rechnung-a"));
});
test("Flächen: Wohnfläche > Gesamtfläche, Abweichung zum Vertrag", () => {
  assert.ok(has(mk({ tenantArea: 600 }), "flaeche-gesamt"));
  assert.ok(has(mk({ contractArea: 40 }), "flaeche-abweichung"));
  const hi = runChecks(mk({ contractArea: 40 })).findings.find((f) => f.id === "flaeche-abweichung");
  assert.equal(hi?.severity, "hoch");
  assert.ok(!has(mk({ contractArea: 50 }), "flaeche-abweichung"));
  assert.ok(!has(mk({ contractArea: 60 }), "flaeche-abweichung"));
});
test("Endergebnis: stimmig, falsch, ohne Vorauszahlung wird übersprungen", () => {
  // Anteil 100, Vorauszahlung 12 x 10 = 120 => -20
  assert.ok(!has(mk({ monthlyPrepayment: 10, statedResult: -20 }), "ergebnis"));
  assert.ok(has(mk({ monthlyPrepayment: 10, statedResult: 80 }), "ergebnis"));
  assert.ok(!has(mk({ monthlyPrepayment: 0, statedResult: 999 }), "ergebnis"));
});
test("Vorjahr >20 Prozent, Leerstand, immer-Hinweise", () => {
  assert.ok(has(mk({ previousYearTotal: 50 }), "vorjahr"));
  assert.ok(!has(mk({ previousYearTotal: 95 }), "vorjahr"));
  assert.ok(has(mk({ vacancy: true }), "leerstand"));
  assert.ok(has(mk(), "belegeinsicht") && has(mk(), "vorauszahlung"));
});
test("Sortierung nach Schweregrad", () => {
  const sev = runChecks(mk({ items: [item({ category: "verwaltung" })], receivedOn: "2025-02-01" })).findings.map((f) => f.severity);
  assert.equal(sev[0], "hoch");
  assert.equal(sev[sev.length - 1], "hinweis");
});
test("validateInput", () => {
  assert.equal(validateInput(mk()).length, 0);
  assert.ok(validateInput(mk({ periodEnd: "2022-01-01" })).length > 0);
  assert.ok(validateInput(mk({ items: [] })).length > 0);
  assert.ok(validateInput(mk({ tenantArea: 0 })).length > 0);
  assert.ok(validateInput(mk({ receivedOn: "" })).length > 0);
});
test("Potenzial: keine Doppelzählung je Position, verspätet deckt alles, Cap", () => {
  // Heizung ohne Verbrauch UND nicht im Vertrag: nur größter Einzelfund (Anteil 200), nicht 200+30
  const i = mk({ items: [item({ category: "heizung", key: "flaeche", inContract: false, totalCost: 2000, tenantShare: 200 })] });
  assert.equal(potentialTotal(runChecks(i).findings), 200);
  // verspätet mit Nachzahlung 300: Potenzial = 300, auch wenn weitere Funde existieren
  const late = mk({ receivedOn: "2025-02-01", statedResult: 300, items: [item({ category: "verwaltung", tenantShare: 100 })] });
  assert.equal(potentialTotal(runChecks(late).findings), 300);
  // Cap
  assert.equal(potentialTotal(runChecks(i).findings, 50), 50);
  assert.equal(preview(runChecks(i).findings, 50).potentialEur, 50);
});
test("Widerspruchsbrief enthält Zeitraum und Beanstandungen", () => {
  const i = mk({ items: [item({ category: "verwaltung" })] });
  const b = widerspruchsbrief(i, runChecks(i).findings);
  assert.match(b, /2023-01-01 bis 2023-12-31/);
  assert.match(b, /Verwaltungskosten/);
});
