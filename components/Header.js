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
            style={{ height: 44, width: "auto" }}
          />
        </Link>
        <div style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/blog" style={navLinkStyle}>Blog</Link>
          <a
            href={`${SHOP_URL}/shop`}
            className="pcb-btn-primary"
            style={{ padding: "8px 20px", fontSize: 14 }}
          >
            Buy PCBs
          </a>
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
};
