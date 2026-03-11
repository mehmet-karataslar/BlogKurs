import { ProjectForm } from "@/components/features/projects/ProjectForm";

export default function AdminProjelerYeniPage() {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-6">
        Yeni proje
      </h1>
      <ProjectForm mode="create" />
    </>
  );
}
