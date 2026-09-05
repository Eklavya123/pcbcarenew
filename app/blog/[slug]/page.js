import { notFound } from "next/navigation";
import { buildMetadata, blogPostingSchema, breadcrumbSchema, faqSchema } from "../../../lib/seo";
import { getPostBySlug, getPublishedPosts } from "../../../lib/supabase";
import JsonLd from "../../../components/JsonLd";
import FaqAccordion from "../../../components/FaqAccordion";

// Pre-builds every published post at build time — this is the actual SSG
// step. Combined with the revalidate window in lib/supabase.js, new posts
// published in the existing admin panel appear without a manual redeploy.
export async function generateStaticParams() {
  const posts = await getPublishedPosts().catch(() => []);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featured_image,
  });
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const schema = [
    blogPostingSchema(post),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    faqSchema(post.faqs),
  ];

  return (
    <article>
      <JsonLd data={schema} />
      <h1 style={{ color: "#ffffff", fontSize: 28, marginBottom: 16 }}>{post.title}</h1>
      {/*
        content is admin-authored HTML from the paste-import workflow already
        built into AdminBlogPosts (see App.js) — not user-submitted, so this
        follows the same trust boundary the existing admin panel already
        relies on. If that ever changes (e.g. multiple admins, less trusted
        authors), sanitize with a library like `sanitize-html` before this
        renders.
      */}
      <div
        style={{ color: "#b0b8d0", lineHeight: 1.7, fontSize: 15 }}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <FaqAccordion faqs={post.faqs} />
    </article>
  );
}
