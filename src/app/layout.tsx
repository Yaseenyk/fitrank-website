import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { siteGraphJsonLd } from "@/lib/seo";
import { MAKER, PRODUCT, SITE_DESCRIPTION, SITE_URL, VERIFICATION } from "@/lib/site";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const display = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
  display: "swap",
});

const OG_ALT = "FitRank: staffing recommendations with a probability and a reason for every person";

const other: Record<string, string> = {};
if (VERIFICATION.bing) other["msvalidate.01"] = VERIFICATION.bing;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FitRank: AI staffing recommendations your managers can check",
    template: `%s | ${PRODUCT}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: PRODUCT,
  keywords: [
    "AI resource management software",
    "resource allocation software for IT services",
    "employee to project matching",
    "bench management software",
    "skill gap analysis tool",
    "explainable AI staffing",
    "human in the loop AI",
    "workforce planning software",
  ],
  authors: [{ name: MAKER.name, url: MAKER.url }],
  creator: MAKER.name,
  alternates: {
    canonical: `${SITE_URL}/`,
    types: { "text/plain": `${SITE_URL}/llms.txt` },
  },
  openGraph: {
    type: "website",
    siteName: PRODUCT,
    locale: "en_US",
    url: `${SITE_URL}/`,
    title: "FitRank: AI staffing recommendations your managers can check",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  verification: {
    ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}),
    ...(Object.keys(other).length ? { other } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F6F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <JsonLd data={siteGraphJsonLd} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
