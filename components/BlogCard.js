import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{
        display: "block",
        background: "#1a1f2e",
        border: "1px solid #2a3050",
        borderRadius: 12,
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {post.featured_image && (
        <div style={{ position: "relative", width: "100%", height: 180 }}>
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div style={{ padding: 16 }}>
        <h3 style={{ color: "#ffffff", fontSize: 16, marginBottom: 8 }}>{post.title}</h3>
        {post.excerpt && (
          <p style={{ color: "#b0b8d0", fontSize: 13, lineHeight: 1.5 }}>{post.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
