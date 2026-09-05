import Link from "next/link";
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
      <section style={{ padding: "56px 0 48px", textAlign: "center" }}>
        <div className="pcb-accent-line" style={{ margin: "0 auto 18px" }} />
        <h1
          style={{
            color: "var(--text)",
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: 34,
            marginBottom: 14,
          }}
        >
          Appliance PCB Repair in Jabalpur
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.6 }}>
          {/* TODO: replace with real business copy — a couple of sentences on
              what makes this business trustworthy (years in business, number
              of repairs, brands serviced, warranty terms). Placeholder below
              on purpose so it's obviously unfinished, not accidentally launched. */}
          AC, washing machine, refrigerator and microwave PCB repair with
          original parts and a warranty on every board.
        </p>
        {BUSINESS.phone && (
          <a href={`tel:${BUSINESS.phone}`} className="pcb-btn-primary">
            Call {BUSINESS.phone}
          </a>
        )}
      </section>

      <section style={{ padding: "32px 0" }}>
        <h2
          style={{
            color: "var(--text)",
            fontFamily: "var(--font-heading)",
            fontSize: 22,
            marginBottom: 20,
          }}
        >
          Our Services
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="pcb-card"
              style={{
                display: "block",
                padding: 22,
                color: "var(--text)",
                textDecoration: "none",
                fontWeight: 700,
                fontFamily: "var(--font-heading)",
              }}
            >
              {s.name}
            </Link>
          ))}
        </div>
        {/* Each link above (e.g. /ac-pcb-repair) resolves through
            app/[slug]/page.js against the `pages` table — create a matching
            published row with that exact slug in the admin panel, or the
            link 404s. Same mechanism as any other local-service page. */}
      </section>

      {SERVICE_AREAS.length > 0 && (
        <section style={{ padding: "32px 0" }}>
          <h2
            style={{
              color: "var(--text)",
              fontFamily: "var(--font-heading)",
              fontSize: 22,
              marginBottom: 16,
            }}
          >
            Areas We Serve
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {SERVICE_AREAS.map((area) => (
              <span key={area.slug} className="pcb-chip">
                {area.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
