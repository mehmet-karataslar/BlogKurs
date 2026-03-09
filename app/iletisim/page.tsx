import { Section } from "@/components/layout/Section";
import { site } from "@/lib/site";

export const metadata = {
  title: "İletişim | Bahar Can",
  description: "Bahar Can ile iletişime geçin.",
};

export default function IletisimPage() {
  return (
    <Section>
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
        İletişim
      </h1>
      <p className="text-[var(--color-text-secondary)] mb-8">
        Projeler, iş birlikleri veya merak ettikleriniz için benimle iletişime
        geçebilirsiniz.
      </p>
      <ul className="space-y-3 text-[var(--color-text-secondary)]">
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
      <p className="mt-8 text-sm text-[var(--color-text-muted)]">
        İsterseniz aşağıya bir iletişim formu da ekleyebilirsiniz (API veya
        form servisi ile).
      </p>
    </Section>
  );
}
