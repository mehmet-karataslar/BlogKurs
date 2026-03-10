import { HeroSection } from "@/components/sections/HeroSection";
import { CardGridSection } from "@/components/sections/CardGridSection";
import { CTASection } from "@/components/sections/CTASection";
import type { CardItem } from "@/components/ui/Card";
import { getPostsForHomepage } from "@/lib/blog";

// Örnek veri — kendi proje içeriğinizle değiştirin
const projeler: (CardItem & { href: string })[] = [
  {
    title: "Örnek Proje 1",
    description: "Kısa proje açıklaması. Teknolojiler ve özellikler burada yer alabilir.",
    href: "/projeler",
    badge: "proje",
  },
  {
    title: "Örnek Proje 2",
    description: "Bir başka proje özeti. Detaylar için Projeler sayfasına gidebilirsiniz.",
    href: "/projeler",
    badge: "proje",
  },
  {
    title: "Örnek Proje 3",
    description: "Üçüncü proje kartı. Görsel eklemek için imageUrl kullanabilirsiniz.",
    href: "/projeler",
    badge: "proje",
  },
];

export default async function Home() {
  let sonYazilar: (CardItem & { href: string })[] = [];
  try {
    const featuredPosts = await getPostsForHomepage(6);
    sonYazilar = featuredPosts.map((post) => ({
      title: post.title,
      description: post.excerpt,
      href: `/blog/${post.slug}`,
      badge: "blog" as const,
      imageUrl: post.cover_image_url ?? undefined,
      imageAlt: post.title,
    }));
  } catch {
    // Supabase not configured or error — show no featured posts
  }

  return (
    <>
      <HeroSection />
      <CardGridSection title="Projeler" items={projeler} filterTabs={["Tümü"]} />
      <CardGridSection title="Öne Çıkan Yazılar" items={sonYazilar} filterTabs={["Tümü"]} />
      <CTASection />
    </>
  );
}
