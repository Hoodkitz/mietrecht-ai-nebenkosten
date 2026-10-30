import Stripe from "stripe";

// Nur Test-Schlüssel (sk_test_) werden akzeptiert, solange ALLOW_LIVE_STRIPE nicht gesetzt ist.
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (key.startsWith("sk_live_") && process.env.ALLOW_LIVE_STRIPE !== "true") return null;
  return new Stripe(key, { apiVersion: "2024-06-20" });
}
export const appUrl = () => process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
