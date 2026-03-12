/**
 * Site sahibi ve navigasyon sabitleri — Bahar Can portföyü
 */
export const site = {
  name: "Bahar Can",
  title: "Yazılım Mühendisi",
  location: "İstanbul, Türkiye",
  email: "bahar.can@email.com", // Kendi e-posta adresinizle değiştirin
  tagline: "Yazılım Mühendisi. İstanbul'da yaşıyorum.",
  /** Sosyal medya linkleri — boş string görünmez. */
  social: {
    github: "",
    linkedin: "",
    instagram: "",
    twitter: "",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/blog", label: "Blog" },
  { href: "/projeler", label: "Projeler" },
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/cv", label: "CV / Özgeçmiş" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const footerLinks = [...navLinks] as const;
