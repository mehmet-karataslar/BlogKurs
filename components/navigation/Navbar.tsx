"use client";

import Link from "next/link";
import { useState } from "react";
import { site, navLinks } from "@/lib/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-surface)]/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            {site.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Ana menü">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
            <ThemeToggle />
            <Link
              href="/iletisim"
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)] transition-colors duration-150"
            >
              İletişime Geç
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden rounded-lg p-2 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menü aç"}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav
            className="md:hidden border-t border-[var(--color-border)] py-4"
            aria-label="Mobil menü"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="flex justify-center pt-2">
                <ThemeToggle />
              </li>
              <li>
                <Link
                  href="/iletisim"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg bg-[var(--color-primary)] px-3 py-2 text-center font-medium text-white hover:bg-[var(--color-primary-hover)]"
                >
                  İletişime Geç
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
