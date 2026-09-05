import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import { localBusinessSchema } from "../lib/seo";
import { SITE_URL, BUSINESS, GA_MEASUREMENT_ID } from "../lib/constants";

// Your App.js sets fontFamily:"'Inter',sans-serif" in several places (auth
// screens etc.) but nothing in the CRA project ever actually loads Inter —
// no Google Fonts <link>, no @font-face — so it's silently falling back to
// the browser default everywhere it's referenced. Loading it for real here
// completes what the original code was already trying to do, rather than
// reproducing the gap.
const inter = Inter({
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
    "PCBCare - Appliance PCB repair, error codes, wiring diagrams and parts lookup for technicians.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "PCB Care" },
};

export const viewport = {
  themeColor: "#0a0d14", // matches meta-theme-color in the existing app
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://vdyyaiapyhwqnxzeujim.supabase.co" />
      </head>
      <body style={{ fontFamily: "var(--font-body), sans-serif" }}>
        <JsonLd data={localBusinessSchema()} />
        <Header />
        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px", minHeight: "60vh" }}>
          {children}
        </main>
        <Footer />

        {/* Same GA4 property already wired up in the existing app's
            index.html (G-7LJ17PXJ8C) — added here so this domain reports
            into the same analytics account. Remove/replace the ID in
            lib/constants.js if you'd rather track it as a separate property. */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
