import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const pages = ["", "/check", "/ratgeber", "/impressum", "/datenschutz", "/agb", "/haftungsausschluss"];
  return [...pages.map((p) => ({ url: base + p })), ...GUIDES.map((g) => ({ url: `${base}/ratgeber/${g.slug}` }))];
}
