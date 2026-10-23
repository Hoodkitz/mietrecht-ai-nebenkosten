import Link from "next/link";
import { TIERS, priceLabel } from "@/lib/pricing";
import { GUIDES } from "@/lib/guides";
import { Disclaimer } from "@/components/SiteChrome";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-12">
      <h1 className="text-3xl sm:text-4xl font-bold">Nebenkostenabrechnung prüfen in 5 Minuten</h1>
      <p className="mt-4 text-lg text-gray-600">
        Geben Sie die Eckdaten Ihrer Abrechnung ein. Wir prüfen Fristen, nicht umlagefähige Kosten,
        Verteilerschlüssel, Heizkosten-Regeln und Rechenfehler. Die Vorschau ist kostenlos.
      </p>
      <Link href="/check" className="inline-block mt-6 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700">
        Abrechnung kostenlos prüfen
      </Link>

      <section className="mt-12 grid sm:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4"><h2 className="font-semibold">1. Eingeben</h2><p className="text-sm text-gray-600 mt-1">Zeitraum, Fläche, Kostenpositionen und Ergebnis aus Ihrer Abrechnung.</p></div>
        <div className="border rounded-lg p-4"><h2 className="font-semibold">2. Vorschau</h2><p className="text-sm text-gray-600 mt-1">Anzahl der Auffälligkeiten und mögliches Einsparpotenzial, kostenlos.</p></div>
        <div className="border rounded-lg p-4"><h2 className="font-semibold">3. Report</h2><p className="text-sm text-gray-600 mt-1">Alle Punkte mit Rechtsgrundlage, optional mit Widerspruchsbrief.</p></div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Preise</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {(Object.keys(TIERS) as (keyof typeof TIERS)[]).map((k) => (
            <div key={k} className="border rounded-lg p-5">
              <h3 className="font-semibold">{TIERS[k].name}</h3>
              <p className="text-2xl font-bold mt-1">{priceLabel(TIERS[k].cents)}</p>
              <ul className="mt-3 text-sm text-gray-600 list-disc pl-5 space-y-1">
                {TIERS[k].features.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">Einmalzahlung, kein Abo. Es werden keine Abrechnungsdaten gespeichert.</p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Ratgeber</h2>
        <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-primary-700">
          {GUIDES.map((g) => (
            <li key={g.slug}><Link href={`/ratgeber/${g.slug}`} className="hover:underline">{g.h1}</Link></li>
          ))}
        </ul>
      </section>

      <div className="mt-12"><Disclaimer /></div>
    </main>
  );
}
