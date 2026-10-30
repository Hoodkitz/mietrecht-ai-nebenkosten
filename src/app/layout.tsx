import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: { default: "Nebenkostenabrechnung prüfen: Fehler und Fristen finden", template: "%s | Nebenkosten-Check" },
  description:
    "Prüfen Sie Ihre Nebenkostenabrechnung auf häufige Fehler, nicht umlagefähige Kosten und Fristen. Kostenlose Vorschau, Report ab 4,90 EUR.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
