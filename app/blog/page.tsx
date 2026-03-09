import { Section } from "@/components/layout/Section";

export const metadata = {
  title: "Blog | Bahar Can",
  description: "Yazılım, teknoloji ve kişisel notlar.",
};

export default function BlogPage() {
  return (
    <Section>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">
        Blog
      </h1>
      <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
        Yazılar burada listelenecek. İçerik ekledikçe kartlar veya liste olarak
        gösterebilirsiniz.
      </p>
    </Section>
  );
}
