import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug } from "@/lib/blog";
import { BlogPostContent } from "@/components/features/blog/BlogPostContent";
import { ViewTracker } from "@/components/features/blog/ViewTracker";
import { LikeButton } from "@/components/features/blog/LikeButton";
import { site } from "@/lib/site";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, true);
  if (!post) {
    return { title: "Yazı bulunamadı" };
  }
  return {
    title: `${post.title} | Blog | ${site.name}`,
    description: post.excerpt,
  };
}

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, true);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <ViewTracker slug={slug} />

      {post.cover_image_url && (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 sm:mb-10 bg-[var(--color-surface-elevated)] shadow-lg">
          <Image
            src={post.cover_image_url}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
        </div>
      )}

      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[var(--color-text-primary)] leading-tight tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-text-muted)]">
          <time dateTime={post.updated_at}>
            {new Date(post.updated_at).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{post.reading_time_minutes} dk okuma</span>
          <span aria-hidden>·</span>
          <span>{post.view_count} görüntülenme</span>
          <span aria-hidden>·</span>
          <LikeButton slug={post.slug} initialCount={post.like_count} />
        </div>
      </header>

      <div className="blog-detail-body">
        <BlogPostContent html={post.content} />
      </div>
    </article>
  );
}
