import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import { localBusinessSchema } from "../lib/seo";
import { SITE_URL, BUSINESS } from "../lib/constants";

// next/font self-hosts these at build time — no request to fonts.googleapis.com
// at runtime, no render-blocking @import, no layout shift. This matters for
// Core Web Vitals, which is a real (if minor) Google ranking signal — worth
// getting right while rebuilding the UI rather than bolting on a <link> tag
// that would undo it.
const heading = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS.name} — Appliance PCB Repair in Jabalpur`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    "Professional PCB repair for AC, washing machine, refrigerator and microwave in Jabalpur.",
};

export const viewport = {
  themeColor: "#0a0d14", // matches meta-theme-color already used in the existing app
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <head>
        {/* Supabase Storage serves the featured/product images referenced
            throughout this site — preconnecting shaves the DNS+TLS
            handshake off the first image request on every page. */}
        <link rel="preconnect" href="https://vdyyaiapyhwqnxzeujim.supabase.co" />
      </head>
      <body style={{ fontFamily: "var(--font-body)" }}>
        <JsonLd data={localBusinessSchema()} />
        <Header />
        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px", minHeight: "60vh" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
