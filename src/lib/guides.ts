export interface Guide {
  slug: string;
  title: string; // <title>
  h1: string;
  description: string;
  intro: string;
  sections: { h2: string; p: string[] }[];
  faq: { q: string; a: string }[];
}

export const GUIDES: Guide[] = [
  {
    slug: "nebenkostenabrechnung-pruefen",
    title: "Nebenkostenabrechnung prüfen: Checkliste mit den häufigsten Fehlern",
    h1: "Nebenkostenabrechnung prüfen: So gehen Sie vor",
    description: "Schritt für Schritt die Nebenkostenabrechnung prüfen: Fristen, Umlageschlüssel, nicht umlagefähige Kosten und Rechenfehler.",
    intro: "Viele Nebenkostenabrechnungen enthalten Fehler. Mit einer systematischen Prüfung finden Sie die meisten davon in wenigen Minuten.",
    sections: [
      { h2: "1. Formalien und Fristen", p: ["Prüfen Sie zuerst, ob die Abrechnung rechtzeitig zugegangen ist. Der Vermieter muss spätestens 12 Monate nach Ende des Abrechnungszeitraums abrechnen (§ 556 Abs. 3 BGB). Der Zeitraum darf höchstens 12 Monate umfassen."] },
      { h2: "2. Kostenarten und Mietvertrag", p: ["Nur Kosten, die im Mietvertrag vereinbart sind und in der Betriebskostenverordnung stehen, dürfen umgelegt werden. Verwaltung, Reparaturen und Rücklagen gehören nicht dazu."] },
      { h2: "3. Verteilerschlüssel und Rechnung", p: ["Ist der Schlüssel (Fläche, Verbrauch, Personen) nachvollziehbar angegeben? Stimmt Ihr Anteil rechnerisch, und passen die Vorauszahlungen?"] },
      { h2: "4. Belege prüfen", p: ["Sie dürfen die Originalbelege einsehen. Notieren Sie Auffälligkeiten und widersprechen Sie schriftlich innerhalb der Einwendungsfrist."] },
    ],
    faq: [
      { q: "Wie lange habe ich Zeit zum Prüfen?", a: "Einwendungen müssen dem Vermieter innerhalb von 12 Monaten nach Zugang der Abrechnung mitgeteilt werden." },
      { q: "Muss ich die Nachzahlung sofort zahlen?", a: "Die Nachzahlung wird in der Regel mit Zugang einer ordnungsgemäßen Abrechnung fällig. Eine Zahlung unter Vorbehalt kann sinnvoll sein. Lassen Sie sich im Zweifel beraten." },
    ],
  },
  {
    slug: "nicht-umlagefaehige-nebenkosten",
    title: "Nicht umlagefähige Nebenkosten: Diese Kosten muss der Vermieter tragen",
    h1: "Nicht umlagefähige Nebenkosten im Überblick",
    description: "Verwaltungskosten, Reparaturen, Rücklagen und Bankgebühren dürfen nicht auf Mieter umgelegt werden. Übersicht und Rechtsgrundlage.",
    intro: "Umlagefähig sind nur Betriebskosten im Sinne der Betriebskostenverordnung. Alles andere trägt der Vermieter.",
    sections: [
      { h2: "Typische nicht umlagefähige Positionen", p: ["Verwaltungskosten, Instandhaltung und Reparaturen, Instandhaltungsrücklagen, Bankgebühren und Kontoführung sowie Kosten für Leerstand dürfen nicht umgelegt werden (§ 1 Abs. 2 BetrKV)."] },
      { h2: "Mischkosten: Hausmeister und Wartung", p: ["Beim Hausmeister sind nur Tätigkeiten wie Reinigung, Gartenpflege oder Winterdienst umlagefähig. Reparatur- und Verwaltungsanteile müssen herausgerechnet werden."] },
      { h2: "So gehen Sie vor", p: ["Markieren Sie verdächtige Positionen, fordern Sie die Aufschlüsselung an und verlangen Sie Belegeinsicht. Unser Check erkennt typische Kategorien automatisch."] },
    ],
    faq: [
      { q: "Ist die Wartung der Heizung umlagefähig?", a: "Die Wartung (nicht die Reparatur) gehört grundsätzlich zu den Heizkosten und ist bei vertraglicher Vereinbarung umlagefähig." },
      { q: "Darf der Vermieter Verwaltungskosten pauschal aufschlagen?", a: "Nein, bei Wohnraum sind Verwaltungskosten nicht auf den Mieter umlegbar." },
    ],
  },
  {
    slug: "nebenkostenabrechnung-frist",
    title: "Nebenkostenabrechnung Frist: 12 Monate und Ausschlussfrist erklärt",
    h1: "Nebenkostenabrechnung: Fristen für Vermieter und Mieter",
    description: "Wann muss die Nebenkostenabrechnung spätestens beim Mieter sein? Abrechnungsfrist, Einwendungsfrist und Folgen bei Verspätung.",
    intro: "Für beide Seiten gelten feste Fristen. Wer sie verpasst, verliert in der Regel Ansprüche.",
    sections: [
      { h2: "Abrechnungsfrist des Vermieters", p: ["Die Abrechnung muss dem Mieter spätestens 12 Monate nach Ende des Abrechnungszeitraums zugehen. Bei Abrechnungszeitraum Kalenderjahr 2024 also bis 31.12.2025. Danach ist eine Nachforderung ausgeschlossen, außer der Vermieter hat die Verspätung nicht zu vertreten (§ 556 Abs. 3 Satz 3 BGB)."] },
      { h2: "Einwendungsfrist des Mieters", p: ["Einwendungen gegen die Abrechnung müssen dem Vermieter spätestens bis zum Ablauf des zwölften Monats nach Zugang mitgeteilt werden (§ 556 Abs. 3 Satz 5 BGB)."] },
      { h2: "Guthaben", p: ["Ein Guthaben des Mieters bleibt auch bei verspäteter Abrechnung bestehen. Es unterliegt der regelmäßigen Verjährung von drei Jahren."] },
    ],
    faq: [
      { q: "Zählt das Datum auf der Abrechnung?", a: "Maßgeblich ist der Zugang beim Mieter, nicht das Datum auf dem Schreiben." },
      { q: "Was ist bei Auszug?", a: "Die Fristen gelten auch nach Auszug. Teilen Sie Ihre neue Anschrift mit." },
    ],
  },
  {
    slug: "heizkostenabrechnung-falsch",
    title: "Heizkostenabrechnung falsch? Typische Fehler und 15 Prozent Kürzung",
    h1: "Heizkostenabrechnung falsch: Das können Sie tun",
    description: "Heizkosten müssen zu 50 bis 70 Prozent nach Verbrauch abgerechnet werden. Bei Verstößen dürfen Mieter um 15 Prozent kürzen.",
    intro: "Die Heizkostenverordnung hat strenge Vorgaben. Verstöße geben Mietern ein Kürzungsrecht.",
    sections: [
      { h2: "Verbrauchsabhängige Abrechnung", p: ["Mindestens 50 und höchstens 70 Prozent der Heiz- und Warmwasserkosten sind nach Verbrauch zu verteilen, der Rest nach Fläche (§ 7 HeizkostenV)."] },
      { h2: "Kürzungsrecht", p: ["Wird nicht verbrauchsabhängig abgerechnet, dürfen Mieter ihren Kostenanteil um 15 Prozent kürzen (§ 12 Abs. 1 HeizkostenV)."] },
      { h2: "Weitere Fehlerquellen", p: ["Falsche Zählerstände, geschätzte Werte ohne Hinweis, fehlende Ablesung bei Mieterwechsel und fehlerhafte Aufteilung zwischen Heizung und Warmwasser."] },
    ],
    faq: [
      { q: "Was ist mit der CO2-Abgabe?", a: "Für Wohngebäude gilt eine Aufteilung der CO2-Kosten zwischen Vermieter und Mieter nach dem Kohlendioxidkostenaufteilungsgesetz. Prüfen Sie, ob sie in der Abrechnung ausgewiesen ist." },
      { q: "Muss ich Zählerstände selbst prüfen?", a: "Vergleichen Sie Ihre eigenen Ablesungen mit den Werten der Abrechnung und verlangen Sie bei Abweichung die Ableseprotokolle." },
    ],
  },
  {
    slug: "hausmeisterkosten-nebenkosten",
    title: "Hausmeisterkosten in den Nebenkosten: Was ist umlagefähig?",
    h1: "Hausmeisterkosten: Umlagefähig oder nicht?",
    description: "Hausmeisterkosten sind nur teilweise umlagefähig. Reparatur- und Verwaltungsanteile müssen abgezogen werden.",
    intro: "Hausmeisterkosten sind einer der häufigsten Streitpunkte in der Nebenkostenabrechnung.",
    sections: [
      { h2: "Umlagefähige Tätigkeiten", p: ["Kehren, Reinigen, Gartenpflege, Winterdienst, Kontrolle der Beleuchtung und ähnliche Aufgaben können als Hausmeisterkosten umgelegt werden (§ 2 Nr. 14 BetrKV)."] },
      { h2: "Nicht umlagefähige Tätigkeiten", p: ["Reparaturen, Instandhaltung und Verwaltungsaufgaben gehören nicht dazu. Enthält die Hausmeisterrechnung solche Anteile, muss der Vermieter sie herausrechnen oder schätzen."] },
      { h2: "Doppelabrechnung vermeiden", p: ["Ist die Gartenpflege separat abgerechnet, darf sie nicht zusätzlich im Hausmeisterbetrag stecken."] },
    ],
    faq: [
      { q: "Kann ich die Tätigkeitsliste verlangen?", a: "Ja, im Rahmen der Belegeinsicht können Sie Arbeitsverträge, Rechnungen und Aufstellungen einsehen." },
    ],
  },
  {
    slug: "belegeinsicht-nebenkostenabrechnung",
    title: "Belegeinsicht Nebenkostenabrechnung: Recht, Ablauf, Musterschreiben",
    h1: "Belegeinsicht bei der Nebenkostenabrechnung",
    description: "Mieter dürfen die Originalbelege zur Nebenkostenabrechnung einsehen. Ablauf, Ort, Kosten für Kopien und Tipps.",
    intro: "Ohne Belege lassen sich viele Fehler nicht beweisen. Die Belegeinsicht ist daher Ihr wichtigstes Werkzeug.",
    sections: [
      { h2: "Ihr Recht", p: ["Mieter haben einen Anspruch auf Einsicht in die Abrechnungsunterlagen, soweit dies zur Überprüfung erforderlich ist (§ 259 BGB, Rechtsprechung)."] },
      { h2: "Ort und Termin", p: ["Üblicherweise erfolgt die Einsicht beim Vermieter oder der Hausverwaltung. Vereinbaren Sie schriftlich einen Termin und bringen Sie die Abrechnung mit."] },
      { h2: "Kopien", p: ["Sie können Kopien verlangen, wenn Ihnen die Einsicht vor Ort nicht zumutbar ist. Die Kosten sind meist selbst zu tragen. Lassen Sie sich im Zweifel beraten."] },
    ],
    faq: [
      { q: "Hemmt die Belegeinsicht die Einwendungsfrist?", a: "Nein. Legen Sie vorsorglich fristgerecht Widerspruch ein und kündigen Sie weitere Einwände nach Belegeinsicht an." },
    ],
  },
  {
    slug: "widerspruch-nebenkostenabrechnung",
    title: "Widerspruch gegen die Nebenkostenabrechnung: Vorlage und Tipps",
    h1: "Widerspruch gegen die Nebenkostenabrechnung einlegen",
    description: "So widersprechen Sie einer fehlerhaften Nebenkostenabrechnung richtig: Frist, Form, Inhalt und Musterformulierungen.",
    intro: "Ein fristgerechter, schriftlicher Widerspruch sichert Ihre Rechte.",
    sections: [
      { h2: "Frist und Form", p: ["Der Widerspruch muss innerhalb von 12 Monaten nach Zugang der Abrechnung beim Vermieter eingehen. Wählen Sie eine nachweisbare Form, etwa Einwurf-Einschreiben."] },
      { h2: "Inhalt", p: ["Benennen Sie die beanstandeten Positionen konkret, bitten Sie um Korrektur und Belegeinsicht und setzen Sie eine Frist zur Antwort."] },
      { h2: "Zahlung", p: ["Ob Sie unter Vorbehalt zahlen, hängt vom Einzelfall ab. Bei einer Wohnung, die Sie weiter bewohnen, vermeidet eine Zahlung unter Vorbehalt unnötigen Streit."] },
    ],
    faq: [
      { q: "Reicht ein Anruf?", a: "Aus Beweisgründen sollten Sie schriftlich widersprechen." },
      { q: "Gibt es eine Vorlage?", a: "Im Report (12,90 EUR) enthalten wir eine ausfüllbare Vorlage mit Ihren gefundenen Punkten." },
    ],
  },
  {
    slug: "verteilerschluessel-nebenkosten",
    title: "Verteilerschlüssel Nebenkosten: Fläche, Verbrauch, Personen",
    h1: "Verteilerschlüssel in der Nebenkostenabrechnung",
    description: "Welcher Umlageschlüssel ist zulässig? Wohnfläche, Verbrauch, Personenzahl und Wohneinheiten im Überblick.",
    intro: "Der Verteilerschlüssel entscheidet, wie viel Sie von den Gesamtkosten zahlen.",
    sections: [
      { h2: "Gesetzlicher Standard", p: ["Fehlt eine Vereinbarung, werden Betriebskosten nach dem Anteil der Wohnfläche umgelegt, verbrauchsabhängige Kosten nach Verbrauch, soweit erfasst (§ 556a BGB)."] },
      { h2: "Abweichende Vereinbarungen", p: ["Der Mietvertrag kann andere Schlüssel vorsehen, etwa Personenzahl oder Wohneinheiten. Er muss klar und nachvollziehbar sein."] },
      { h2: "Häufige Fehler", p: ["Falsche Gesamtfläche, Leerstand wird auf übrige Mieter verteilt, Schlüssel ändert sich ohne Grund oder ist in der Abrechnung nicht angegeben."] },
    ],
    faq: [
      { q: "Darf der Vermieter den Schlüssel ändern?", a: "Unter bestimmten Voraussetzungen durch Erklärung in Textform (§ 556a Abs. 2 BGB), vor allem bei Verbrauchserfassung." },
    ],
  },
  {
    slug: "wohnflaeche-abweichung-nebenkosten",
    title: "Wohnfläche weicht ab: Folgen für die Nebenkostenabrechnung",
    h1: "Falsche Wohnfläche in der Nebenkostenabrechnung",
    description: "Weicht die tatsächliche Wohnfläche von der im Mietvertrag ab, kann die Abrechnung falsch sein. Messen, prüfen, geltend machen.",
    intro: "Der Flächenschlüssel wirkt auf viele Positionen. Schon kleine Fehler summieren sich.",
    sections: [
      { h2: "Maßgebliche Fläche", p: ["Für die Abrechnung zählt die tatsächliche Wohnfläche. Die Fläche wird nach der Wohnflächenverordnung ermittelt, Balkone oft nur anteilig."] },
      { h2: "Gesamtfläche prüfen", p: ["Auch die Gesamtfläche des Hauses muss stimmen. Wird sie zu klein angesetzt, steigt Ihr Anteil."] },
      { h2: "Was tun", p: ["Messen Sie nach, vergleichen Sie mit Mietvertrag und Abrechnung und fordern Sie die Flächenberechnung des Vermieters an."] },
    ],
    faq: [
      { q: "Ab welcher Abweichung lohnt sich Handeln?", a: "Die Rechtsprechung beachtet Abweichungen bei Mietminderung ab 10 Prozent. In der Nebenkostenabrechnung können auch kleinere Abweichungen den Betrag verändern." },
    ],
  },
  {
    slug: "nebenkostennachzahlung-zu-hoch",
    title: "Nebenkostennachzahlung zu hoch: Was tun? Prüfen und widersprechen",
    h1: "Nebenkostennachzahlung zu hoch: Die nächsten Schritte",
    description: "Hohe Nachzahlung bei den Nebenkosten? So prüfen Sie Ursachen, Vorauszahlungen und Fristen und legen Widerspruch ein.",
    intro: "Steigende Energiepreise und Fehler im Verteilerschlüssel sind typische Gründe für hohe Nachzahlungen.",
    sections: [
      { h2: "Ursachen verstehen", p: ["Vergleichen Sie die Positionen mit dem Vorjahr. Große Sprünge bei Heizung, Wasser oder Grundsteuer sollten Sie sich erklären lassen."] },
      { h2: "Fehler suchen", p: ["Prüfen Sie Fristen, nicht umlagefähige Positionen, Rechnungen und den Abgleich mit den Vorauszahlungen."] },
      { h2: "Vorauszahlung anpassen", p: ["Nach der Abrechnung kann jede Seite die Vorauszahlungen auf eine angemessene Höhe anpassen (§ 560 Abs. 4 BGB). Das verhindert künftige hohe Nachzahlungen."] },
    ],
    faq: [
      { q: "Kann ich Ratenzahlung vereinbaren?", a: "Fragen Sie Ihren Vermieter. Ein Anspruch besteht nicht, aber viele Vermieter stimmen zu." },
      { q: "Was, wenn ich die Nachzahlung nicht aufbringen kann?", a: "Sprechen Sie frühzeitig mit dem Vermieter und suchen Sie Beratung beim Mieterverein oder der Verbraucherzentrale." },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
