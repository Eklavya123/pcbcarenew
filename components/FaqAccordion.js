"use client";
import { useState } from "react";

// FIXED: answers are now always in the HTML (the <p> always renders), and
// only the VISUAL collapse is conditional (via CSS maxHeight), not the
// content itself. Previously the answer text only entered the JSX when
// openIndex===i, meaning it was completely absent from the server-rendered
// HTML Google's first crawl sees — even though the same text was already
// correct in the FAQPage JSON-LD. That mismatch is fixed here.
export default function FaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  if (!faqs || faqs.length === 0) return null;

  return (
    <div style={{ marginTop: 40 }}>
      <h2 style={{ color: "#ffffff", fontSize: 20, marginBottom: 16 }}>
        Frequently Asked Questions
      </h2>
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} style={{ borderBottom: "1px solid #2a3050", padding: "14px 0" }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
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
              <span style={{ color: "#ffd700" }}>{isOpen ? "−" : "+"}</span>
            </button>
            {/* Always rendered — visibility controlled by CSS, not by
                whether the JSX exists at all. This is what makes the text
                present in the raw server-rendered HTML. */}
            <div
              style={{
                maxHeight: isOpen ? 500 : 0,
                overflow: "hidden",
                transition: "max-height 0.2s ease",
              }}
            >
              <p style={{ color: "#b0b8d0", marginTop: 10, lineHeight: 1.6 }}>{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
