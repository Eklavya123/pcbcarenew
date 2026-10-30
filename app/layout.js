import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConsentBanner from "../components/ConsentBanner";
import JsonLd from "../components/JsonLd";
import { localBusinessSchema } from "../lib/seo";
import { SITE_URL, BUSINESS, GA_MEASUREMENT_ID } from "../lib/constants";

const GOOGLE_ADS_ID = "AW-18518018282";
const GOOGLE_ADS_WHATSAPP_CONVERSION = "AW-18518018282/N8XdCM3p058dEOqRiv5E";

// One gtag.js loader serves both GA4 and Google Ads. The loader falls back
// to the Ads ID so Ads still works if GA_MEASUREMENT_ID is ever empty.
const GTAG_LOADER_ID = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;

const gtagInit = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  // Privacy: every consent type starts DENIED. A saved "granted" choice (made with
  // the banner, components/ConsentBanner.js) is replayed right away; otherwise
  // Google stores nothing and the WhatsApp conversion below is sent cookieless.
  gtag('consent', 'default', {ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied', analytics_storage:'denied', wait_for_update:500});
  try{var _c=JSON.parse(localStorage.getItem('pcb_consent_v1')||'null');if(_c&&_c.choice==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}
  gtag('js', new Date());
  ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ""}
  gtag('config', '${GOOGLE_ADS_ID}');

  // WhatsApp click conversion (Google Ads).
  // Automatically tracks a click on ANY WhatsApp link on the site
  // (wa.me, api.whatsapp.com, web.whatsapp.com), so no changes are needed
  // in individual buttons or components.
  (function () {
    var SEND_TO = '${GOOGLE_ADS_WHATSAPP_CONVERSION}';

    function isWhatsAppLink(href) {
      if (!href) return false;
      href = String(href).toLowerCase();
      return (
        href.indexOf('wa.me') !== -1 ||
        href.indexOf('api.whatsapp.com') !== -1 ||
        href.indexOf('web.whatsapp.com') !== -1 ||
        href.indexOf('whatsapp://') === 0
      );
    }

    document.addEventListener('click', function (e) {
      var el = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!el || !isWhatsAppLink(el.href)) return;
      if (typeof gtag !== 'function') return;

      var url = el.href;
      var opensNewTab = el.target === '_blank';

      // Link opens in a new tab: just record the conversion.
      if (opensNewTab) {
        gtag('event', 'conversion', { 'send_to': SEND_TO });
        return;
      }

      // Same-tab link: record the conversion, then open WhatsApp
      // (with a 1 second fallback so the customer is never stuck).
      e.preventDefault();
      var done = false;
      function go() {
        if (done) return;
        done = true;
        window.location.href = url;
      }
      gtag('event', 'conversion', { 'send_to': SEND_TO, 'event_callback': go });
      setTimeout(go, 1000);
    }, true);
  })();
`;

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
    "PCB repair for AC, washing machine, refrigerator and microwave in Jabalpur. Original parts, tested boards, warranty included.",
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
        <ConsentBanner />

        {/* Google tag: GA4 (G-7LJ17PXJ8C, from lib/constants.js) and
            Google Ads (AW-18518018282) share one loader and one init.
            The init also tracks WhatsApp link clicks as a Google Ads conversion. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_LOADER_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {gtagInit}
        </Script>
      </body>
    </html>
  );
    }
