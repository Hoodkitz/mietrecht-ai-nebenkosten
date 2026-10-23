"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Finding, eur } from "@/lib/checks";
import { Disclaimer } from "@/components/SiteChrome";

type Report = { tier: string; findings: Finding[]; brief: string | null; deadlines: { einwendungsfristEnde: string; abrechnungsfristEnde: string } };
const color = { hoch: "bg-red-100 text-red-800", mittel: "bg-yellow-100 text-yellow-800", hinweis: "bg-blue-100 text-blue-800" } as const;

function Inner() {
  const sid = useSearchParams().get("session_id");
  const [r, setR] = useState<Report | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let input: string | null = null;
    try { input = sessionStorage.getItem("nk-input"); } catch {}
    if (!sid || !input) { setErr("Eingaben nicht mehr vorhanden. Bitte starten Sie die Prüfung erneut."); return; }
    fetch("/api/report", { method: "POST", body: JSON.stringify({ sessionId: sid, input: JSON.parse(input) }) })
      .then(async (res) => { const d = await res.json(); if (!res.ok) throw new Error(d.error ?? "Fehler"); setR(d); })
      .catch((e) => setErr(e.message));
  }, [sid]);

  if (err) return <p className="text-red-700">{err}</p>;
  if (!r) return <p>Report wird erstellt ...</p>;
  return (
    <>
      <h1 className="text-2xl font-bold">Ihr Nebenkosten-Report</h1>
      <p className="text-sm text-gray-600 mt-1">Abrechnungsfrist des Vermieters: {r.deadlines.abrechnungsfristEnde}. Ihre Einwendungsfrist: {r.deadlines.einwendungsfristEnde}. <button className="underline print:hidden" onClick={() => window.print()}>Drucken / als PDF speichern</button></p>
      <ul className="mt-6 space-y-3">
        {r.findings.map((f) => (
          <li key={f.id} className="border rounded-lg p-4">
            <span className={`text-xs px-2 py-0.5 rounded ${color[f.severity]}`}>{f.severity}</span>
            <h2 className="font-semibold mt-1">{f.title}</h2>
            <p className="text-sm text-gray-700 mt-1">{f.detail}</p>
            <p className="text-xs text-gray-500 mt-1">{f.legal}{f.potentialEur ? ` · mögliches Potenzial: ${eur(f.potentialEur)}` : ""}</p>
          </li>
        ))}
      </ul>
      {r.brief && (
        <section className="mt-8">
          <h2 className="text-xl font-bold">Vorlage Widerspruchsbrief</h2>
          <pre className="mt-2 whitespace-pre-wrap text-sm bg-gray-50 border rounded-lg p-4">{r.brief}</pre>
        </section>
      )}
    </>
  );
}

export default function Ergebnis() {
  return (
    <main className="max-w-3xl mx-auto px-4 pt-8">
      <Suspense fallback={<p>Laden ...</p>}><Inner /></Suspense>
      <div className="mt-8"><Disclaimer /></div>
    </main>
  );
}
