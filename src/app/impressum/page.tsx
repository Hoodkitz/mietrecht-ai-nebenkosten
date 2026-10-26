import type { Metadata } from "next";
import { Placeholder } from "@/components/SiteChrome";
export const metadata: Metadata = { title: "Impressum", robots: { index: false } };

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 pt-8 space-y-3">
      <h1 className="text-2xl font-bold">Impressum</h1>
      <p className="bg-yellow-50 border border-yellow-300 rounded p-3 text-sm">Entwurf: Alle gelb markierten Platzhalter muss der Betreiber vor Livegang durch echte Angaben ersetzen (§ 5 DDG). Ohne vollständiges Impressum darf die Seite nicht veröffentlicht werden.</p>
      <h2 className="font-semibold">Angaben gemäß § 5 DDG</h2>
      <p>Julien Paarmann<br />Klausing 19<br />13627 Berlin</p>
      <h2 className="font-semibold">Kontakt</h2>
      <p>E-Mail: <Placeholder>E-Mail-Adresse</Placeholder><br />Telefon: <Placeholder>Telefonnummer, falls vorhanden</Placeholder></p>
      <h2 className="font-semibold">Umsatzsteuer-ID</h2>
      <p><Placeholder>USt-IdNr. nach § 27a UStG oder Hinweis auf Kleinunternehmerregelung § 19 UStG</Placeholder></p>
      <h2 className="font-semibold">Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
      <p>Julien Paarmann, Klausing 19, 13627 Berlin</p>
      <h2 className="font-semibold">Verbraucherstreitbeilegung</h2>
      <p>Wir sind <Placeholder>bereit / nicht bereit</Placeholder> und nicht verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </main>
  );
}
