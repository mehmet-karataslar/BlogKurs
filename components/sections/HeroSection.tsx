import { site } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="inline-block font-mono text-base sm:text-lg md:text-xl text-[var(--color-primary)] mb-3 sm:mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          bahar@portfolio:~$
          <span className="animate-pulse">▋</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-3 sm:mb-4">
          {site.name}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          {site.tagline}
        </p>
      </div>
    </section>
  );
}
