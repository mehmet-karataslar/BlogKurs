import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";
import { ProjectForm } from "@/components/features/projects/ProjectForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminProjelerDuzenlePage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, false);
  if (!project) notFound();

  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-6">
        Düzenle: {project.title}
      </h1>
      <ProjectForm mode="edit" initial={project} />
    </>
  );
}
