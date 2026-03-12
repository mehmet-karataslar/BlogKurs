import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { BlogPostForm } from "@/components/features/blog/BlogPostForm";
import { AdminSectionHeader } from "@/components/ui/AdminSectionHeader";
import { AdminCard } from "@/components/ui/AdminCard";

function BlogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h2a2 2 0 012-2h6a2 2 0 012 2h2a2 2 0 012 2v12a2 2 0 01-2 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h6" />
    </svg>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminBlogDuzenlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, false);
  if (!post) notFound();

  return (
    <>
      <AdminSectionHeader
        title={`Düzenle: ${post.title}`}
        description="Blog yazısını güncelleyin."
        icon={<BlogIcon className="h-6 w-6 sm:h-7 sm:w-7" />}
      />
      <AdminCard>
        <BlogPostForm mode="edit" initial={post} />
      </AdminCard>
    </>
  );
}
