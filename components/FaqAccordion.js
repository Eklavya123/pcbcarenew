"use client";
import { useState } from "react";

// Client component (needs useState for open/closed), but the FAQ content
// itself is still server-rendered as plain text underneath — the JSON-LD
// FAQPage schema (built separately in lib/seo.js) is what Google actually
// reads for rich results, this UI is just for human visitors.
export default function FaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  if (!faqs || faqs.length === 0) return null;

  return (
    <div style={{ marginTop: 40 }}>
      <h2 style={{ color: "#ffffff", fontSize: 20, marginBottom: 16 }}>
        Frequently Asked Questions
      </h2>
      {faqs.map((faq, i) => (
        <div
          key={i}
          style={{
            borderBottom: "1px solid #2a3050",
            padding: "14px 0",
          }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              width: "100%",
              textAlign: "left",
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {faq.q}
            <span style={{ color: "#ffd700" }}>{openIndex === i ? "−" : "+"}</span>
          </button>
          {openIndex === i && (
            <p style={{ color: "#b0b8d0", marginTop: 10, lineHeight: 1.6 }}>{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
