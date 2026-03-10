import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { BlogPostForm } from "@/components/features/blog/BlogPostForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminBlogDuzenlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, false);
  if (!post) notFound();

  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-6">
        Düzenle: {post.title}
      </h1>
      <BlogPostForm mode="edit" initial={post} />
    </>
  );
}
