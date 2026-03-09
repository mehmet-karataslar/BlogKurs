import { Section } from "@/components/layout/Section";

export const metadata = {
  title: "Blog | Bahar Can",
  description: "Yazılım, teknoloji ve kişisel notlar.",
};

export default function BlogPage() {
  return (
    <Section>
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
        Blog
      </h1>
      <p className="text-[var(--color-text-secondary)]">
        Yazılar burada listelenecek. İçerik ekledikçe kartlar veya liste olarak
        gösterebilirsiniz.
      </p>
    </Section>
  );
}
