import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NK</span>
              </div>
              <span className="font-semibold text-lg text-white">Mietrecht AI</span>
            </div>
            <p className="text-sm text-gray-400">
              Nebenkostenabrechnung einfach gemacht. Automatisiert, sicher, DSGVO-konform.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Produkt</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition">
                  Preise
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Impressum
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  AGB
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@mietrecht-ai.de" className="hover:text-white transition">
                  info@mietrecht-ai.de
                </a>
              </li>
              <li>
                <a href="tel:+49123456789" className="hover:text-white transition">
                  +49 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Mietrecht AI Nebenkosten. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
