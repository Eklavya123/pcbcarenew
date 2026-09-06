import Link from "next/link";
import Image from "next/image";
import { BUSINESS, SHOP_URL } from "../lib/constants";

export default function Header() {
  return (
    <header
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <nav
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/logo.webp"
            alt={`${BUSINESS.name} logo`}
            width={500}
            height={253}
            priority
            style={{ height: 44, width: "auto" }}
          />
        </Link>
        <div style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/blog" style={navLinkStyle}>Blog</Link>
          {BUSINESS.phone && (
            <a href={`tel:${BUSINESS.phone}`} className="pcb-btn-primary" style={{ padding: "8px 18px", fontSize: 14 }}>
              Call {BUSINESS.phone}
            </a>
          )}
          <a href={SHOP_URL} style={{ ...navLinkStyle, opacity: 0.75 }}>
            Technician Tools ↗
          </a>
        </div>
      </nav>
    </header>
  );
}

const navLinkStyle = {
  color: "var(--muted)",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "var(--font-heading)",
};
