"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ThemeId } from "@/lib/theme";
import { applyTheme, getStoredTheme, setStoredTheme } from "@/lib/theme";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DEFAULT_THEME: ThemeId = "dark";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    const stored = getStoredTheme();
    const next = stored ?? DEFAULT_THEME;
    applyTheme(next);
    queueMicrotask(() => setThemeState(next));
  }, []);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
    setStoredTheme(next);
    applyTheme(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
