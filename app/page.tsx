import { HeroSection } from "@/components/sections/HeroSection";
import { CardGridSection } from "@/components/sections/CardGridSection";
import { CTASection } from "@/components/sections/CTASection";
import type { CardItem } from "@/components/ui/Card";
import { getPostsForHomepage } from "@/lib/blog";
import { getProjectsForHomepage } from "@/lib/projects";

export default async function Home() {
  let sonYazilar: (CardItem & { href: string })[] = [];
  let projeler: (CardItem & { href: string })[] = [];
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
  try {
    const featuredProjects = await getProjectsForHomepage(6);
    projeler = featuredProjects.map((project) => ({
      title: project.title,
      description: project.excerpt,
      href: `/projeler/${project.slug}`,
      badge: "proje" as const,
      imageUrl: project.cover_image_url ?? undefined,
      imageAlt: project.title,
    }));
  } catch {
    // Supabase not configured or error — show no featured projects
  }

  return (
    <>
      <HeroSection />
      <CardGridSection title="Öne Çıkan Projeler" items={projeler} filterTabs={["Tümü"]} />
      <CardGridSection title="Öne Çıkan Yazılar" items={sonYazilar} filterTabs={["Tümü"]} />
      <CTASection />
    </>
  );
}
