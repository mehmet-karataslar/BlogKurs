import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** max-w-7xl mx-auto px-4 md:px-6 lg:px-8 */
  wrapperClassName?: string;
}

export function Section({
  children,
  className = "",
  wrapperClassName = "max-w-7xl mx-auto px-4 md:px-6 lg:px-8",
}: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className={wrapperClassName}>{children}</div>
    </section>
  );
}
