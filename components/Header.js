import Link from "next/link";
import { BUSINESS, SHOP_URL } from "../lib/constants";

export default function Header() {
  return (
    <header
      style={{
        background: "#0a0d14",
        borderBottom: "1px solid #2a3050",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <nav
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href="/"
          style={{
            color: "#ffffff",
            fontWeight: 800,
            fontSize: 20,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "#4caf50" }}>PCB</span>
          <span style={{ color: "#ffd700" }}>care</span>
        </Link>
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/blog" style={navLinkStyle}>Blog</Link>
          <Link href="/wiring" style={navLinkStyle}>Wiring Diagrams</Link>
          {BUSINESS.phone && (
            <a href={`tel:${BUSINESS.phone}`} style={ctaStyle}>
              Call {BUSINESS.phone}
            </a>
          )}
          <a href={SHOP_URL} style={{ ...navLinkStyle, opacity: 0.8 }}>
            Technician Tools ↗
          </a>
        </div>
      </nav>
    </header>
  );
}

const navLinkStyle = {
  color: "#b0b8d0",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
};

const ctaStyle = {
  background: "#4caf50",
  color: "#0a0d14",
  padding: "8px 16px",
  borderRadius: 8,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 14,
};
