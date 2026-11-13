# Nebenkosten-Check

Regelbasierter Check von Nebenkostenabrechnungen (Next.js 14, TypeScript, Tailwind) mit Stripe-Checkout (Einmalzahlung, Test-Modus).

## Ablauf

1. `/check`: Eingabeformular, kostenlose Vorschau (Anzahl Auffälligkeiten, Potenzial) über `/api/check`
2. Zustimmung zum vorzeitigen Leistungsbeginn (Widerrufsverzicht), dann `/api/checkout` (Stripe Checkout, 4,90 EUR Schnellcheck / 12,90 EUR Report mit Widerspruchsbrief)
3. `/check/ergebnis`: `/api/report` prüft die Zahlung per Session-ID und liefert den Voll-Report. Es gibt keine Datenbank, Eingaben liegen nur im Browser (sessionStorage).

Regeln: `src/lib/checks.ts` (Fristen § 556 Abs. 3 BGB, nicht umlagefähige Kosten, Mietvertrag, Heizkosten 50-70 % und 15 % Kürzung, Verteilerschlüssel, Flächen, Summen, Vorjahr, Leerstand).

## Vermieter-Modus

`/check?modus=vermieter` (19,90 EUR): formale Vorprüfung der eigenen Abrechnung vor dem Versand (`src/lib/landlord.ts`): Versandfrist (Zugang bis 12 Monate nach Zeitraumende), Umlagefähigkeit, Mietvertrag, Verteilerschlüssel, Heizkosten, Rechenfehler, Fläche, Leerstand sowie Hinweise zu Belegeinsicht und Zugangsnachweis. Dasselbe Stripe-Muster, Paket `vermieter`.

## Potenzial-Schätzung

`potentialTotal()` zählt pro Kostenposition nur den größten Einzelfund (keine Doppelzählung), eine verspätete Abrechnung deckt alle übrigen Funde ab, und die Summe ist auf die Summe der Mieteranteile gedeckelt.

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

## Environment-Variablen

| Variable | Pflicht | Zweck |
|---|---|---|
| `STRIPE_SECRET_KEY` | für Zahlung | Test-Key `sk_test_...`; `sk_live_` wird abgelehnt, außer `ALLOW_LIVE_STRIPE=true` |
| `NEXT_PUBLIC_APP_URL` | ja | Öffentliche URL für Stripe-Redirects und Sitemap, z. B. `https://example.de` |
| `STRIPE_WEBHOOK_SECRET` | optional | nur für `/api/webhook` (Logging) |
| `ALLOW_LIVE_STRIPE` | nein | `true` erlaubt Live-Keys. Erst setzen, wenn Impressum/Datenschutz/AGB ausgefüllt und geprüft sind |

Keys niemals committen (`.env*` ist in `.gitignore`).

## Deployment auf Vercel

1. Repo auf vercel.com importieren (Framework: Next.js wird erkannt, Build `npm run build`).
2. Unter Settings, Environment Variables die Variablen aus der Tabelle setzen (zunächst Test-Key).
3. Deploy auslösen. Die URL als `NEXT_PUBLIC_APP_URL` eintragen und neu deployen.
4. Optional Webhook in Stripe (Test-Modus) auf `https://<domain>/api/webhook` anlegen, Event `checkout.session.completed`, Signing-Secret als `STRIPE_WEBHOOK_SECRET`.
5. Testkauf mit Karte 4242 4242 4242 4242 durchführen (`/check`, Vorschau, Zahlung, Report).
6. Vor Livegang: Platzhalter in `/impressum`, `/datenschutz`, `/agb` ersetzen, rechtlich prüfen lassen, AV-Vertrag mit Hoster, dann Live-Key und `ALLOW_LIVE_STRIPE=true`, eigene Domain verbinden.

Hinweis: Hosting in EU-Region (z. B. Vercel Region `fra1`) wählen, passend zur Datenschutzerklärung.
