import { NextRequest, NextResponse } from "next/server";
import { getStripe, appUrl } from "@/lib/stripe";
import { TIERS, Tier } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Zahlung ist noch nicht konfiguriert (STRIPE_SECRET_KEY fehlt)." },
      { status: 503 }
    );
  }
  try {
    const { tier, waiver } = (await req.json()) as { tier: Tier; waiver?: boolean };
    if (!(tier in TIERS)) return NextResponse.json({ error: "Unbekanntes Paket." }, { status: 400 });
    if (!waiver) {
      return NextResponse.json(
        { error: "Bitte stimmen Sie dem Beginn der digitalen Leistung und dem Erlöschen des Widerrufsrechts zu." },
        { status: 400 }
      );
    }
    const t = TIERS[tier];
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: t.cents,
            product_data: { name: `Nebenkosten-Check: ${t.name}` },
          },
        },
      ],
      locale: "de",
      success_url: `${appUrl()}/check/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl()}/check`,
      metadata: { tier, waiver: "accepted" },
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("checkout error", e);
    return NextResponse.json({ error: "Checkout fehlgeschlagen." }, { status: 500 });
  }
}
