import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPostBySlug } from "@/lib/wordpress";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem" }}>
      <Link href="/" style={{ color: "#666", fontSize: "0.875rem" }}>
        ← Voltar para o blog
      </Link>
      <h1 style={{ fontSize: "2rem", margin: "1rem 0 0.25rem" }}>{post.title}</h1>
      <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "2rem" }}>{post.date}</p>
      <div
        style={{ lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
