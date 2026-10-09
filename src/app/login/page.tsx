import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NK</span>
            </div>
            <span className="font-semibold text-lg">Mietrecht AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Willkommen zurück</h1>
          <p className="text-gray-600">Melden Sie sich bei Ihrem Konto an.</p>
        </div>
        <form className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition"
              placeholder="ihre@email.de"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Passwort
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-600"
              />
              <span className="text-sm text-gray-600">Angemeldet bleiben</span>
            </label>
            <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
              Passwort vergessen?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition"
          >
            Anmelden
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Noch kein Konto?{" "}
          <Link href="/pricing" className="text-primary-600 hover:text-primary-700 font-medium">
            Kostenlos registrieren
          </Link>
        </p>
      </div>
    </main>
  );
}
