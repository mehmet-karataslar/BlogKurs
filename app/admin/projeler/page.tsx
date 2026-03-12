import Image from "next/image";
import { getProjects } from "@/lib/projects";
import { AdminProjectActions } from "@/components/features/projects/AdminProjectActions";
import { AdminSectionHeader } from "@/components/ui/AdminSectionHeader";
import { AdminDataTable } from "@/components/ui/AdminDataTable";
import { AdminEmptyState } from "@/components/ui/AdminEmptyState";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

function ProjectIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

export default async function AdminProjelerPage() {
  let projects: Awaited<ReturnType<typeof getProjects>> = [];
  try {
    projects = await getProjects();
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <AdminSectionHeader
        title="Proje listesi"
        description="Projeleri listele, yeni proje ekleyin veya mevcut projeleri düzenleyin."
        icon={<ProjectIcon className="h-6 w-6 sm:h-7 sm:w-7" />}
        action={
          <Button as="link" href="/admin/projeler/yeni" variant="primary" size="md">
            Yeni proje
          </Button>
        }
      />

      {projects.length === 0 ? (
        <AdminEmptyState
          message='Henüz proje yok. "Yeni proje" ile ekleyin.'
          action={
            <Button as="link" href="/admin/projeler/yeni" variant="primary" size="md">
              Yeni proje
            </Button>
          }
          icon={<FolderIcon className="h-12 w-12" />}
        />
      ) : (
        <AdminDataTable>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
                <th className="p-3 font-medium text-[var(--color-text-primary)] w-20">
                  Kapak
                </th>
                <th className="p-3 font-medium text-[var(--color-text-primary)]">
                  Başlık / Slug
                </th>
                <th className="p-3 font-medium text-[var(--color-text-primary)]">
                  Durum
                </th>
                <th className="p-3 font-medium text-[var(--color-text-primary)]">
                  Ana sayfa
                </th>
                <th className="p-3 font-medium text-[var(--color-text-primary)]">
                  Görüntülenme / Beğeni
                </th>
                <th className="p-3 font-medium text-[var(--color-text-primary)]">
                  Tarih
                </th>
                <th className="p-3 font-medium text-[var(--color-text-primary)]">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-[var(--color-border)] last:border-0"
                >
                  <td className="p-3">
                    <div className="relative h-12 w-20 rounded overflow-hidden bg-[var(--color-surface-elevated)]">
                      {project.cover_image_url ? (
                        <Image
                          src={project.cover_image_url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[var(--color-text-muted)] text-xs">
                          —
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-[var(--color-text-primary)]">
                      {project.title}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      /{project.slug}
                    </div>
                  </td>
                  <td className="p-3">
                    {project.published ? (
                      <Badge variant="proje">Yayında</Badge>
                    ) : (
                      <Badge variant="default">Taslak</Badge>
                    )}
                  </td>
                  <td className="p-3 text-[var(--color-text-secondary)]">
                    {project.featured_on_homepage ? "Evet" : "Hayır"}
                    {project.featured_on_homepage && (
                      <span className="text-xs text-[var(--color-text-muted)] ml-1">
                        (sıra: {project.homepage_order})
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-[var(--color-text-secondary)]">
                    {project.view_count} / {project.like_count}
                  </td>
                  <td className="p-3 text-[var(--color-text-muted)] text-xs">
                    {new Date(project.updated_at).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="p-3">
                    <AdminProjectActions project={project} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminDataTable>
      )}
    </>
  );
}
