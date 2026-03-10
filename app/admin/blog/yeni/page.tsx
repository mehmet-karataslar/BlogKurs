import { BlogPostForm } from "@/components/features/blog/BlogPostForm";

export default function AdminBlogYeniPage() {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-6">
        Yeni yazı
      </h1>
      <BlogPostForm mode="create" />
    </>
  );
}
