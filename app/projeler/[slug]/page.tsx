import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";
import { BlogPostContent } from "@/components/features/blog/BlogPostContent";
import { ViewTracker } from "@/components/features/blog/ViewTracker";
import { LikeButton } from "@/components/features/blog/LikeButton";
import { site } from "@/lib/site";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, true);
  if (!project) {
    return { title: "Proje bulunamadı" };
  }
  return {
    title: `${project.title} | Projeler | ${site.name}`,
    description: project.excerpt,
  };
}

export default async function ProjeSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, true);
  if (!project) notFound();

  return (
    <article className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <ViewTracker
        slug={slug}
        cookieName="project_view"
        basePath="/api/projeler"
      />

      {project.cover_image_url && (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 sm:mb-10 bg-[var(--color-surface-elevated)] shadow-lg">
          <Image
            src={project.cover_image_url}
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
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-text-muted)]">
          <time dateTime={project.updated_at}>
            {new Date(project.updated_at).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{project.view_count} görüntülenme</span>
          <span aria-hidden>·</span>
          <LikeButton
            slug={project.slug}
            initialCount={project.like_count}
            storageKey="project_liked"
            basePath="/api/projeler"
          />
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {project.live_demo_url && (
            <Link
              href={project.live_demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              Canlı demo
              <span aria-hidden>↗</span>
            </Link>
          )}
          {project.github_url && (
            <Link
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
            >
              GitHub
              <span aria-hidden>↗</span>
            </Link>
          )}
        </div>
      </header>

      <div className="blog-detail-body">
        <BlogPostContent html={project.content} />
      </div>

      {Array.isArray(project.related_links) &&
        project.related_links.length > 0 && (
          <div className="mt-10 pt-8 border-t border-[var(--color-border)]">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
              İlgili linkler
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.related_links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                  >
                    {link.label || link.url}
                    <span aria-hidden className="ml-1">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
    </article>
  );
}
