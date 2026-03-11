import Link from "next/link";
import { getHomepageStats } from "@/lib/stats";
import { HomeStatsSection } from "@/components/sections/HomeStatsSection";

const defaultStats = {
  blogCount: 0,
  projectCount: 0,
  messageCount: 0,
  totalViews: 0,
  totalLikes: 0,
  blogViews: 0,
  blogLikes: 0,
  projectViews: 0,
  projectLikes: 0,
  recentPostTitles: [] as { title: string; slug: string; updated_at: string }[],
  recentProjectTitles: [] as { title: string; slug: string; updated_at: string }[],
};

export default async function AdminPage() {
  let stats = defaultStats;
  try {
    stats = await getHomepageStats();
  } catch {
    // Supabase not configured or error
  }

  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">
        Dashboard
      </h1>
      <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mb-8">
        Yönetim paneline hoş geldiniz. Blog ve projelerinizi buradan yönetebilir, anlık verileri görebilirsiniz.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-14">
        <Link
          href="/admin/blog"
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-200 hover:border-[var(--color-primary)]/50 hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            Blog yönetimi
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Yazıları listele, yeni yazı ekle veya düzenle.
          </p>
        </Link>
        <Link
          href="/admin/projeler"
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-200 hover:border-[var(--color-primary)]/50 hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            Proje yönetimi
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Projeleri listele, yeni proje ekle veya düzenle.
          </p>
        </Link>
      </div>

      <HomeStatsSection stats={stats} linkMode="admin" />
    </>
  );
}
