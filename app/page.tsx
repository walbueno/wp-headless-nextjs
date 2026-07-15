import Link from "next/link";
import { fetchPosts } from "@/lib/wordpress";

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Blog</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Front-end desacoplado consumindo WordPress via REST API nativa.
      </p>

      {posts.length === 0 && <p>Nenhum post encontrado.</p>}

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "1.5rem" }}>
        {posts.map((post) => (
          <li key={post.id} style={{ borderBottom: "1px solid #eee", paddingBottom: "1.5rem" }}>
            <Link href={`/posts/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h2 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{post.title}</h2>
            </Link>
            <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{post.date}</p>
            <p style={{ color: "#444" }}>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
