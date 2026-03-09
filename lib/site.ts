/**
 * Site sahibi ve navigasyon sabitleri — Bahar Can portföyü
 */
export const site = {
  name: "Bahar Can",
  title: "Yazılım Mühendisi",
  location: "İstanbul, Türkiye",
  email: "bahar.can@email.com", // Kendi e-posta adresinizle değiştirin
  tagline: "Yazılım Mühendisi. İstanbul'da yaşıyorum.",
} as const;

export const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/blog", label: "Blog" },
  { href: "/projeler", label: "Projeler" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/cv", label: "CV / Özgeçmiş" },
] as const;

export const footerLinks = [...navLinks] as const;
