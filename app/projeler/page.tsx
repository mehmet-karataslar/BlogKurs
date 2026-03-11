import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { getPublishedProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata = {
  title: `Projeler | ${site.name}`,
  description: "Yazılım projeleri ve çalışmalarım.",
};

export default async function ProjelerPage() {
  let projects: Awaited<ReturnType<typeof getPublishedProjects>> = [];
  try {
    projects = await getPublishedProjects();
  } catch {
    // Supabase not configured or error
  }

  return (
    <Section>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">
        Projeler
      </h1>
      <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mb-8">
        Projelerim ve çalışmalarım.
      </p>

      {projects.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">
          Henüz yayınlanmış proje yok.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              item={{
                title: project.title,
                description: project.excerpt,
                slug: project.slug,
                badge: "proje",
                imageUrl: project.cover_image_url ?? undefined,
                imageAlt: project.title,
              }}
              href={`/projeler/${project.slug}`}
            >
              <div className="mt-2 flex gap-3 text-xs text-[var(--color-text-muted)]">
                <span>{project.view_count} görüntülenme</span>
                <span>{project.like_count} beğeni</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
