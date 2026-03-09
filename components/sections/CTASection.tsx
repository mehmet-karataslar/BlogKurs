import Link from "next/link";
import { site } from "@/lib/site";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Bir fikriniz mi var? Birlikte hayata geçirelim.
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Yeni projeler, iş birlikleri veya sadece teknoloji üzerine sohbet
              etmek için her zaman buradayım.
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Yeni projeler için müsaitim
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 py-3 font-medium text-white hover:bg-[var(--color-primary-hover)] transition-colors duration-150"
            >
              İletişime Geç
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors duration-150"
            >
              E-posta Gönder
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
