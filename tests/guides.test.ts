import { test } from "node:test";
import assert from "node:assert/strict";
import { GUIDES, getGuide } from "../src/lib/guides.ts";
import { TIERS, priceLabel } from "../src/lib/pricing.ts";

test("GUIDES: all slugs are unique and valid", () => {
  const slugs = GUIDES.map((g) => g.slug);
  const uniqueSlugs = new Set(slugs);
  assert.equal(slugs.length, uniqueSlugs.size, "All guide slugs must be unique");
  assert.ok(slugs.length >= 14, "Expected at least 14 guides");
});

test("GUIDES: new high-intent guides are present", () => {
  const requiredSlugs = [
    "betriebskostenabrechnung-pruefen",
    "co2-kosten-nebenkostenabrechnung",
    "grundsteuer-nebenkostenabrechnung",
    "nebenkostenabrechnung-vermieter-pruefen",
  ];
  for (const slug of requiredSlugs) {
    const g = getGuide(slug);
    assert.ok(g, `Guide ${slug} should exist`);
    assert.ok(g.title.length > 10, `${slug} title should be descriptive`);
    assert.ok(g.h1.length > 10, `${slug} h1 should be descriptive`);
    assert.ok(g.description.length > 20, `${slug} description should be descriptive`);
    assert.ok(g.sections.length >= 3, `${slug} should have at least 3 sections`);
    assert.ok(g.faq.length >= 1, `${slug} should have at least 1 FAQ`);
  }
});

test("GUIDES: getGuide returns correct guide or undefined", () => {
  const g = getGuide("nebenkostenabrechnung-pruefen");
  assert.equal(g?.slug, "nebenkostenabrechnung-pruefen");
  assert.equal(getGuide("non-existent-slug"), undefined);
});

test("TIERS: pricing structure matches strategy (4.90, 12.90, 19.90)", () => {
  assert.equal(TIERS.schnell.cents, 490);
  assert.equal(TIERS.report.cents, 1290);
  assert.equal(TIERS.vermieter.cents, 1990);
  assert.ok(TIERS.schnell.features.length >= 3);
  assert.ok(TIERS.report.features.length >= 3);
  assert.ok(TIERS.vermieter.features.length >= 3);
  assert.equal(priceLabel(490), (4.9).toLocaleString("de-DE", { style: "currency", currency: "EUR" }));
});
