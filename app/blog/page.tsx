import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { getPublishedPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata = {
  title: `Blog | ${site.name}`,
  description: "Yazılım, teknoloji ve kişisel notlar.",
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    // Supabase not configured or error
  }

  return (
    <Section>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">
        Blog
      </h1>
      <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mb-8">
        Yazılar burada listeleniyor.
      </p>

      {posts.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">Henüz yayınlanmış yazı yok.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              item={{
                title: post.title,
                description: post.excerpt,
                slug: post.slug,
                badge: "blog",
                imageUrl: post.cover_image_url ?? undefined,
                imageAlt: post.title,
              }}
              href={`/blog/${post.slug}`}
            >
              <div className="mt-2 flex gap-3 text-xs text-[var(--color-text-muted)]">
                <span>{post.view_count} görüntülenme</span>
                <span>{post.like_count} beğeni</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
