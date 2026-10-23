import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GUIDES, getGuide } from "@/lib/guides";
import { Disclaimer } from "@/components/SiteChrome";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuide(params.slug);
  if (!g) return {};
  return { title: g.title, description: g.description, alternates: { canonical: `/ratgeber/${g.slug}` } };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faq.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
  };
  return (
    <main className="max-w-3xl mx-auto px-4 pt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <h1 className="text-3xl font-bold">{g.h1}</h1>
      <p className="mt-4 text-gray-700">{g.intro}</p>
      {g.sections.map((s) => (
        <section key={s.h2} className="mt-6">
          <h2 className="text-xl font-semibold">{s.h2}</h2>
          {s.p.map((t) => <p key={t} className="mt-2 text-gray-700">{t}</p>)}
        </section>
      ))}
      <div className="mt-8 bg-primary-50 border border-primary-200 rounded-xl p-5">
        <p className="font-semibold">Ihre Abrechnung kostenlos prüfen lassen</p>
        <p className="text-sm text-gray-600 mt-1">Fristen, nicht umlagefähige Kosten und Rechenfehler in wenigen Minuten.</p>
        <Link href="/check" className="inline-block mt-3 bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700">Zum Check</Link>
      </div>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Häufige Fragen</h2>
        {g.faq.map((x) => (
          <div key={x.q} className="mt-3"><h3 className="font-medium">{x.q}</h3><p className="text-gray-700 text-sm mt-1">{x.a}</p></div>
        ))}
      </section>
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Weitere Ratgeber</h2>
        <ul className="mt-2 text-sm text-primary-700 space-y-1">
          {GUIDES.filter((o) => o.slug !== g.slug).slice(0, 4).map((o) => (
            <li key={o.slug}><Link href={`/ratgeber/${o.slug}`} className="hover:underline">{o.h1}</Link></li>
          ))}
        </ul>
      </section>
      <div className="mt-8"><Disclaimer /></div>
    </main>
  );
}
