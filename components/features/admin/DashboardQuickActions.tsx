import Link from "next/link";

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

function AboutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

const actions = [
  {
    href: "/admin/blog",
    title: "Blog yönetimi",
    description: "Yazıları listele, yeni yazı ekle veya düzenle.",
    icon: BlogIcon,
  },
  {
    href: "/admin/projeler",
    title: "Proje yönetimi",
    description: "Projeleri listele, yeni proje ekle veya düzenle.",
    icon: ProjectIcon,
  },
  {
    href: "/admin/hakkimda",
    title: "Hakkımda düzenle",
    description: "Profil bilgileri, fotoğraf ve hakkımda metnini güncelle.",
    icon: AboutIcon,
  },
];

export function DashboardQuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {actions.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 md:p-6 transition-all duration-200 hover:border-[var(--color-primary)]/50 hover:shadow-lg group"
          >
            <div className="flex items-start gap-3">
              <span className="rounded-lg bg-[var(--color-surface-elevated)] p-2.5 text-[var(--color-primary)] shrink-0 group-hover:bg-[var(--color-primary)]/10 transition-colors">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                  {item.title}
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
