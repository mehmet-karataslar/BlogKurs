import { type ReactNode } from "react";

interface AdminDataTableProps {
  children: ReactNode;
  className?: string;
}

export function AdminDataTable({ children, className = "" }: AdminDataTableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <div className="min-w-[640px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
        {children}
      </div>
    </div>
  );
}
