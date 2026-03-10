/**
 * Generate URL-safe slug from title.
 * Turkish characters → Latin equivalents, spaces → hyphens, lowercase.
 */
const trMap: Record<string, string> = {
  ç: "c",
  ğ: "g",
  ı: "i",
  ö: "o",
  ş: "s",
  ü: "u",
  Ç: "c",
  Ğ: "g",
  İ: "i",
  Ö: "o",
  Ş: "s",
  Ü: "u",
};

export function slugify(title: string): string {
  if (!title.trim()) return "";
  let s = title.trim();
  for (const [tr, en] of Object.entries(trMap)) {
    s = s.replace(new RegExp(tr, "g"), en);
  }
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
