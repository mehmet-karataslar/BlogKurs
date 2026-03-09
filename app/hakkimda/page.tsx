import { Section } from "@/components/layout/Section";
import { site } from "@/lib/site";

export const metadata = {
  title: "Hakkımda | Bahar Can",
  description: "Bahar Can hakkında.",
};

export default function HakkimdaPage() {
  return (
    <Section>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">
        Hakkımda
      </h1>
      <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mb-4">
        Merhaba, ben {site.name}. {site.title} olarak İstanbul&apos;da yaşıyorum.
      </p>
      <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
        Bu sayfaya kendi hikayenizi, deneyimlerinizi ve hedeflerinizi
        ekleyebilirsiniz. Eğitim, iş deneyimi ve becerilerinizi de
        listeleyebilirsiniz.
      </p>
    </Section>
  );
}
