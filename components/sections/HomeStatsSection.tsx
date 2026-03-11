import Link from "next/link";
import type { HomepageStats } from "@/lib/stats";

function StatCard({
  label,
  value,
  subtext,
  icon,
}: {
  label: string;
  value: number | string;
  subtext?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 transition-all duration-200 hover:border-[var(--color-primary)]/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs sm:text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">
            {label}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">
            {value}
          </p>
          {subtext != null && subtext !== "" && (
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{subtext}</p>
          )}
        </div>
        <div className="rounded-lg bg-[var(--color-surface-elevated)] p-2.5 text-[var(--color-primary)]">
          {icon}
        </div>
      </div>
    </div>
  );
}

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

interface HomeStatsSectionProps {
  stats: HomepageStats;
  /** "admin" = linkler düzenleme sayfalarına gider; "public" = site sayfalarına (varsayılan). */
  linkMode?: "public" | "admin";
}

export function HomeStatsSection({ stats, linkMode = "public" }: HomeStatsSectionProps) {
  const isAdmin = linkMode === "admin";
  const blogListHref = isAdmin ? "/admin/blog" : "/blog";
  const blogItemHref = (slug: string) =>
    isAdmin ? `/admin/blog/${slug}/duzenle` : `/blog/${slug}`;
  const projectListHref = isAdmin ? "/admin/projeler" : "/projeler";
  const projectItemHref = (slug: string) =>
    isAdmin ? `/admin/projeler/${slug}/duzenle` : `/projeler/${slug}`;

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-6 md:mb-8">
          Anlık özet
        </h2>
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mb-8 max-w-2xl">
          Blog, proje ve etkileşim verileri canlı olarak güncellenir.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-10 md:mb-14">
          <StatCard
            label="Blog yazısı"
            value={stats.blogCount}
            subtext="Yayında"
            icon={<BlogIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
          />
          <StatCard
            label="Proje"
            value={stats.projectCount}
            subtext="Yayında"
            icon={<ProjectIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
          />
          <StatCard
            label="Mesaj"
            value={stats.messageCount}
            subtext="İletişim"
            icon={<MessageIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
          />
          <StatCard
            label="Toplam görüntülenme"
            value={stats.totalViews.toLocaleString("tr-TR")}
            subtext={`Blog: ${stats.blogViews} · Proje: ${stats.projectViews}`}
            icon={<EyeIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
          />
          <StatCard
            label="Toplam beğeni"
            value={stats.totalLikes.toLocaleString("tr-TR")}
            subtext={`Blog: ${stats.blogLikes} · Proje: ${stats.projectLikes}`}
            icon={<HeartIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
              <BlogIcon className="h-5 w-5 text-[var(--color-primary)]" />
              Son blog yazıları
            </h3>
            {stats.recentPostTitles.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)]">Henüz yayınlanmış yazı yok.</p>
            ) : (
              <ul className="space-y-2">
                {stats.recentPostTitles.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={blogItemHref(item.slug)}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)] transition-colors group"
                    >
                      <span className="line-clamp-1 group-hover:underline">{item.title}</span>
                      <time
                        dateTime={item.updated_at}
                        className="text-xs text-[var(--color-text-muted)] shrink-0"
                      >
                        {new Date(item.updated_at).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={blogListHref}
              className="mt-3 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              {isAdmin ? "Blog listesi →" : "Tüm yazılar →"}
            </Link>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
              <ProjectIcon className="h-5 w-5 text-[var(--color-primary)]" />
              Son projeler
            </h3>
            {stats.recentProjectTitles.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)]">Henüz yayınlanmış proje yok.</p>
            ) : (
              <ul className="space-y-2">
                {stats.recentProjectTitles.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={projectItemHref(item.slug)}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)] transition-colors group"
                    >
                      <span className="line-clamp-1 group-hover:underline">{item.title}</span>
                      <time
                        dateTime={item.updated_at}
                        className="text-xs text-[var(--color-text-muted)] shrink-0"
                      >
                        {new Date(item.updated_at).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={projectListHref}
              className="mt-3 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              {isAdmin ? "Proje listesi →" : "Tüm projeler →"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
