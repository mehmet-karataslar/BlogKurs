import { type ReactNode } from "react";

interface AdminCardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AdminCard({ title, icon, children, className = "" }: AdminCardProps) {
  return (
    <div
      className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 md:p-6 transition-all duration-200 ${className}`}
    >
      {(title ?? icon) && (
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          {icon && (
            <span className="flex items-center justify-center text-[var(--color-primary)] shrink-0">
              {icon}
            </span>
          )}
          {title && (
            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">
              {title}
            </h3>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
