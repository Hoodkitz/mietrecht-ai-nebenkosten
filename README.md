# Nebenkosten-Check

Regelbasierter Check von Nebenkostenabrechnungen (Next.js 14, TypeScript, Tailwind) mit Stripe-Checkout (Einmalzahlung, Test-Modus).

## Ablauf

1. `/check`: Eingabeformular, kostenlose Vorschau (Anzahl Auffälligkeiten, Potenzial) über `/api/check`
2. Zustimmung zum vorzeitigen Leistungsbeginn (Widerrufsverzicht), dann `/api/checkout` (Stripe Checkout, 4,90 EUR Schnellcheck / 12,90 EUR Report mit Widerspruchsbrief)
3. `/check/ergebnis`: `/api/report` prüft die Zahlung per Session-ID und liefert den Voll-Report. Es gibt keine Datenbank, Eingaben liegen nur im Browser (sessionStorage).

Regeln: `src/lib/checks.ts` (Fristen § 556 Abs. 3 BGB, nicht umlagefähige Kosten, Mietvertrag, Heizkosten 50-70 % und 15 % Kürzung, Verteilerschlüssel, Flächen, Summen, Vorjahr, Leerstand).

## Inhalte

- 10 SEO-Ratgeberseiten: `src/lib/guides.ts`, Route `/ratgeber/[slug]`, plus Sitemap und robots
- Impressum, Datenschutz, AGB/Widerruf, "Keine Rechtsberatung": Entwürfe mit gelb markierten `[PLATZHALTER]`, die der Betreiber vor Livegang ausfüllen muss

## Entwicklung

```bash
npm install
cp .env.example .env.local   # Test-Keys eintragen
npm run dev
npm run build
npm test
```

Stripe-Testkarte: 4242 4242 4242 4242. Ohne `STRIPE_SECRET_KEY` liefert der Checkout eine klare 503-Meldung; der Rest funktioniert.
