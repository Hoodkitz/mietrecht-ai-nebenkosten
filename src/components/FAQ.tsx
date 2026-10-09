"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Was ist Mietrecht AI Nebenkosten?",
    answer:
      "Mietrecht AI Nebenkosten ist eine Software zur automatisierten Nebenkostenabrechnung. Sie erstellt Nebenkostenabrechnungen, Heizkostenabrechnungen nach VKO, verwaltet Rechnungen und Konten – alles in einer Plattform.",
  },
  {
    question: "Wie funktioniert die Nebenkostenabrechnung?",
    answer:
      "Sie geben Ihre Daten ein (Einheiten, Verbrauchswerte, Kosten) und die Software erstellt automatisch die Abrechnung nach deutschem Recht. Sie können die Abrechnung als PDF exportieren und direkt an Mieter versenden.",
  },
  {
    question: "Ist die Software DSGVO-konform?",
    answer:
      "Ja, unsere Software wird auf Servern in Deutschland betrieben und erfüllt alle Anforderungen der DSGVO. Ihre Daten werden verschlüsselt übertragen und gespeichert.",
  },
  {
    question: "Kann ich die Software kostenlos testen?",
    answer:
      "Ja, Sie können jeden Plan 14 Tage kostenlos testen. Es ist keine Kreditkarte erforderlich. Nach dem Test können Sie den Plan auswählen, der zu Ihnen passt.",
  },
  {
    question: "Wie funktioniert die Zahlung?",
    answer:
      "Die Zahlung erfolgt über Stripe. Sie können mit Kreditkarte, SEPA-Lastschrift oder anderen Zahlungsmethoden bezahlen. Alle Zahlungen sind sicher und verschlüsselt.",
  },
  {
    question: "Kann ich jederzeit kündigen?",
    answer:
      "Ja, Sie können jederzeit kündigen. Es gibt keine Mindestlaufzeit. Die Kündigung ist über Ihr Konto möglich und wird zum Ende des Abrechnungszeitraums wirksam.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Häufig gestellte Fragen
          </h2>
          <p className="text-xl text-gray-600">
            Antworten auf die häufigsten Fragen.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
