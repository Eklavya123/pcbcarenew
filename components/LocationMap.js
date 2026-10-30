"use client";
import { useState } from "react";
import { BUSINESS } from "../lib/constants";

// The map is provided by Google. Loading it sends the visitor's IP address and
// device details to Google, so it is NOT loaded until the visitor presses
// "Show map". Until then only a plain link to Google Maps is shown.
// (Uses the no-API-key embed URL; Google's official Maps Embed API needs a key.)
export default function LocationMap() {
  const [show, setShow] = useState(false);

  if (!BUSINESS.lat || !BUSINESS.lng) {
    return (
      <div style={{ color: "#ff4757", padding: 20, textAlign: "center" }}>
        TODO: set NEXT_PUBLIC_BUSINESS_LAT / NEXT_PUBLIC_BUSINESS_LNG to show the map
      </div>
    );
  }

  const box = {
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    border: "1px solid var(--border)",
    height: 320,
  };

  if (!show) {
    return (
      <div style={{ ...box, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 20, textAlign: "center", background: "var(--card)" }}>
        <div style={{ color: "var(--text)", fontWeight: 700 }}>{BUSINESS.name} location</div>
        {BUSINESS.address && <div style={{ color: "var(--muted)", fontSize: 13 }}>{BUSINESS.address}</div>}
        <div style={{ color: "var(--subtext)", fontSize: 12, maxWidth: 360, lineHeight: 1.5 }}>
          The map is provided by Google. Showing it shares your IP address and device details with Google.
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => setShow(true)}
            style={{ padding: "10px 18px", borderRadius: 10, border: "1px solid var(--pc-green)", background: "var(--bg)", color: "var(--pc-green)", fontWeight: 700, cursor: "pointer" }}
          >
            Show map
          </button>
          <a
            href={`https://www.google.com/maps?q=${BUSINESS.lat},${BUSINESS.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: "10px 18px", borderRadius: 10, border: "1px solid var(--border)", color: "var(--text)", textDecoration: "none" }}
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={box}>
      <iframe
        title={`${BUSINESS.name} location`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${BUSINESS.lat},${BUSINESS.lng}&hl=en&z=15&output=embed`}
      />
    </div>
  );
}
