import Link from "next/link";
import type { Metadata } from "next";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = { title: "Ratgeber Nebenkostenabrechnung", description: "Ratgeber zu Nebenkostenabrechnung, Fristen, Heizkosten und Widerspruch." };

export default function Index() {
  return (
    <main className="max-w-3xl mx-auto px-4 pt-8">
      <h1 className="text-2xl font-bold">Ratgeber Nebenkostenabrechnung</h1>
      <ul className="mt-4 space-y-3">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <Link href={`/ratgeber/${g.slug}`} className="font-medium text-primary-700 hover:underline">{g.h1}</Link>
            <p className="text-sm text-gray-600">{g.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
