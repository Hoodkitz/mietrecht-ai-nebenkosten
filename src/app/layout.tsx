import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mietrecht AI Nebenkosten – Nebenkostenabrechnung einfach gemacht",
  description:
    "Automatisierte Nebenkostenabrechnung, Heizkosten-VKO, Umlage, Rechnungen und Konten. Ab 29€/Monat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
