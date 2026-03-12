import { Section } from "@/components/layout/Section";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/features/contact/ContactForm";

export const metadata = {
  title: "İletişim | Bahar Can",
  description: "Bahar Can ile iletişime geçin.",
};

export default function IletisimPage() {
  return (
    <Section>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">
        İletişim
      </h1>
      <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mb-6 sm:mb-8">
        Projeler, iş birlikleri veya sorularınız için formu doldurun.
      </p>
      <ul className="space-y-3 text-sm sm:text-base text-[var(--color-text-secondary)]">
        <li>
          <strong className="text-[var(--color-text-primary)]">E-posta:</strong>{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-[var(--color-primary)] hover:underline"
          >
            {site.email}
          </a>
        </li>
        <li>
          <strong className="text-[var(--color-text-primary)]">Konum:</strong>{" "}
          {site.location}
        </li>
      </ul>
      <ContactForm />
    </Section>
  );
}
