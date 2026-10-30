import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">Nebenkosten-Check</Link>
        <nav className="flex gap-4 text-sm text-gray-600">
          <Link href="/ratgeber" className="hover:text-gray-900">Ratgeber</Link>
          <Link href="/check" className="bg-primary-600 text-white px-3 py-1.5 rounded-lg hover:bg-primary-700">Jetzt prüfen</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 text-sm space-y-3">
        <p>
          Hinweis: Dieses Angebot ist eine automatisierte, regelbasierte Plausibilitätsprüfung und keine
          Rechtsberatung im Sinne des Rechtsdienstleistungsgesetzes.
        </p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/impressum" className="hover:text-white">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
          <Link href="/agb" className="hover:text-white">AGB und Widerruf</Link>
          <Link href="/haftungsausschluss" className="hover:text-white">Keine Rechtsberatung</Link>
          <Link href="/ratgeber" className="hover:text-white">Ratgeber</Link>
        </nav>
        <p className="text-gray-500">© {new Date().getFullYear()} Nebenkosten-Check</p>
      </div>
    </footer>
  );
}

export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-yellow-200 text-yellow-900 px-1 rounded" title="Platzhalter: vom Betreiber auszufüllen">
      [PLATZHALTER: {children}]
    </mark>
  );
}

export function Disclaimer() {
  return (
    <p className="text-xs text-gray-500 border border-gray-200 rounded-lg p-3 bg-gray-50">
      Keine Rechtsberatung: Das Ergebnis ist eine automatisierte Plausibilitätsprüfung auf Basis allgemeiner Regeln.
      Es ersetzt keine Beratung durch Rechtsanwalt, Mieterverein oder Verbraucherzentrale.
    </p>
  );
}
