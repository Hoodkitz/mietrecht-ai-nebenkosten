const features = [
  {
    icon: "📊",
    title: "Nebenkostenabrechnung",
    description:
      "Automatisierte Erstellung von Nebenkostenabrechnungen nach deutschem Recht. Einfach Daten eingeben, Abrechnung generieren.",
  },
  {
    icon: "🔥",
    title: "Heizkosten-VKO",
    description:
      "Heizkostenabrechnung nach VKO (Heizkostenverordnung). Verbrauchserfassung, Umlage und Abrechnung in einem Schritt.",
  },
  {
    icon: "📋",
    title: "Umlage",
    description:
      "Flexible Umlage von Nebenkosten. Pro Quadratmeter, pro Person oder nach Verbrauch – Sie wählen die Methode.",
  },
  {
    icon: "🧾",
    title: "Rechnungen",
    description:
      "Rechnungsverwaltung für alle Mieter und Eigentümer. Automatische Erstellung, Versand und Archivierung.",
  },
  {
    icon: "🏦",
    title: "Konten",
    description:
      "Kontenverwaltung für Nebenkosten. Überblick über alle Konten, Buchungen und Saldi. Export für Ihre Buchhaltung.",
  },
  {
    icon: "🤖",
    title: "KI-gestützt",
    description:
      "Künstliche Intelligenz erkennt Muster, findet Fehler und optimiert Ihre Abrechnungen automatisch.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Alles was Sie brauchen
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Eine Plattform für alle Ihre Nebenkosten-Abrechnungen.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
