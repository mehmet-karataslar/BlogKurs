import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/blog";
import { AdminPostActions } from "@/components/features/blog/AdminPostActions";
import { Badge } from "@/components/ui/Badge";

export default async function AdminBlogPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts();
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
          Blog listesi
        </h1>
        <Link
          href="/admin/blog/yeni"
          className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Yeni yazı
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[640px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
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
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[var(--color-text-muted)]">
                    Henüz yazı yok. &quot;Yeni yazı&quot; ile ekleyin.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
