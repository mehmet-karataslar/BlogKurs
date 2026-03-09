import { Section } from "@/components/layout/Section";
import { site } from "@/lib/site";

export const metadata = {
  title: "CV / Özgeçmiş | Bahar Can",
  description: "Bahar Can özgeçmiş.",
};

export default function CVPage() {
  return (
    <Section>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">
        CV / Özgeçmiş
      </h1>
      <div className="max-w-none">
        <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-text-primary)] mt-4 sm:mt-6 mb-2">
          {site.name}
        </h2>
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
          {site.title} · {site.location}
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mt-4 sm:mt-6 mb-2">
          Eğitim
        </h3>
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
          Buraya eğitim bilgilerinizi ekleyin (üniversite, bölüm, yıl).
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mt-4 sm:mt-6 mb-2">
          Deneyim
        </h3>
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
          İş deneyimlerinizi kronolojik olarak listeleyebilirsiniz.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mt-4 sm:mt-6 mb-2">
          Beceriler
        </h3>
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
          Teknik ve kişisel becerilerinizi burada özetleyin.
        </p>

        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-[var(--color-text-muted)]">
          İsterseniz PDF özgeçmiş linki veya indirme butonu da ekleyebilirsiniz.
        </p>
      </div>
    </Section>
  );
}
