import type { Metadata } from "next";
export const metadata: Metadata = { title: "Impressum", robots: { index: false } };

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 pt-8 space-y-3">
      <h1 className="text-2xl font-bold">Impressum</h1>
      <h2 className="font-semibold">Angaben gemäß § 5 DDG</h2>
      <p>Julien Paarmann<br />Klausing 19<br />13627 Berlin</p>
      <h2 className="font-semibold">Kontakt</h2>
      <p>E-Mail: julienpaarmann@web.de</p>
      <h2 className="font-semibold">Umsatzsteuer-ID</h2>
      <p>Gemäß § 19 UStG wird keine Umsatzsteuer erhoben (Kleinunternehmerregelung).</p>
      <h2 className="font-semibold">Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
      <p>Julien Paarmann, Klausing 19, 13627 Berlin</p>
      <h2 className="font-semibold">Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit und nicht verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </main>
  );
}
