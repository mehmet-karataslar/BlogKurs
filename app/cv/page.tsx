import { getCv } from "@/lib/cv";
import { Section } from "@/components/layout/Section";
import { CvSiteSection } from "@/components/features/cv/CvSiteSection";
import { CvBuilderForm } from "@/components/features/cv/CvBuilderForm";
import { site } from "@/lib/site";

export const metadata = {
  title: `CV / Özgeçmiş | ${site.name}`,
  description: `${site.name} özgeçmişi. Kendi CV'nizi de oluşturup PDF indirebilirsiniz.`,
};

export default async function CVPage() {
  const cv = await getCv();

  return (
    <Section>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">
        CV / Özgeçmiş
      </h1>

      <section className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
          Site sahibinin CV’si
        </h2>
        <CvSiteSection cv={cv} />
      </section>

      <section className="border-t border-[var(--color-border)] pt-12 sm:pt-16">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
          Kendi CV’nizi oluşturun
        </h2>
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mb-6">
          Bilgilerinizi girip anında PDF CV oluşturabilirsiniz. Veriler
          saklanmaz.
        </p>
        <CvBuilderForm />
      </section>
    </Section>
  );
}
