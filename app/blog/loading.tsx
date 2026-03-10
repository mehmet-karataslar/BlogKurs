import { Section } from "@/components/layout/Section";

export default function BlogLoading() {
  return (
    <Section>
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-48 bg-[var(--color-surface-elevated)] rounded" />
        <div className="h-4 w-full max-w-md bg-[var(--color-surface-elevated)] rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-[var(--color-border)] overflow-hidden">
              <div className="aspect-video bg-[var(--color-surface-elevated)]" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-[var(--color-surface-elevated)] rounded" />
                <div className="h-4 w-full bg-[var(--color-surface-elevated)] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
