import { type ReactNode } from "react";

type BadgeVariant = "proje" | "blog" | "hizmet" | "default";

const variantClasses: Record<BadgeVariant, string> = {
  proje: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  blog: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  hizmet: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  default: "bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] border-[var(--color-border)]",
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
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
