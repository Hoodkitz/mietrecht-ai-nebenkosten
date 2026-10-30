import type { Metadata } from "next";
import { Placeholder } from "@/components/SiteChrome";
export const metadata: Metadata = { title: "Datenschutzerklärung", robots: { index: false } };

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 pt-8 space-y-3">
      <h1 className="text-2xl font-bold">Datenschutzerklärung</h1>
      <p className="bg-yellow-50 border border-yellow-300 rounded p-3 text-sm">Entwurf: Muss vor Livegang vom Betreiber geprüft und ergänzt werden (ggf. rechtliche Prüfung). Platzhalter sind markiert.</p>
      <h2 className="font-semibold">1. Verantwortlicher</h2>
      <p>Julien Paarmann, Klausing 19, 13627 Berlin, E-Mail: julienpaarmann@web.de</p>
      <h2 className="font-semibold">2. Eingaben im Nebenkosten-Check</h2>
      <p>Die Angaben, die Sie im Formular machen (Zeiträume, Flächen, Kostenpositionen), werden zur Berechnung des Ergebnisses an unseren Server übermittelt und ausschließlich im Arbeitsspeicher verarbeitet. Sie werden nicht in einer Datenbank gespeichert. Für den Report halten wir die Eingaben nur in Ihrem Browser (Session Storage) vor. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.</p>
      <h2 className="font-semibold">3. Zahlungsabwicklung</h2>
      <p>Zahlungen werden über Stripe abgewickelt (Stripe Payments Europe, Ltd., Irland). Zahlungsdaten gelangen nicht auf unsere Server. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Weitere Informationen: Datenschutzerklärung von Stripe.</p>
      <h2 className="font-semibold">4. Hosting und Server-Logs</h2>
      <p>Hosting-Anbieter: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA (Auftragsverarbeitung auf Grundlage eines Data Processing Addendum inkl. EU-Standardvertragsklauseln). Beim Aufruf werden technisch notwendige Logdaten (IP-Adresse, Zeitpunkt) verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Speicherdauer: <Placeholder>z. B. 7 Tage</Placeholder>.</p>
      <h2 className="font-semibold">5. Cookies und Tracking</h2>
      <p>Wir setzen derzeit keine Tracking- oder Marketing-Cookies ein. <Placeholder>Anpassen, falls Analyse-Tools ergänzt werden</Placeholder></p>
      <h2 className="font-semibold">6. Ihre Rechte</h2>
      <p>Sie haben Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei einer Aufsichtsbehörde (<Placeholder>zuständige Landesdatenschutzbehörde</Placeholder>).</p>
    </main>
  );
}
