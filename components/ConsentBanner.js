"use client";
import { useEffect, useState } from "react";

// Consent for Google Analytics and Google Ads (the only tracking on this site).
// app/layout.js starts Google's tags with every consent type DENIED and replays
// a saved "granted" choice. This banner records the visitor's choice. Rejecting
// is as easy as accepting, and the choice can be changed any time from the
// "Privacy settings" link in the footer.
const KEY = "pcb_consent_v1";

const readChoice = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "null");
    return v && (v.choice === "granted" || v.choice === "denied") ? v.choice : null;
  } catch {
    return null;
  }
};

function saveChoice(choice) {
  try { localStorage.setItem(KEY, JSON.stringify({ choice, at: new Date().toISOString() })); } catch {}
  try {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: choice, ad_user_data: choice, ad_personalization: choice, analytics_storage: choice,
      });
    }
  } catch {}
}

const isCrawler = () => /bot|crawl|spider|slurp|inspectiontool|lighthouse/i.test(navigator.userAgent || "");

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const existing = readChoice();
    setCurrent(existing);
    if (!existing && !isCrawler()) setOpen(true); // first visit: ask. Crawlers are never shown the banner.
    const reopen = () => { setCurrent(readChoice()); setOpen(true); };
    window.addEventListener("pcb-open-consent", reopen);
    return () => window.removeEventListener("pcb-open-consent", reopen);
  }, []);

  if (!open) return null;
  const choose = (c) => { saveChoice(c); setCurrent(c); setOpen(false); };
  const btn = (active) => ({
    flex: 1, padding: "10px", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13,
    border: `1px solid ${active ? "var(--pc-green, #4caf50)" : "var(--border, #2a3050)"}`,
    background: "var(--bg, #0a0d14)", color: active ? "var(--pc-green, #4caf50)" : "var(--text, #fff)",
  });
  return (
    <div
      role="dialog"
      aria-label="Analytics and ads choices"
      style={{
        position: "fixed", left: 12, right: 12, bottom: 12, zIndex: 60, maxWidth: 560, margin: "0 auto",
        background: "var(--card, #1a1f2e)", border: "1px solid var(--border, #2a3050)", borderRadius: 14,
        padding: 14, boxShadow: "0 6px 24px rgba(0,0,0,.5)",
      }}
    >
      <div style={{ fontSize: 13, lineHeight: 1.55, color: "var(--muted, #b0b8d0)", marginBottom: 12 }}>
        We use Google Analytics and Google Ads to count visits and measure our ads. They stay <b>off</b> unless
        you accept. You can change this any time with &ldquo;Privacy settings&rdquo; in the footer.{" "}
        <a href="/privacy-policy" style={{ color: "var(--pc-green, #4caf50)" }}>Privacy Policy</a>{" · "}
        <a href="/cookie-policy" style={{ color: "var(--pc-green, #4caf50)" }}>Cookie Policy</a>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => choose("denied")} style={btn(current === "denied")}>Reject</button>
        <button onClick={() => choose("granted")} style={btn(current === "granted")}>Accept</button>
      </div>
    </div>
  );
}
