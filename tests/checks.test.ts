import { test } from "node:test";
import assert from "node:assert/strict";
import { runChecks, type CheckInput } from "../src/lib/checks.ts";

const base: CheckInput = {
  periodStart: "2023-01-01", periodEnd: "2023-12-31", receivedOn: "2025-02-01", today: "2025-03-01",
  monthlyPrepayment: 100, statedResult: 300, tenantArea: 50, totalArea: 500, vacancy: false,
  items: [
    { id: "a", category: "verwaltung", label: "", totalCost: 1000, tenantShare: 100, key: "flaeche", inContract: true },
    { id: "b", category: "heizung", label: "", totalCost: 5000, tenantShare: 500, key: "flaeche", inContract: true },
  ],
};

test("late statement, non-allocable and heating findings", () => {
  const ids = runChecks(base).findings.map((f) => f.id);
  assert.ok(ids.includes("frist-abrechnung"));
  assert.ok(ids.includes("nicht-umlagefaehig-a"));
  assert.ok(ids.includes("heiz-verbrauch-b"));
  assert.ok(ids.includes("ergebnis"));
});

test("timely statement has no deadline finding", () => {
  const ids = runChecks({ ...base, receivedOn: "2024-06-01", today: "2024-07-01" }).findings.map((f) => f.id);
  assert.ok(!ids.includes("frist-abrechnung"));
});
