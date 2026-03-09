import { Section } from "@/components/layout/Section";

export const metadata = {
  title: "Projeler | Bahar Can",
  description: "Yazılım projeleri ve çalışmalarım.",
};

export default function ProjelerPage() {
  return (
    <Section>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">
        Projeler
      </h1>
      <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
        Projelerinizi burada detaylı şekilde paylaşabilirsiniz. Kart, liste veya
        filtre ekleyebilirsiniz.
      </p>
    </Section>
  );
}
