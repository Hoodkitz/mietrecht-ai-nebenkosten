"use client";
import { useState } from "react";
import { CATEGORY_LABELS, KEY_LABELS, Category, Key, CostItem, CheckInput, eur } from "@/lib/checks";
import { TIERS, priceLabel, Tier } from "@/lib/pricing";
import { Disclaimer } from "@/components/SiteChrome";

type Preview = {
  total: number; relevant: number; potentialEur: number;
  teasers: { severity: string; title: string }[];
};

const newItem = (): CostItem => ({
  id: Math.random().toString(36).slice(2, 8), category: "grundsteuer", label: "",
  totalCost: 0, tenantShare: 0, key: "flaeche", inContract: true,
});

const inp = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm";
const lbl = "block text-sm font-medium text-gray-700 mb-1";

export default function CheckPage() {
  const [f, setF] = useState({
    periodStart: "", periodEnd: "", receivedOn: "", monthlyPrepayment: "", statedResult: "",
    tenantArea: "", totalArea: "", contractArea: "", previousYearTotal: "", vacancy: false,
  });
  const [items, setItems] = useState<CostItem[]>([newItem()]);
  const [errors, setErrors] = useState<string[]>([]);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [waiver, setWaiver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [payError, setPayError] = useState("");

  const num = (s: string) => (s === "" ? 0 : Number(s.replace(",", ".")));
  const build = (): CheckInput => ({
    periodStart: f.periodStart, periodEnd: f.periodEnd, receivedOn: f.receivedOn,
    monthlyPrepayment: num(f.monthlyPrepayment), statedResult: num(f.statedResult),
    tenantArea: num(f.tenantArea), totalArea: num(f.totalArea),
    contractArea: f.contractArea ? num(f.contractArea) : undefined,
    previousYearTotal: f.previousYearTotal ? num(f.previousYearTotal) : undefined,
    vacancy: f.vacancy, items,
  });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const upd = (id: string, p: Partial<CostItem>) => setItems(items.map((x) => (x.id === id ? { ...x, ...p } : x)));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErrors([]); setPreview(null);
    const res = await fetch("/api/check", { method: "POST", body: JSON.stringify(build()) });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setErrors(data.errors ?? ["Fehler bei der Prüfung."]);
    setPreview(data.preview);
    try { sessionStorage.setItem("nk-input", JSON.stringify(build())); } catch {}
  }

  async function pay(tier: Tier) {
    setPayError(""); setBusy(true);
    const res = await fetch("/api/checkout", { method: "POST", body: JSON.stringify({ tier, waiver }) });
    const data = await res.json();
    setBusy(false);
    if (data.url) window.location.href = data.url;
    else setPayError(data.error ?? "Checkout nicht möglich.");
  }

  return (
    <main className="max-w-3xl mx-auto px-4 pt-8">
      <h1 className="text-2xl font-bold">Nebenkostenabrechnung prüfen</h1>
      <p className="text-sm text-gray-600 mt-1">Alle Angaben finden Sie in Ihrer Abrechnung und im Mietvertrag. Eingaben werden nicht gespeichert.</p>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <fieldset className="grid sm:grid-cols-3 gap-4">
          <div><label className={lbl}>Zeitraum von</label><input required type="date" className={inp} value={f.periodStart} onChange={set("periodStart")} /></div>
          <div><label className={lbl}>Zeitraum bis</label><input required type="date" className={inp} value={f.periodEnd} onChange={set("periodEnd")} /></div>
          <div><label className={lbl}>Abrechnung zugegangen am</label><input required type="date" className={inp} value={f.receivedOn} onChange={set("receivedOn")} /></div>
          <div><label className={lbl}>Ihre Wohnfläche (m²)</label><input required inputMode="decimal" className={inp} value={f.tenantArea} onChange={set("tenantArea")} /></div>
          <div><label className={lbl}>Gesamtfläche Haus (m²)</label><input required inputMode="decimal" className={inp} value={f.totalArea} onChange={set("totalArea")} /></div>
          <div><label className={lbl}>Fläche laut Mietvertrag (optional)</label><input inputMode="decimal" className={inp} value={f.contractArea} onChange={set("contractArea")} /></div>
          <div><label className={lbl}>Vorauszahlung pro Monat (EUR)</label><input inputMode="decimal" className={inp} value={f.monthlyPrepayment} onChange={set("monthlyPrepayment")} /></div>
          <div><label className={lbl}>Ergebnis (+ Nachzahlung / - Guthaben)</label><input required inputMode="decimal" className={inp} value={f.statedResult} onChange={set("statedResult")} /></div>
          <div><label className={lbl}>Ihre Kosten im Vorjahr (optional)</label><input inputMode="decimal" className={inp} value={f.previousYearTotal} onChange={set("previousYearTotal")} /></div>
          <label className="flex items-center gap-2 text-sm sm:col-span-3"><input type="checkbox" checked={f.vacancy} onChange={set("vacancy")} /> Im Haus stehen Wohnungen leer</label>
        </fieldset>

        <section>
          <h2 className="font-semibold mb-2">Kostenpositionen</h2>
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="border rounded-lg p-3 grid sm:grid-cols-6 gap-2">
                <select className={inp + " sm:col-span-2"} value={it.category} onChange={(e) => upd(it.id, { category: e.target.value as Category })}>
                  {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
                </select>
                <input aria-label="Gesamtkosten Haus" placeholder="Gesamt Haus EUR" inputMode="decimal" className={inp} onChange={(e) => upd(it.id, { totalCost: num(e.target.value) })} />
                <input aria-label="Ihr Anteil" placeholder="Ihr Anteil EUR" inputMode="decimal" className={inp} onChange={(e) => upd(it.id, { tenantShare: num(e.target.value) })} />
                <select className={inp} value={it.key} onChange={(e) => upd(it.id, { key: e.target.value as Key })}>
                  {(Object.keys(KEY_LABELS) as Key[]).map((k) => <option key={k} value={k}>{KEY_LABELS[k]}</option>)}
                </select>
                <button type="button" className="text-sm text-red-600" onClick={() => setItems(items.filter((x) => x.id !== it.id))} disabled={items.length === 1}>Entfernen</button>
                <label className="flex items-center gap-2 text-sm sm:col-span-3"><input type="checkbox" checked={it.inContract} onChange={(e) => upd(it.id, { inContract: e.target.checked })} /> Im Mietvertrag als umlagefähig vereinbart</label>
                {(it.category === "heizung" || it.category === "warmwasser") && (
                  <input aria-label="Verbrauchsanteil Prozent" placeholder="Verbrauchsanteil % (z. B. 70)" inputMode="decimal" className={inp + " sm:col-span-3"} onChange={(e) => upd(it.id, { consumptionPercent: e.target.value === "" ? undefined : num(e.target.value) })} />
                )}
              </div>
            ))}
          </div>
          <button type="button" className="mt-3 text-sm text-primary-700" onClick={() => setItems([...items, newItem()])}>+ Position hinzufügen</button>
        </section>

        {errors.length > 0 && <ul className="text-sm text-red-700 bg-red-50 rounded-lg p-3 list-disc pl-6">{errors.map((x) => <li key={x}>{x}</li>)}</ul>}
        <button disabled={busy} className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50">Kostenlose Vorschau erstellen</button>
      </form>

      {preview && (
        <section className="mt-10 border-2 border-primary-200 rounded-xl p-5" aria-live="polite">
          <h2 className="text-xl font-bold">Ihre Vorschau</h2>
          <p className="mt-2">Wir haben <strong>{preview.relevant} Auffälligkeiten</strong> gefunden{preview.potentialEur > 0 && <>, mögliches Potenzial bis zu <strong>{eur(preview.potentialEur)}</strong></>}.</p>
          <ul className="mt-3 text-sm space-y-1">
            {preview.teasers.map((t) => <li key={t.title}>• {t.title}</li>)}
          </ul>
          <p className="text-sm text-gray-500 mt-2">Details, Rechtsgrundlagen und Fristen sehen Sie im Report.</p>
          <label className="flex items-start gap-2 text-sm mt-4"><input type="checkbox" className="mt-1" checked={waiver} onChange={(e) => setWaiver(e.target.checked)} />
            <span>Ich stimme ausdrücklich zu, dass die digitale Leistung sofort beginnt, und weiß, dass mein Widerrufsrecht damit erlischt (siehe <a className="underline" href="/agb">AGB und Widerruf</a>).</span></label>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {(Object.keys(TIERS) as Tier[]).map((t) => (
              <button key={t} disabled={!waiver || busy} onClick={() => pay(t)} className="border rounded-lg p-4 text-left hover:border-primary-600 disabled:opacity-50">
                <span className="font-semibold">{TIERS[t].name}</span><br /><span className="text-xl font-bold">{priceLabel(TIERS[t].cents)}</span>
              </button>
            ))}
          </div>
          {payError && <p className="text-sm text-red-700 mt-3">{payError}</p>}
        </section>
      )}
      <div className="mt-8"><Disclaimer /></div>
    </main>
  );
}
