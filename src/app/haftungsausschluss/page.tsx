import type { Metadata } from "next";
export const metadata: Metadata = { title: "Keine Rechtsberatung" };

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 pt-8 space-y-3">
      <h1 className="text-2xl font-bold">Keine Rechtsberatung</h1>
      <p>Der Nebenkosten-Check ist eine automatisierte, regelbasierte Plausibilitätsprüfung. Er prüft Ihre Angaben anhand allgemeiner Regeln (etwa zu Fristen, Betriebskostenverordnung und Heizkostenverordnung) und liefert Hinweise auf mögliche Fehler.</p>
      <p>Das Ergebnis ist keine Rechtsberatung und keine Rechtsdienstleistung im Sinne des Rechtsdienstleistungsgesetzes (RDG). Es ersetzt nicht die Prüfung Ihres konkreten Mietvertrags und der Belege durch einen Rechtsanwalt, einen Mieterverein oder eine Verbraucherzentrale.</p>
      <p>Wir übernehmen keine Gewähr für Vollständigkeit und Richtigkeit. Mustertexte (z. B. Widerspruchsbrief) sind unverbindliche Vorlagen, die Sie vor Verwendung selbst prüfen und anpassen müssen. Fristen sind rechnerisch ermittelt; maßgeblich ist der tatsächliche Zugang der Abrechnung.</p>
    </main>
  );
}
