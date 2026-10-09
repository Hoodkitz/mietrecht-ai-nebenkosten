import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const { priceId, planName } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "priceId is required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "sepa_debit"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        planName: planName || "unknown",
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
