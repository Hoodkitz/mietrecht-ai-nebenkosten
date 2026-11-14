export type Tier = "schnell" | "report" | "vermieter";
export const TIERS: Record<Tier, { name: string; cents: number; features: string[] }> = {
  schnell: {
    name: "Schnellcheck",
    cents: 490,
    features: [
      "Alle gefundenen Auffälligkeiten & Rechenfehler",
      "Rechtsgrundlagen & Paragrafen (§ 556 BGB, BetrKV, HeizkostenV)",
      "Fristenrechner (Abrechnungs- & Einwendungsfrist)",
      "100 % datensparsam ohne Dokumenten-Upload",
    ],
  },
  report: {
    name: "Report + Widerspruchsbrief",
    cents: 1290,
    features: [
      "Alles aus dem Schnellcheck",
      "Fertig formulierter Widerspruchsbrief (Vorlage zur eigenen Anpassung)",
      "Schritt-für-Schritt-Checkliste zur Belegeinsicht (§ 259 BGB)",
      "Konkrete Handlungsempfehlungen für Mieter",
    ],
  },
  vermieter: {
    name: "Vermieter-Check vor Versand",
    cents: 1990,
    features: [
      "Formale Prüfung Ihrer Abrechnung vor dem Versand an den Mieter",
      "Fristenprüfung (§ 556 Abs. 3 BGB) zum Schutz vor Nachforderungsverlust",
      "Prüfung von Umlagefähigkeit & Verteilerschlüsseln nach BetrKV",
      "Hinweise zu Belegeinsicht, Vorwegabzügen und Zugangsnachweis",
    ],
  },
};
export const priceLabel = (cents: number) => (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
