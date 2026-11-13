import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Optional: Der Ergebnis-Flow prüft die Zahlung direkt per Session-ID. Der Webhook dient nur dem Logging.
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Webhook nicht konfiguriert" }, { status: 503 });
  const body = await req.text();
  try {
    const event = stripe.webhooks.constructEvent(body, req.headers.get("stripe-signature") || "", secret);
    if (event.type === "checkout.session.completed") console.log("Checkout abgeschlossen:", event.data.object.id);
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Ungültige Signatur" }, { status: 400 });
  }
}
