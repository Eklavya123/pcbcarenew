import { notFound } from "next/navigation";
import { buildMetadata, serviceSchema, webPageSchema, breadcrumbSchema, faqSchema } from "../../lib/seo";
import { getPageBySlug, getPublishedPages } from "../../lib/supabase";
import JsonLd from "../../components/JsonLd";
import FaqAccordion from "../../components/FaqAccordion";
import ServiceAreaList from "../../components/ServiceAreaList";
import Breadcrumbs from "../../components/Breadcrumbs";

// This only catches slugs that don't match a more specific route first
// (Next.js resolves /blog, /wiring etc. before falling through to this file
// — no manual RESERVED_PATH_PREFIXES check needed like the old hand-rolled
// router required, the file-based routing handles it natively).
export async function generateStaticParams() {
  const pages = await getPublishedPages().catch(() => []);
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const page = await getPageBySlug(params.slug);
  if (!page) return {};
  return buildMetadata({
    title: page.meta_title || page.title,
    description: page.meta_description || page.excerpt,
    path: `/${page.slug}`,
    image: page.featured_image,
  });
}

export default async function StaticPage({ params }) {
  const page = await getPageBySlug(params.slug);
  if (!page) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: page.title, path: `/${page.slug}` },
  ];

  const schema = [
    page.schema_type === "service" ? serviceSchema(page) : webPageSchema(page),
    breadcrumbSchema(crumbs),
    faqSchema(page.faqs),
  ];

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumbs items={crumbs} />
      <h1 style={{ color: "#ffffff", fontSize: 28, marginBottom: 16 }}>{page.title}</h1>
      {/* content is admin-authored HTML, same trust boundary as blog posts — see note there */}
      <div
        style={{ color: "#b0b8d0", lineHeight: 1.7, fontSize: 15 }}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
      {page.schema_type === "service" && <ServiceAreaList areas={page.service_areas} />}
      <FaqAccordion faqs={page.faqs} />
    </article>
  );
}
