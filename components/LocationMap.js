import { BUSINESS } from "../lib/constants";

// Uses the no-API-key Google Maps embed URL pattern. This works and is
// widely used, but it's the unofficial embed method — Google's officially
// supported "Maps Embed API" needs an API key (same Google Cloud project
// you'll set up for reviews below could also enable this one, at which
// point swapping the src to the official endpoint is a one-line change).
export default function LocationMap() {
  if (!BUSINESS.lat || !BUSINESS.lng) {
    return (
      <div style={{ color: "#ff4757", padding: 20, textAlign: "center" }}>
        TODO: set NEXT_PUBLIC_BUSINESS_LAT / NEXT_PUBLIC_BUSINESS_LNG to show the map
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--border)",
        height: 320,
      }}
    >
      <iframe
        title={`${BUSINESS.name} location`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${BUSINESS.lat},${BUSINESS.lng}&hl=en&z=15&output=embed`}
      />
    </div>
  );
}
