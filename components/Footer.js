import { BUSINESS } from "../lib/constants";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a0d14",
        borderTop: "1px solid #2a3050",
        color: "#6b7db3",
        padding: "32px 20px",
        marginTop: 60,
        fontSize: 13,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ color: "#ffffff", fontWeight: 700, marginBottom: 6 }}>
          {BUSINESS.name}
        </div>
        <div>{BUSINESS.tagline}</div>
        {/* NAP block — keep this exact text consistent everywhere this
            business is listed (Google Business Profile, directories, etc.).
            Inconsistent address formatting across the web is one of the
            most common reasons local rankings underperform. */}
        <div style={{ marginTop: 10 }}>
          {BUSINESS.address || (
            <span style={{ color: "#ff4757" }}>TODO: set NEXT_PUBLIC_BUSINESS_ADDRESS</span>
          )}
        </div>
        {BUSINESS.phone ? (
          <div>
            <a href={`tel:${BUSINESS.phone}`} style={{ color: "#6b7db3" }}>
              {BUSINESS.phone}
            </a>
          </div>
        ) : (
          <div style={{ color: "#ff4757" }}>TODO: set NEXT_PUBLIC_BUSINESS_PHONE</div>
        )}
        <div style={{ marginTop: 16, opacity: 0.6 }}>
          © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
