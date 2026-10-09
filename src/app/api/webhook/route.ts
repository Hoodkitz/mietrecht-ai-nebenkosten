import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Checkout completed:", session.id);
      // TODO: Activate subscription in database
      break;
    }
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("Subscription created:", subscription.id);
      // TODO: Create subscription in database
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("Subscription updated:", subscription.id);
      // TODO: Update subscription in database
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("Subscription deleted:", subscription.id);
      // TODO: Deactivate subscription in database
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log("Payment failed:", invoice.id);
      // TODO: Notify user about failed payment
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
