import Link from "next/link";
import { site, footerLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
              Hızlı Linkler
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
              İletişim
            </h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {site.email}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 pt-8 border-t border-[var(--color-border)] text-sm text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
