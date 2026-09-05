// service_areas on the `pages` table is stored as a plain array of city/area
// names (see AdminPages blank object: service_areas: []). This just lists
// them — it does not assume each area has its own dedicated page. Once you
// have real per-area pages (e.g. /ac-repair-wright-town), swap the plain
// <li> below for a <Link> to that page's slug.
export default function ServiceAreaList({ areas }) {
  if (!areas || areas.length === 0) return null;
  return (
    <div style={{ marginTop: 32 }}>
      <h2 style={{ color: "#ffffff", fontSize: 18, marginBottom: 12 }}>
        Areas We Serve
      </h2>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {areas.map((area, i) => (
          <li
            key={i}
            style={{
              background: "#1a1f2e",
              border: "1px solid #2a3050",
              color: "#b0b8d0",
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 13,
            }}
          >
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
}
