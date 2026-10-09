# Mietrecht AI Nebenkosten

Automatisierte Nebenkostenabrechnung, Heizkosten-VKO, Umlage, Rechnungen und Konten.

## Features

- Nebenkostenabrechnung
- Heizkosten-VKO
- Umlage
- Rechnungen
- Konten
- KI-gestützt

## Preise

- Basis: 29€/Monat
- Professional: 49€/Monat
- Enterprise: 79€/Monat

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Stripe (Test-Modus)

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Kopieren Sie `.env.example` zu `.env.local` und füllen Sie die Werte aus:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Stripe Test-Modus

Verwenden Sie die Stripe-Testschlüssel für die Entwicklung. Testkarten finden Sie in der [Stripe-Dokumentation](https://stripe.com/docs/testing).
