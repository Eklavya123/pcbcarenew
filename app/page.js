import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "../lib/seo";
import { BUSINESS, SERVICES, SERVICE_AREAS } from "../lib/constants";

export const metadata = buildMetadata({
  title: `${BUSINESS.name} — Appliance PCB Repair in Jabalpur`,
  description:
    "PCB repair for AC, washing machine, refrigerator and microwave in Jabalpur. Original parts, tested boards, warranty included.",
  path: "/",
});

export default function HomePage() {
  return (
    <div>
      <section style={{ padding: "48px 0 40px", textAlign: "center" }}>
        {/* Large hero logo — full-resolution lockup (1376x698 source), not
            the small header copy, so it stays sharp at this size instead of
            upscaling the compressed logo.webp used in the nav bar. */}
        <div style={{ position: "relative", width: "100%", maxWidth: 420, height: 213, margin: "0 auto 8px" }}>
          <Image
            src="/logo.png"
            alt={`${BUSINESS.name} logo`}
            fill
            priority
            style={{ objectFit: "contain" }}
            sizes="(max-width: 480px) 90vw, 420px"
          />
        </div>
        <div className="pcb-accent-line" style={{ margin: "0 auto 18px" }} />
        <h1 style={{ color: "var(--text)", fontWeight: 700, fontSize: 32, marginBottom: 14 }}>
          Appliance PCB Repair in Jabalpur
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.6 }}>
          {/* TODO: replace with real business copy */}
          AC, washing machine, refrigerator and microwave PCB repair with
          original parts and a warranty on every board.
        </p>
        {BUSINESS.phone && (
          <a href={`tel:${BUSINESS.phone}`} className="pcb-btn-primary">
            Call {BUSINESS.phone}
          </a>
        )}
      </section>

      {/* Icon-tile card pattern — matches the Home dashboard's card grid in
          App.js exactly: colored-tint border keyed to each item's color,
          emoji icon, bold title, muted description. */}
      <section style={{ padding: "32px 0" }}>
        <h2 style={{ color: "var(--text)", fontSize: 22, marginBottom: 20 }}>Our Services</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              style={{
                background: "var(--card)",
                border: `1px solid ${s.color}22`,
                borderRadius: 14,
                padding: 16,
                textDecoration: "none",
                display: "block",
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 3 }}>
                {s.name}
              </div>
              <div style={{ fontSize: 11, color: "var(--subtext)", lineHeight: 1.4 }}>
                PCB repair with warranty
              </div>
            </Link>
          ))}
        </div>
        {/* Each link above (e.g. /ac-pcb-repair) resolves through
            app/[slug]/page.js against the `pages` table — create a matching
            published row with that exact slug in the admin panel, or the
            link 404s. */}
      </section>

      {SERVICE_AREAS.length > 0 && (
        <section style={{ padding: "32px 0" }}>
          <h2 style={{ color: "var(--text)", fontSize: 22, marginBottom: 16 }}>Areas We Serve</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {SERVICE_AREAS.map((area) => (
              <span key={area.slug} className="pcb-chip">
                {area.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Same "Follow PCB Care" block from the Home dashboard, real links */}
      {(BUSINESS.facebookUrl || BUSINESS.instagramUrl) && (
        <section style={{ padding: "16px 0 40px" }}>
          <div style={{ background: "var(--card)", borderRadius: 14, padding: 14, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>
              Follow {BUSINESS.name}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {BUSINESS.facebookUrl && (
                <a
                  href={BUSINESS.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "10px", borderRadius: 10, background: "#1877f222", color: "#1877f2",
                    textDecoration: "none", fontWeight: 600, fontSize: 12,
                  }}
                >
                  <span style={{ fontSize: 16 }}>📘</span> Facebook
                </a>
              )}
              {BUSINESS.instagramUrl && (
                <a
                  href={BUSINESS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "10px", borderRadius: 10,
                    background: "linear-gradient(135deg,#f0930022,#dc267722,#a41cd622)",
                    color: "#dc2677", textDecoration: "none", fontWeight: 600, fontSize: 12,
                  }}
                >
                  <span style={{ fontSize: 16 }}>📷</span> Instagram
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
