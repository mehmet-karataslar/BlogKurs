import { getHomepageStats } from "@/lib/stats";
import { AdminCard } from "@/components/ui/AdminCard";
import { AdminStatCard } from "@/components/ui/AdminStatCard";
import { AdminSectionHeader } from "@/components/ui/AdminSectionHeader";
import { DashboardChart } from "@/components/features/admin/DashboardChart";
import { DashboardQuickActions } from "@/components/features/admin/DashboardQuickActions";
import { DashboardRecentActivity } from "@/components/features/admin/DashboardRecentActivity";

function BlogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h2a2 2 0 012-2h6a2 2 0 012 2h2a2 2 0 012 2v12a2 2 0 01-2 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h6" />
    </svg>
  );
}

function ProjectIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function ChartBarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

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
      <AdminSectionHeader
        title="Dashboard"
        description="Yönetim paneline hoş geldiniz. Blog ve projelerinizi buradan yönetebilir, anlık verileri görebilirsiniz."
      />

      {/* İstatistik kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-8 md:mb-10">
        <AdminStatCard
          label="Blog yazısı"
          value={stats.blogCount}
          subtext="Yayında"
          icon={<BlogIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
        <AdminStatCard
          label="Proje"
          value={stats.projectCount}
          subtext="Yayında"
          icon={<ProjectIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
        <AdminStatCard
          label="Mesaj"
          value={stats.messageCount}
          subtext="İletişim"
          icon={<MessageIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
        <AdminStatCard
          label="Toplam görüntülenme"
          value={stats.totalViews.toLocaleString("tr-TR")}
          subtext={`Blog: ${stats.blogViews} · Proje: ${stats.projectViews}`}
          icon={<EyeIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
        <AdminStatCard
          label="Toplam beğeni"
          value={stats.totalLikes.toLocaleString("tr-TR")}
          subtext={`Blog: ${stats.blogLikes} · Proje: ${stats.projectLikes}`}
          icon={<HeartIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
      </div>

      {/* Hızlı işlemler */}
      <section className="mb-8 md:mb-10">
        <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-text-primary)] mb-4">
          Hızlı işlemler
        </h2>
        <DashboardQuickActions />
      </section>

      {/* Grafik + Sistem özeti */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mb-10">
        <div className="lg:col-span-2">
          <AdminCard
            title="Görüntülenme ve beğeni"
            icon={<ChartBarIcon className="h-5 w-5" />}
          >
            <DashboardChart
              blogViews={stats.blogViews}
              blogLikes={stats.blogLikes}
              projectViews={stats.projectViews}
              projectLikes={stats.projectLikes}
            />
          </AdminCard>
        </div>
        <div className="space-y-4 sm:space-y-6">
          <AdminCard title="Sistem özeti">
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between gap-2">
                <span className="text-[var(--color-text-secondary)]">Yayında blog</span>
                <span className="font-medium text-[var(--color-text-primary)] tabular-nums">
                  {stats.blogCount}
                </span>
              </li>
              <li className="flex justify-between gap-2">
                <span className="text-[var(--color-text-secondary)]">Yayında proje</span>
                <span className="font-medium text-[var(--color-text-primary)] tabular-nums">
                  {stats.projectCount}
                </span>
              </li>
              <li className="flex justify-between gap-2 border-t border-[var(--color-border)] pt-3">
                <span className="text-[var(--color-text-secondary)]">Toplam etkileşim</span>
                <span className="font-medium text-[var(--color-primary)] tabular-nums">
                  {(stats.totalViews + stats.totalLikes).toLocaleString("tr-TR")}
                </span>
              </li>
            </ul>
          </AdminCard>
        </div>
      </div>

      {/* Son aktiviteler */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-text-primary)] mb-4">
          Son aktiviteler
        </h2>
        <DashboardRecentActivity
          recentPosts={stats.recentPostTitles}
          recentProjects={stats.recentProjectTitles}
          blogItemHref={(slug) => `/admin/blog/${slug}/duzenle`}
          projectItemHref={(slug) => `/admin/projeler/${slug}/duzenle`}
          blogListHref="/admin/blog"
          projectListHref="/admin/projeler"
        />
      </section>
    </>
  );
}
