"use client";

import { useState } from "react";

const plans = [
  {
    name: "Basis",
    price: 29,
    description: "Für kleine Vermieter mit bis zu 5 Einheiten",
    features: [
      "Bis zu 5 Einheiten",
      "Nebenkostenabrechnung",
      "E-Mail Support",
      "Basis-Reports",
    ],
    cta: "Kostenlos starten",
    popular: false,
  },
  {
    name: "Professional",
    price: 49,
    description: "Für mittlere Vermieter mit bis zu 20 Einheiten",
    features: [
      "Bis zu 20 Einheiten",
      "Alle Basis-Features",
      "Heizkosten-VKO",
      "Prioritäts-Support",
      "Erweiterte Reports",
    ],
    cta: "Kostenlos starten",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 79,
    description: "Für große Vermieter und Immobilienverwalter",
    features: [
      "Unbegrenzte Einheiten",
      "Alle Professional-Features",
      "API-Zugang",
      "Dedizierter Support",
      "Custom Branding",
    ],
    cta: "Kontakt aufnehmen",
    popular: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Einfache, transparente Preise
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Wählen Sie den Plan, der zu Ihnen passt. Jederzeit kündbar.
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!annual ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              Monatlich
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition ${
                annual ? "bg-primary-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition ${
                  annual ? "left-8" : "left-1"
                }`}
              />
            </button>
            <span className={`text-sm ${annual ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              Jährlich <span className="text-primary-600">(20% sparen)</span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.popular
                  ? "bg-primary-600 text-white ring-4 ring-primary-600/20 scale-105"
                  : "bg-white border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="text-sm font-medium text-primary-200 mb-4">Beliebteste Wahl</div>
              )}
              <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-4 ${plan.popular ? "text-primary-100" : "text-gray-500"}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {annual ? Math.round(plan.price * 0.8) : plan.price}€
                </span>
                <span className={`text-sm ${plan.popular ? "text-primary-100" : "text-gray-500"}`}>
                  /Monat
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <svg
                      className={`w-5 h-5 ${plan.popular ? "text-primary-200" : "text-primary-600"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={plan.popular ? "text-primary-100" : "text-gray-600"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-medium transition ${
                  plan.popular
                    ? "bg-white text-primary-600 hover:bg-primary-50"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
