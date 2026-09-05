import { buildMetadata } from "../../lib/seo";
import { getPublishedPosts } from "../../lib/supabase";
import BlogCard from "../../components/BlogCard";
import { BUSINESS } from "../../lib/constants";

export const metadata = buildMetadata({
  title: `Blog — Repair Guides & Tips`,
  description: `Guides, tips and how-tos from ${BUSINESS.name} on appliance PCB repair.`,
  path: "/blog",
});

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <div>
      <h1 style={{ color: "#ffffff", fontSize: 28, marginBottom: 24 }}>Blog</h1>
      {posts.length === 0 ? (
        <p style={{ color: "#6b7db3" }}>No posts published yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
