import { Card } from "@/components/ui/Card";
import type { CardItem } from "@/components/ui/Card";

interface CardGridSectionProps {
  title: string;
  items: (CardItem & { href: string })[];
  /** Filter tabs e.g. "Tümü" - optional */
  filterTabs?: string[];
}

export function CardGridSection({
  title,
  items,
  filterTabs,
}: CardGridSectionProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
            {title}
          </h2>
          {filterTabs && filterTabs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className="rounded-lg px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)] transition-colors duration-150"
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item) => (
            <Card
              key={item.href + item.title}
              item={item}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
