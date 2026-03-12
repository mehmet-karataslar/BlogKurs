import { type ReactNode } from "react";

interface AdminSectionHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function AdminSectionHeader({
  title,
  description,
  icon,
  action,
  className = "",
}: AdminSectionHeaderProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8 ${className}`}
    >
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] flex items-center gap-2 flex-wrap">
          {icon && (
            <span className="text-[var(--color-primary)] shrink-0">{icon}</span>
          )}
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-1 max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
