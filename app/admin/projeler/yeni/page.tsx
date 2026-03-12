import { ProjectForm } from "@/components/features/projects/ProjectForm";
import { AdminSectionHeader } from "@/components/ui/AdminSectionHeader";
import { AdminCard } from "@/components/ui/AdminCard";

function ProjectIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

export default function AdminProjelerYeniPage() {
  return (
    <>
      <AdminSectionHeader
        title="Yeni proje"
        description="Yeni bir proje ekleyin."
        icon={<ProjectIcon className="h-6 w-6 sm:h-7 sm:w-7" />}
      />
      <AdminCard>
        <ProjectForm mode="create" />
      </AdminCard>
    </>
  );
}
