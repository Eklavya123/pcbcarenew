import Link from "next/link";
import { BUSINESS, SERVICES } from "../lib/constants";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        color: "var(--subtext)",
        padding: "40px 20px 28px",
        marginTop: 60,
        fontSize: 13,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 28,
        }}
      >
        <div>
          <div style={{ color: "var(--text)", fontWeight: 700, marginBottom: 6, fontFamily: "var(--font-heading)" }}>
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
              <a href={`tel:${BUSINESS.phone}`} style={{ color: "var(--subtext)" }}>
                {BUSINESS.phone}
              </a>
            </div>
          ) : (
            <div style={{ color: "#ff4757" }}>TODO: set NEXT_PUBLIC_BUSINESS_PHONE</div>
          )}
        </div>

        {/* Real links to every service page — this is deliberate, not
            decorative: a link from every page on the site to every service
            page gives crawlers a direct path to them beyond sitemap.xml,
            and spreads internal link equity to the highest-value pages. */}
        <div>
          <div style={{ color: "var(--text)", fontWeight: 700, marginBottom: 10, fontFamily: "var(--font-heading)" }}>
            Services
          </div>
          {SERVICES.map((s) => (
            <div key={s.slug} style={{ marginBottom: 6 }}>
              <Link href={`/${s.slug}`} style={{ color: "var(--subtext)", textDecoration: "none" }}>
                {s.name}
              </Link>
            </div>
          ))}
        </div>

        <div>
          <div style={{ color: "var(--text)", fontWeight: 700, marginBottom: 10, fontFamily: "var(--font-heading)" }}>
            Resources
          </div>
          <div style={{ marginBottom: 6 }}>
            <Link href="/blog" style={{ color: "var(--subtext)", textDecoration: "none" }}>Blog</Link>
          </div>
          <div style={{ marginBottom: 6 }}>
            <Link href="/wiring" style={{ color: "var(--subtext)", textDecoration: "none" }}>Wiring Diagrams</Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "24px auto 0", opacity: 0.6 }}>
        © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
      </div>
    </footer>
  );
}
