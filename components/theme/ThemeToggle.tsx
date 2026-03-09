"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import type { ThemeId } from "@/lib/theme";
import { THEME_OPTIONS } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-1 rounded-lg p-1 bg-[var(--color-surface-elevated)] border border-[var(--color-border)]"
      role="group"
      aria-label="Tema seçimi"
    >
      {THEME_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setTheme(opt.id as ThemeId)}
          aria-pressed={theme === opt.id}
          className={`
            min-w-[2.25rem] sm:min-w-[2.5rem] px-2 py-1.5 rounded-md text-xs sm:text-sm font-medium
            transition-colors duration-150
            hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]
            ${theme === opt.id ? "bg-[var(--color-surface)] text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"}
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
