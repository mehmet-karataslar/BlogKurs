import { HeroSection } from "@/components/sections/HeroSection";
import { CardGridSection } from "@/components/sections/CardGridSection";
import { CTASection } from "@/components/sections/CTASection";
import type { CardItem } from "@/components/ui/Card";

// Örnek veri — kendi proje ve blog içeriğinizle değiştirin
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

const sonYazilar: (CardItem & { href: string })[] = [
  {
    title: "İlk Blog Yazısı",
    description: "Blog yazılarınızın kısa özeti burada görünecek.",
    href: "/blog",
    badge: "blog",
  },
  {
    title: "İkinci Yazı",
    description: "Teknoloji, kariyer veya kişisel notlarınızı paylaşabilirsiniz.",
    href: "/blog",
    badge: "blog",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <CardGridSection title="Projeler" items={projeler} filterTabs={["Tümü"]} />
      <CardGridSection title="Son Yazılar" items={sonYazilar} filterTabs={["Tümü"]} />
      <CTASection />
    </>
  );
}
