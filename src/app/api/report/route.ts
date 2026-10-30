import { NextRequest, NextResponse } from "next/server";
import { CheckInput, runChecks, validateInput, widerspruchsbrief } from "@/lib/checks";
import { runLandlordChecks } from "@/lib/landlord";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ error: "Zahlung nicht konfiguriert." }, { status: 503 });
  const { sessionId, input } = (await req.json()) as { sessionId: string; input: CheckInput };
  if (!sessionId || typeof sessionId !== "string") return NextResponse.json({ error: "session_id fehlt" }, { status: 400 });
  const errors = validateInput(input);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });
  try {
    const s = await stripe.checkout.sessions.retrieve(sessionId);
    if (s.payment_status !== "paid") return NextResponse.json({ error: "Zahlung nicht abgeschlossen." }, { status: 402 });
    const tier = s.metadata?.tier;
    if (tier === "vermieter") {
      const l = runLandlordChecks(input);
      return NextResponse.json({ tier, findings: l.findings, deadlines: { abrechnungsfristEnde: l.sendDeadline, einwendungsfristEnde: "" }, brief: null });
    }
    const { findings, deadlines } = runChecks(input);
    return NextResponse.json({
      tier,
      findings,
      deadlines,
      brief: tier === "report" ? widerspruchsbrief(input, findings) : null,
    });
  } catch {
    return NextResponse.json({ error: "Sitzung nicht gefunden." }, { status: 404 });
  }
}
