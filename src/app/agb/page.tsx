import type { Metadata } from "next";
export const metadata: Metadata = { title: "AGB und Widerrufsbelehrung", robots: { index: false } };

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 pt-8 space-y-3">
      <h1 className="text-2xl font-bold">AGB und Widerruf</h1>
      <h2 className="font-semibold">1. Leistung</h2>
      <p>Anbieter: Julien Paarmann, Klausing 19, 13627 Berlin. Gegenstand ist die einmalige, automatisierte Prüfung Ihrer Angaben zur Nebenkostenabrechnung und die Bereitstellung eines Reports als digitaler Inhalt. Es handelt sich um keine Rechtsberatung (siehe <a className="underline" href="/haftungsausschluss">Hinweis</a>).</p>
      <h2 className="font-semibold">2. Preise und Zahlung</h2>
      <p>Es gelten die zum Bestellzeitpunkt angezeigten Preise in Euro (Kleinunternehmer gemäß § 19 UStG, es wird keine Umsatzsteuer ausgewiesen). Die Zahlung erfolgt über Stripe.</p>
      <h2 className="font-semibold">3. Widerrufsrecht bei digitalen Inhalten</h2>
      <p>Verbraucher haben grundsätzlich ein 14-tägiges Widerrufsrecht. Das Widerrufsrecht erlischt bei digitalen Inhalten, wenn wir mit der Ausführung begonnen haben, nachdem Sie ausdrücklich zugestimmt haben, dass wir vor Ablauf der Widerrufsfrist beginnen, und Ihre Kenntnis bestätigt haben, dass Sie dadurch Ihr Widerrufsrecht verlieren (§ 356 Abs. 5 BGB). Diese Zustimmung holen wir vor der Zahlung per Kontrollkästchen ein.</p>
      <p>Widerrufsadresse: Julien Paarmann, Klausing 19, 13627 Berlin, E-Mail: julienpaarmann@web.de</p>
      <h2 className="font-semibold">4. Haftung</h2>
      <p>Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei Verletzung von Leben, Körper oder Gesundheit sowie nach dem Produkthaftungsgesetz. Bei leichter Fahrlässigkeit haften wir nur bei Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht), deren Erfüllung die ordnungsgemäße Durchführung des Vertrags erst ermöglicht und auf deren Einhaltung Sie regelmäßig vertrauen dürfen; die Haftung ist dann auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Der Check ist eine automatisierte, regelbasierte Prüfung und ersetzt keine Rechtsberatung im Einzelfall.</p>
    </main>
  );
}
