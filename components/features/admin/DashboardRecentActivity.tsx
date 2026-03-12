import Link from "next/link";
import { AdminCard } from "@/components/ui/AdminCard";

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

interface RecentItem {
  title: string;
  slug: string;
  updated_at: string;
}

interface DashboardRecentActivityProps {
  recentPosts: RecentItem[];
  recentProjects: RecentItem[];
  blogItemHref: (slug: string) => string;
  projectItemHref: (slug: string) => string;
  blogListHref: string;
  projectListHref: string;
}

export function DashboardRecentActivity({
  recentPosts,
  recentProjects,
  blogItemHref,
  projectItemHref,
  blogListHref,
  projectListHref,
}: DashboardRecentActivityProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <AdminCard
        title="Son blog yazıları"
        icon={<BlogIcon className="h-5 w-5" />}
      >
        {recentPosts.length === 0 ? (
          <p className="text-sm text-[var(--color-text-muted)]">Henüz yayınlanmış yazı yok.</p>
        ) : (
          <ul className="space-y-2">
            {recentPosts.map((item) => (
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
          Blog listesi →
        </Link>
      </AdminCard>

      <AdminCard
        title="Son projeler"
        icon={<ProjectIcon className="h-5 w-5" />}
      >
        {recentProjects.length === 0 ? (
          <p className="text-sm text-[var(--color-text-muted)]">Henüz yayınlanmış proje yok.</p>
        ) : (
          <ul className="space-y-2">
            {recentProjects.map((item) => (
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
          Proje listesi →
        </Link>
      </AdminCard>
    </div>
  );
}
