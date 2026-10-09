import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NK</span>
            </div>
            <span className="font-semibold text-lg">Mietrecht AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition">
              Features
            </a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition">
              Preise
            </a>
            <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900 transition">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900 transition hidden sm:block"
            >
              Anmelden
            </Link>
            <Link
              href="/pricing"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition"
            >
              Kostenlos starten
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
