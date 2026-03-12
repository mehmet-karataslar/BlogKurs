import { type ReactNode } from "react";

interface AdminStatCardProps {
  label: string;
  value: number | string;
  subtext?: string;
  trend?: string;
  trendPositive?: boolean;
  icon: ReactNode;
  className?: string;
}

export function AdminStatCard({
  label,
  value,
  subtext,
  trend,
  trendPositive = true,
  icon,
  className = "",
}: AdminStatCardProps) {
  return (
    <div
      className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 transition-all duration-200 hover:border-[var(--color-primary)]/30 hover:shadow-md ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5 truncate">
            {label}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums truncate">
            {typeof value === "number" ? value.toLocaleString("tr-TR") : value}
          </p>
          {subtext != null && subtext !== "" && (
            <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-1">
              {subtext}
            </p>
          )}
          {trend != null && trend !== "" && (
            <p
              className={`text-xs font-medium mt-1 ${
                trendPositive
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-text-muted)]"
              }`}
            >
              {trend}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-[var(--color-surface-elevated)] p-2.5 text-[var(--color-primary)] shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
}
