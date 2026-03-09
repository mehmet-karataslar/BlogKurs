/**
 * Tema anahtarları — data-theme attribute ile eşleşir
 */
export const THEME_STORAGE_KEY = "blogkurs-theme";

export type ThemeId = "light" | "dark" | "sepia";

export const THEME_OPTIONS: { id: ThemeId; label: string }[] = [
  { id: "dark", label: "Koyu" },
  { id: "light", label: "Açık" },
  { id: "sepia", label: "Sepia" },
];

export function getStoredTheme(): ThemeId | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "sepia") return stored;
  return null;
}

export function setStoredTheme(theme: ThemeId): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function applyTheme(theme: ThemeId): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}
