export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
          Jetzt kostenlos testen
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Nebenkostenabrechnung
          <br />
          <span className="text-primary-600">einfach gemacht</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Automatisierte Nebenkostenabrechnung, Heizkosten-VKO, Umlage, Rechnungen und Konten.
          Alles in einer Plattform. Ab 29€/Monat.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            className="bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-700 transition shadow-lg shadow-primary-600/25"
          >
            Kostenlos starten
          </a>
          <a
            href="#features"
            className="text-gray-600 px-8 py-4 rounded-xl text-lg font-medium hover:text-gray-900 transition"
          >
            Mehr erfahren →
          </a>
        </div>
        <div className="mt-16 relative">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                <div className="h-32 bg-primary-50 rounded-lg mt-4 flex items-center justify-center">
                  <span className="text-primary-600 font-medium">Dashboard Vorschau</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
