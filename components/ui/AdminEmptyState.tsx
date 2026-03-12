import { type ReactNode } from "react";

interface AdminEmptyStateProps {
  message: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function AdminEmptyState({
  message,
  action,
  icon,
  className = "",
}: AdminEmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-12 px-6 text-center ${className}`}
    >
      {icon && (
        <span className="text-[var(--color-text-muted)] mb-3 [&>svg]:h-12 [&>svg]:w-12">
          {icon}
        </span>
      )}
      <p className="text-sm sm:text-base text-[var(--color-text-muted)] mb-4 max-w-sm">
        {message}
      </p>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
