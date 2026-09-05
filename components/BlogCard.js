import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="pcb-card" style={{ display: "block", textDecoration: "none", color: "inherit", overflow: "hidden" }}>
      {post.featured_image && (
        <div style={{ position: "relative", width: "100%", height: 180 }}>
          <Image src={post.featured_image} alt={post.title} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <div style={{ padding: 16 }}>
        <h3 style={{ color: "var(--text)", fontFamily: "var(--font-heading)", fontSize: 16, marginBottom: 8 }}>
          {post.title}
        </h3>
        {post.excerpt && (
          <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5 }}>{post.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
