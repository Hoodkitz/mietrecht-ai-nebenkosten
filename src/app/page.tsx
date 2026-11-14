import Link from "next/link";
import { TIERS, priceLabel } from "@/lib/pricing";
import { GUIDES } from "@/lib/guides";
import { Disclaimer } from "@/components/SiteChrome";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-12 pb-16">
      {/* Hero */}
      <section className="text-center sm:text-left">
        <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
          <span>100 % Datensparsam</span>
          <span>•</span>
          <span>Ohne Abo</span>
          <span>•</span>
          <span>Kostenlose Vorschau</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
          Nebenkostenabrechnung prüfen in 5 Minuten
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Automatisierte Plausibilitätsprüfung für Mieter und private Vermieter. Wir prüfen Fristen,
          nicht umlagefähige Positionen, Verteilerschlüssel, Heizkostenverordnung und Rechenfehler.
          Kostenlose Vorschau – ab 4,90 € ohne Registrierung und ohne Dokumenten-Upload.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link
            href="/check"
            className="bg-primary-600 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-primary-700 shadow-sm transition"
          >
            Abrechnung kostenlos prüfen
          </Link>
          <Link
            href="/check?modus=vermieter"
            className="border border-gray-300 text-gray-700 px-5 py-3.5 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Für Vermieter: Vorprüfung (19,90 €)
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Kostenlose Vorschau vor Checkout
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Kein Upload vertraulicher Scans/PDFs
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Einmalzahlung – Niemals ein Abo
          </span>
        </div>
      </section>

      {/* Alleinstellungsmerkmale */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Warum Nebenkosten-Check?</h2>
        <p className="text-gray-600 text-sm mt-1">
          Faire Preise, volle Datensouveränität und konkrete Hilfe statt unübersichtlicher Abos.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:border-primary-300 transition">
            <div className="text-primary-600 font-bold text-lg mb-1">Einstieg ab 4,90 € (Schnellcheck)</div>
            <p className="text-sm text-gray-600">
              Keine 12,90 € oder 49 € Mindestgebühr: Wenn Sie nur prüfen möchten, ob Fristen abgelaufen
              sind oder formale Rechen- und Umlagefehler vorliegen, reicht unser 4,90 € Schnellcheck.
              Der günstigste und fairste Einstiegspreis im deutschen Markt.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:border-primary-300 transition">
            <div className="text-primary-600 font-bold text-lg mb-1">Widerspruchsbrief schon ab 12,90 €</div>
            <p className="text-sm text-gray-600">
              Bei Mitbewerbern zahlen Sie für Klärungsschreiben oft 19,90 € oder mehr. Bei uns ist
              der individualisierte, anpassbare Widerspruchsbrief mit konkreten Paragrafen (§ 556 BGB, BetrKV)
              und Belegeinsichts-Checkliste bereits im 12,90 € Report enthalten.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:border-primary-300 transition">
            <div className="text-primary-600 font-bold text-lg mb-1">Eigener Vermieter-Modus (19,90 €)</div>
            <p className="text-sm text-gray-600">
              Speziell für private Kleinvermieter vor dem gesetzlichen Stichtag 31.12.: Prüfen Sie Ihre Abrechnung
              vor dem Versand auf formale Wirksamkeit und Fristen (§ 556 Abs. 3 BGB). So vermeiden Sie
              den dauerhaften Verlust berechtigter Nachforderungen.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:border-primary-300 transition">
            <div className="text-primary-600 font-bold text-lg mb-1">100 % Datensparsamkeit (Zero-Upload)</div>
            <p className="text-sm text-gray-600">
              Ihre Privatsphäre ist geschützt: Sie müssen keine Mietverträge, Ausweiskopien oder vertraulichen
              Dokumente in fremde Clouds laden. Sie geben nur die relevanten Eckdaten im Browser ein –
              ohne Speicherung auf unseren Servern.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Schritte */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">In 3 einfachen Schritten zur Klarheit</h2>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <div className="border rounded-xl p-5 bg-gray-50/50">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center mb-3">
              1
            </div>
            <h3 className="font-semibold text-gray-900">Eckdaten eingeben</h3>
            <p className="text-sm text-gray-600 mt-1">
              Zeitraum, Flächen, Kostenpositionen und Nachzahlungsbetrag aus Ihrer Abrechnung eingeben (ca. 3–5 Min.).
            </p>
          </div>
          <div className="border rounded-xl p-5 bg-gray-50/50">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center mb-3">
              2
            </div>
            <h3 className="font-semibold text-gray-900">Kostenlose Vorschau</h3>
            <p className="text-sm text-gray-600 mt-1">
              Sie sehen sofort und kostenlos die Anzahl der gefundenen Auffälligkeiten und das mögliche Sparpotenzial.
            </p>
          </div>
          <div className="border rounded-xl p-5 bg-gray-50/50">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center mb-3">
              3
            </div>
            <h3 className="font-semibold text-gray-900">Report freischalten</h3>
            <p className="text-sm text-gray-600 mt-1">
              Detaillierter Prüfbericht mit Paragrafen-Belegen, optional mit fertigem Widerspruchsbrief. Ab 4,90 € einmalig.
            </p>
          </div>
        </div>
      </section>

      {/* Objektiver Modellvergleich (UWG-konform) */}
      <section className="mt-16">
        <div className="sm:flex sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Objektiver Markt- &amp; Modellvergleich</h2>
            <p className="text-gray-600 text-sm mt-1">
              Faktenbasierter Vergleich gängiger Wege zur Nebenkostenprüfung in Deutschland (Stand 2026).
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-900">
                <th className="p-3.5 font-semibold">Leistungsmerkmal</th>
                <th className="p-3.5 font-semibold bg-primary-50 text-primary-900 border-x border-primary-200">
                  Nebenkosten-Check (Wir)
                </th>
                <th className="p-3.5 font-semibold text-gray-700">Online-Tools (z. B. NebenkostenPro)</th>
                <th className="p-3.5 font-semibold text-gray-700">Klassische Einzelprüfung (z. B. Mineko)</th>
                <th className="p-3.5 font-semibold text-gray-700">Mieterverein (DMB)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3.5 font-medium text-gray-900">Günstigster Einstiegspreis</td>
                <td className="p-3.5 bg-primary-50/60 font-bold text-primary-800 border-x border-primary-200">
                  4,90 € (Schnellcheck)
                </td>
                <td className="p-3.5 text-gray-600">12,90 € (Schnell-Check)</td>
                <td className="p-3.5 text-gray-600">ab 49,00 € – 89,00 €</td>
                <td className="p-3.5 text-gray-600">Jahresbeitrag (ca. 70–120 €/J.)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-gray-900">Widerspruchsbrief enthalten</td>
                <td className="p-3.5 bg-primary-50/60 font-bold text-primary-800 border-x border-primary-200">
                  Inklusive ab 12,90 €
                </td>
                <td className="p-3.5 text-gray-600">Erst ab 19,90 € (Premium-Report)</td>
                <td className="p-3.5 text-gray-600">Erst ab ca. 59,00 € – 89,00 €</td>
                <td className="p-3.5 text-gray-600">In Mitgliedschaft enthalten</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-gray-900">Vermieter-Vorprüfung vor Versand</td>
                <td className="p-3.5 bg-primary-50/60 font-bold text-primary-800 border-x border-primary-200">
                  Ja (19,90 € Einmalprüfung)
                </td>
                <td className="p-3.5 text-gray-600">Abrechnungserstellung ab 19,90 €</td>
                <td className="p-3.5 text-gray-600">Nein (reiner Mieterfokus)</td>
                <td className="p-3.5 text-gray-600">Nein (Mieterinteressen)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-gray-900">Datensparsamkeit &amp; Dokumentenupload</td>
                <td className="p-3.5 bg-primary-50/60 font-bold text-primary-800 border-x border-primary-200">
                  Kein Upload sensibler Dokumente nötig
                </td>
                <td className="p-3.5 text-gray-600">Dokumenten-Upload auf Server</td>
                <td className="p-3.5 text-gray-600">Dokumenten-Upload auf Server</td>
                <td className="p-3.5 text-gray-600">Vorlage vor Ort / Postweg</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-gray-900">Vertragsbindung / Laufzeit</td>
                <td className="p-3.5 bg-primary-50/60 font-bold text-primary-800 border-x border-primary-200">
                  Keine (100 % Einmalzahlung)
                </td>
                <td className="p-3.5 text-gray-600">Einmalzahlung bzw. Vermieter-Abo</td>
                <td className="p-3.5 text-gray-600">Einmalzahlung oder bis zu 24 Mon.</td>
                <td className="p-3.5 text-gray-600">Mindestens 1–2 Jahre Bindung</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-gray-900">Kostenlose Vorschau vor Kauf</td>
                <td className="p-3.5 bg-primary-50/60 font-bold text-primary-800 border-x border-primary-200">
                  Ja (Auffälligkeiten &amp; Potenzial)
                </td>
                <td className="p-3.5 text-gray-600">Ja (Auffälligkeiten vorab)</td>
                <td className="p-3.5 text-gray-600">In der Regel nicht verfügbar</td>
                <td className="p-3.5 text-gray-600">Nein</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-3 leading-relaxed">
          <strong>Hinweis gemäß § 6 UWG:</strong> Sachlicher und nachprüfbarer Leistungsvergleich auf Basis der öffentlich
          zugänglichen Tarif- und Leistungsbeschreibungen der genannten Anbieter (Stand: November 2026). Alle genannten
          Markennamen sind Eigentum der jeweiligen Inhaber und dienen ausschließlich der objektiven Orientierung.
        </p>
      </section>

      {/* Preise & Pakete */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Transparente Preise</h2>
        <p className="text-gray-600 text-sm mt-1">
          Einfache Einmalzahlung. Kein Abonnement, keine Kündigungsfristen, keine versteckten Kosten.
        </p>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {(Object.keys(TIERS) as (keyof typeof TIERS)[]).map((k) => (
            <div
              key={k}
              className={`border rounded-xl p-5 flex flex-col justify-between ${
                k === "report" ? "border-primary-500 ring-2 ring-primary-100 bg-white" : "border-gray-200 bg-white"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                    {k === "schnell" && "Basis-Check"}
                    {k === "report" && "Empfohlen für Mieter"}
                    {k === "vermieter" && "Für Vermieter"}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mt-1">{TIERS[k].name}</h3>
                <p className="text-3xl font-extrabold text-gray-900 mt-2">{priceLabel(TIERS[k].cents)}</p>
                <p className="text-xs text-gray-500 mt-0.5">einmalig, inkl. gesetzl. MwSt.</p>

                <ul className="mt-4 text-sm text-gray-600 space-y-2">
                  {TIERS[k].features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href={k === "vermieter" ? "/check?modus=vermieter" : "/check"}
                  className={`block text-center py-2.5 px-4 rounded-lg font-medium text-sm transition ${
                    k === "report"
                      ? "bg-primary-600 text-white hover:bg-primary-700 shadow-sm"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {k === "vermieter" ? "Vermieter-Check starten" : "Jetzt kostenlos prüfen"}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Die Vorschau mit Anzahl der Beanstandungen ist immer 100 % kostenlos. Sie zahlen erst, wenn Sie den vollständigen Report freischalten möchten.
        </p>
      </section>

      {/* Vermieter-Hinweiskasten */}
      <section className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-2xl p-6 sm:p-8">
        <div className="sm:flex items-start justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-1 rounded-md">
              Für private Vermieter vor dem 31.12.
            </span>
            <h3 className="text-xl font-bold text-gray-900">
              Ausschlussfrist nach § 556 Abs. 3 BGB beachten
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Geht dem Mieter die Abrechnung nach Ablauf des 12. Monats nach Ende des Abrechnungszeitraums zu,
              ist die Nachforderung gesetzlich ausgeschlossen. Formelle Fehler machen die Abrechnung angreifbar.
              Nutzen Sie unsere automatisierte Vorprüfung (19,90 €), um Fristen, Umlagefähigkeit nach BetrKV
              und Verteilerschlüssel vor dem Postversand abzusichern.
            </p>
          </div>
          <div className="mt-5 sm:mt-0 shrink-0">
            <Link
              href="/check?modus=vermieter"
              className="inline-block bg-primary-700 text-white font-medium text-sm px-5 py-3 rounded-lg hover:bg-primary-800 transition"
            >
              Vermieter-Vorprüfung starten
            </Link>
          </div>
        </div>
      </section>

      {/* Ratgeber */}
      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Ratgeber &amp; Mietrecht-Wissen</h2>
          <Link href="/ratgeber" className="text-sm text-primary-600 hover:underline font-medium">
            Alle 14 Ratgeber ansehen →
          </Link>
        </div>
        <p className="text-gray-600 text-sm mt-1">
          Kostenlose Leitfäden mit Paragrafen-Verweisen, Checklisten und praktischen Musterschreiben.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/ratgeber/${g.slug}`}
              className="border border-gray-200 rounded-lg p-3.5 hover:border-primary-400 hover:bg-primary-50/30 transition block"
            >
              <div className="font-semibold text-sm text-gray-900 hover:text-primary-700">{g.h1}</div>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <Disclaimer />
      </div>
    </main>
  );
}
