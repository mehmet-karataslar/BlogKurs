"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
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

function AboutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function ChevronIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`${className} transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

type NavSingle = {
  type: "single";
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  muted?: boolean;
};

type NavGroup = {
  type: "group";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: { href: string; label: string }[];
};

const navConfig: (NavSingle | NavGroup)[] = [
  { type: "single", href: "/admin", label: "Dashboard", icon: DashboardIcon },
  {
    type: "group",
    label: "Blog",
    icon: BlogIcon,
    children: [
      { href: "/admin/blog", label: "Blog Listesi" },
      { href: "/admin/blog/yeni", label: "Blog Ekle" },
    ],
  },
  {
    type: "group",
    label: "Projeler",
    icon: ProjectIcon,
    children: [
      { href: "/admin/projeler", label: "Proje Listesi" },
      { href: "/admin/projeler/yeni", label: "Proje Ekle" },
    ],
  },
  { type: "single", href: "/admin/mesajlar", label: "Mesajlar", icon: MessageIcon },
  { type: "single", href: "/admin/hakkimda", label: "Hakkımda", icon: AboutIcon },
  { type: "single", href: "/", label: "Siteye dön", icon: HomeIcon, muted: true },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const isGroupOpen = (label: string) => {
    if (openGroups[label] !== undefined) return openGroups[label];
    const group = navConfig.find((n) => n.type === "group" && n.label === label) as NavGroup | undefined;
    if (!group) return false;
    const isInGroup = group.children.some(
      (c) => pathname === c.href || (c.href !== "/admin" && pathname.startsWith(c.href))
    );
    return isInGroup;
  };

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !isGroupOpen(label) }));
  };

  return (
    <aside
      className={`sticky top-0 self-start flex flex-col h-screen border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-[width] duration-200 ease-out shrink-0 ${
        collapsed ? "w-[4.5rem]" : "w-56"
      }`}
      aria-label="Admin menü"
    >
      <div
        className={`flex h-16 items-center border-b border-[var(--color-border)] ${
          collapsed ? "justify-center px-2" : "justify-between px-3"
        }`}
      >
        {!collapsed && (
          <Link
            href="/admin"
            className="text-lg font-semibold text-[var(--color-primary)] truncate"
          >
            Admin
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)] transition-colors shrink-0"
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Menüyü aç" : "Menüyü kapat"}
        >
          <ChevronIcon open={!collapsed} className="h-5 w-5" />
        </button>
      </div>
      <nav
        className="flex-1 overflow-y-auto p-3 space-y-1"
        aria-label="Admin navigasyon"
      >
        {navConfig.map((item) => {
          if (item.type === "single") {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  collapsed ? "justify-center" : ""
                } ${
                  item.muted
                    ? "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-secondary)]"
                    : isActive
                      ? "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          }

          const group = item as NavGroup;
          const open = isGroupOpen(group.label);
          const Icon = group.icon;

          if (collapsed) {
            const activeChild = group.children.find(
              (c) => pathname === c.href || pathname.startsWith(c.href + "/")
            );
            return (
              <div key={group.label} className="relative group/collapsed">
                <div
                  className={`flex items-center justify-center rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    activeChild
                      ? "bg-[var(--color-surface-elevated)] text-[var(--color-primary)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
                  }`}
                  title={group.label}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                </div>
                <div className="absolute left-full top-0 ml-1 hidden group-hover/collapsed:block z-50 min-w-[10rem] py-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg">
                  {group.children.map((child) => {
                    const isActive = pathname === child.href || pathname.startsWith(child.href + "/");
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-3 py-2 text-sm rounded-md mx-1 ${
                          isActive
                            ? "bg-[var(--color-surface-elevated)] text-[var(--color-primary)]"
                            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          return (
            <div key={group.label}>
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-left ${
                  open
                    ? "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]"
                }`}
                aria-expanded={open}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1 truncate">{group.label}</span>
                <ChevronIcon open={open} className="h-4 w-4 shrink-0" />
              </button>
              {open && (
                <div className="mt-0.5 ml-4 pl-3 border-l border-[var(--color-border)] space-y-0.5">
                  {group.children.map((child) => {
                    const isActive =
                      pathname === child.href ||
                      (child.href !== "/admin" && pathname.startsWith(child.href));
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium"
                            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]"
                        }`}
                      >
                        <span className="truncate">{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
