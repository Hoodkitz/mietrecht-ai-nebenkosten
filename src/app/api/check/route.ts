import { NextRequest, NextResponse } from "next/server";
import { CheckInput, preview, runChecks, validateInput } from "@/lib/checks";

// Kostenlose Vorschau: nur Anzahl, Potenzial und Titel der ersten Punkte. Es werden keine Eingaben gespeichert.
export async function POST(req: NextRequest) {
  const input = (await req.json()) as CheckInput;
  const errors = validateInput(input);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });
  const { findings, deadlines } = runChecks(input);
  return NextResponse.json({ preview: preview(findings, input.items.reduce((a, x) => a + (x.tenantShare || 0), 0)), deadlines });
}
