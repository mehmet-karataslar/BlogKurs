import Image from "next/image";
import { getPosts } from "@/lib/blog";
import { AdminPostActions } from "@/components/features/blog/AdminPostActions";
import { AdminSectionHeader } from "@/components/ui/AdminSectionHeader";
import { AdminDataTable } from "@/components/ui/AdminDataTable";
import { AdminEmptyState } from "@/components/ui/AdminEmptyState";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

function BlogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h2a2 2 0 012-2h6a2 2 0 012 2h2a2 2 0 012 2v12a2 2 0 01-2 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h6" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

export default async function AdminBlogPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts();
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <AdminSectionHeader
        title="Blog listesi"
        description="Yazıları listele, yeni yazı ekleyin veya mevcut yazıları düzenleyin."
        icon={<BlogIcon className="h-6 w-6 sm:h-7 sm:w-7" />}
        action={
          <Button as="link" href="/admin/blog/yeni" variant="primary" size="md">
            Yeni yazı
          </Button>
        }
      />

      {posts.length === 0 ? (
        <AdminEmptyState
          message='Henüz yazı yok. "Yeni yazı" ile ekleyin.'
          action={
            <Button as="link" href="/admin/blog/yeni" variant="primary" size="md">
              Yeni yazı
            </Button>
          }
          icon={<DocumentIcon className="h-12 w-12" />}
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
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-[var(--color-border)] last:border-0"
                >
                  <td className="p-3">
                    <div className="relative h-12 w-20 rounded overflow-hidden bg-[var(--color-surface-elevated)]">
                      {post.cover_image_url ? (
                        <Image
                          src={post.cover_image_url}
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
                      {post.title}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      /{post.slug}
                    </div>
                  </td>
                  <td className="p-3">
                    {post.published ? (
                      <Badge variant="proje">Yayında</Badge>
                    ) : (
                      <Badge variant="default">Taslak</Badge>
                    )}
                  </td>
                  <td className="p-3 text-[var(--color-text-secondary)]">
                    {post.featured_on_homepage ? "Evet" : "Hayır"}
                    {post.featured_on_homepage && (
                      <span className="text-xs text-[var(--color-text-muted)] ml-1">
                        (sıra: {post.homepage_order})
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-[var(--color-text-secondary)]">
                    {post.view_count} / {post.like_count}
                  </td>
                  <td className="p-3 text-[var(--color-text-muted)] text-xs">
                    {new Date(post.updated_at).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="p-3">
                    <AdminPostActions post={post} />
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
