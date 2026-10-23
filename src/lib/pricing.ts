export type Tier = "schnell" | "report";
export const TIERS: Record<Tier, { name: string; cents: number; features: string[] }> = {
  schnell: {
    name: "Schnellcheck",
    cents: 490,
    features: ["Alle gefundenen Auffälligkeiten", "Rechtsgrundlagen je Punkt", "Fristenrechner"],
  },
  report: {
    name: "Report + Widerspruchsbrief",
    cents: 1290,
    features: ["Alles aus dem Schnellcheck", "Fertiger Widerspruchsbrief als Vorlage", "Checkliste Belegeinsicht"],
  },
};
export const priceLabel = (cents: number) => (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
