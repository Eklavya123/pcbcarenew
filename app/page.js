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
      <section style={{ padding: "48px 0", textAlign: "center" }}>
        <h1 style={{ color: "#ffffff", fontSize: 32, marginBottom: 12 }}>
          Appliance PCB Repair in Jabalpur
        </h1>
        <p style={{ color: "#b0b8d0", fontSize: 16, maxWidth: 560, margin: "0 auto 24px" }}>
          {/* TODO: replace with real business copy — a couple of sentences on
              what makes this business trustworthy (years in business, number
              of repairs, brands serviced, warranty terms). Placeholder below
              on purpose so it's obviously unfinished, not accidentally launched. */}
          AC, washing machine, refrigerator and microwave PCB repair with
          original parts and a warranty on every board.
        </p>
        {BUSINESS.phone && (
          <a
            href={`tel:${BUSINESS.phone}`}
            style={{
              display: "inline-block",
              background: "#4caf50",
              color: "#0a0d14",
              padding: "12px 28px",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Call {BUSINESS.phone}
          </a>
        )}
      </section>

      <section style={{ padding: "32px 0" }}>
        <h2 style={{ color: "#ffffff", fontSize: 22, marginBottom: 20 }}>Our Services</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              style={{
                display: "block",
                background: "#1a1f2e",
                border: "1px solid #2a3050",
                borderRadius: 12,
                padding: 20,
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 600,
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
          <h2 style={{ color: "#ffffff", fontSize: 22, marginBottom: 16 }}>Areas We Serve</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {SERVICE_AREAS.map((area) => (
              <span
                key={area.slug}
                style={{
                  background: "#1a1f2e",
                  border: "1px solid #2a3050",
                  color: "#b0b8d0",
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 13,
                }}
              >
                {area.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
