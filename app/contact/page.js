import { buildMetadata } from "../../lib/seo";
import { BUSINESS } from "../../lib/constants";
import LocationMap from "../../components/LocationMap";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: `Contact ${BUSINESS.name} — phone, address, and hours for our Jabalpur location.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div>
      <h1 style={{ color: "var(--text)", fontSize: 28, marginBottom: 24 }}>Contact Us</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
        <div>
          <div className="pcb-card" style={{ padding: 20 }}>
            <div style={{ color: "var(--text)", fontWeight: 700, marginBottom: 14 }}>{BUSINESS.name}</div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ color: "var(--subtext)", fontSize: 12, marginBottom: 4 }}>Address</div>
              <div style={{ color: "var(--muted)" }}>{BUSINESS.address}</div>
            </div>

            {BUSINESS.phone && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: "var(--subtext)", fontSize: 12, marginBottom: 4 }}>Phone</div>
                <a href={`tel:${BUSINESS.phone}`} style={{ color: "var(--pc-gold)", textDecoration: "none", fontWeight: 600 }}>
                  {BUSINESS.phone}
                </a>
              </div>
            )}

            {BUSINESS.hours && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: "var(--subtext)", fontSize: 12, marginBottom: 4 }}>Hours</div>
                {/* NEXT_PUBLIC_BUSINESS_HOURS is stored in schema.org format
                    (e.g. "Mo-Sa 11:00-21:00") for structured data — shown
                    here in a friendlier form. Edit this line directly if
                    your hours change, it's not derived automatically. */}
                <div style={{ color: "var(--muted)" }}>Monday – Saturday, 11:00 AM – 9:00 PM</div>
              </div>
            )}

            {(BUSINESS.facebookUrl || BUSINESS.instagramUrl) && (
              <div>
                <div style={{ color: "var(--subtext)", fontSize: 12, marginBottom: 8 }}>Follow Us</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {BUSINESS.facebookUrl && (
                    <a href={BUSINESS.facebookUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--pc-gold)" }}>
                      Facebook
                    </a>
                  )}
                  {BUSINESS.instagramUrl && (
                    <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--pc-gold)" }}>
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/*
            No contact form here on purpose. A form that just sits there
            without a backend to actually send the message would silently
            fail or need a fake "thank you" that doesn't really notify
            anyone. If you want a real working form later, it needs a
            transactional email service (e.g. Resend) wired to a Next.js
            API route — a real but separate piece of work, not something
            to fake in the meantime.
          */}
        </div>

        <LocationMap />
      </div>
    </div>
  );
}
