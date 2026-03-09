import { type ReactNode } from "react";

type BadgeVariant = "proje" | "blog" | "hizmet" | "default";

const variantClasses: Record<BadgeVariant, string> = {
  proje:
    "bg-[var(--color-badge-proje-bg)] text-[var(--color-badge-proje-text)] border-[var(--color-badge-proje-border)]",
  blog:
    "bg-[var(--color-badge-blog-bg)] text-[var(--color-badge-blog-text)] border-[var(--color-badge-blog-border)]",
  hizmet:
    "bg-[var(--color-badge-hizmet-bg)] text-[var(--color-badge-hizmet-text)] border-[var(--color-badge-hizmet-border)]",
  default:
    "bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] border-[var(--color-border)]",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors duration-150 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
