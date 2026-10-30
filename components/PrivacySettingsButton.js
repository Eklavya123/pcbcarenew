"use client";

// Footer link that reopens the analytics/ads choice so it can be changed or withdrawn at any time.
export default function PrivacySettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("pcb-open-consent"))}
      style={{ background: "none", border: "none", padding: 0, color: "var(--subtext)", cursor: "pointer", font: "inherit" }}
    >
      Privacy settings
    </button>
  );
}
