// Renders JSON-LD as a real <script> tag in the server-rendered HTML — this
// is the whole fix. The old App.js version built this exact same schema
// shape (see blogPostingSchema/breadcrumbSchema in lib/seo.js, ported
// directly from App.js's ensureMeta-based logic) but injected it into the
// DOM client-side after the JS bundle ran, which Googlebot's first pass
// never sees. This version is in the HTML before any JS executes.
export default function JsonLd({ data }) {
  if (!data) return null;
  const items = Array.isArray(data) ? data.filter(Boolean) : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
