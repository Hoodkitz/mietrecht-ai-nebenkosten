import { test } from "node:test";
import assert from "node:assert/strict";
import { runLandlordChecks } from "../src/lib/landlord.ts";
import type { CheckInput, CostItem } from "../src/lib/checks.ts";

const item = (o: Partial<CostItem> = {}): CostItem => ({
  id: "a", category: "grundsteuer", label: "", totalCost: 1000, tenantShare: 100, key: "flaeche", inContract: true, ...o,
});
const mk = (o: Partial<CheckInput> = {}): CheckInput => ({
  periodStart: "2023-01-01", periodEnd: "2023-12-31", receivedOn: "2024-03-01", monthlyPrepayment: 0, statedResult: 0,
  tenantArea: 50, totalArea: 500, vacancy: false, items: [item()], ...o,
});
const ids = (i: CheckInput) => runLandlordChecks(i).findings.map((f) => f.id);

test("Versandfrist: ok, knapp, abgelaufen, Grenztag", () => {
  assert.ok(!ids(mk()).some((x) => x.startsWith("l-frist")));
  assert.ok(ids(mk({ receivedOn: "2024-12-10" })).includes("l-frist-knapp"));
  assert.ok(!ids(mk({ receivedOn: "2024-12-31" })).includes("l-frist-abgelaufen"));
  assert.ok(ids(mk({ receivedOn: "2025-01-01" })).includes("l-frist-abgelaufen"));
  const r = runLandlordChecks(mk());
  assert.equal(r.sendDeadline, "2024-12-31");
});
test("Umlagefähigkeit, Vertrag, Schlüssel", () => {
  assert.ok(ids(mk({ items: [item({ category: "instandhaltung" })] })).includes("l-nicht-umlagefaehig-a"));
  assert.ok(ids(mk({ items: [item({ inContract: false })] })).includes("l-vertrag-a"));
  assert.ok(ids(mk({ items: [item({ key: "unbekannt" })] })).includes("l-schluessel-a"));
  assert.ok(ids(mk({ items: [item({ category: "wasser", totalCost: 500, tenantShare: 50 })] })).includes("l-wasser-a"));
});
test("Heizkosten, Rechenfehler, Fläche, Ergebnis", () => {
  assert.ok(ids(mk({ items: [item({ category: "heizung" })] })).includes("l-heiz-a"));
  assert.ok(ids(mk({ items: [item({ category: "heizung", key: "verbrauch", consumptionPercent: 80 })] })).includes("l-heiz-quote-a"));
  assert.ok(ids(mk({ items: [item({ tenantShare: 2000 })] })).includes("l-anteil-a"));
  assert.ok(ids(mk({ items: [item({ tenantShare: 300 })] })).includes("l-rechnung-a"));
  assert.ok(ids(mk({ tenantArea: 900 })).includes("l-flaeche"));
  assert.ok(ids(mk({ contractArea: 40 })).includes("l-flaeche-vertrag"));
  assert.ok(ids(mk({ monthlyPrepayment: 10, statedResult: 500 })).includes("l-ergebnis"));
  assert.ok(!ids(mk({ monthlyPrepayment: 10, statedResult: -20 })).includes("l-ergebnis"));
});
test("Zeitraum, Leerstand, Hinweise immer", () => {
  assert.ok(ids(mk({ periodStart: "2022-06-01" })).includes("l-zeitraum"));
  assert.ok(ids(mk({ vacancy: true })).includes("l-leerstand"));
  for (const x of ["l-belege", "l-vorauszahlung", "l-zugang"]) assert.ok(ids(mk()).includes(x));
});
