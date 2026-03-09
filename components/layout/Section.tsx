import { type ReactNode } from "react";

/** Responsive container: max-w-7xl, px-4 sm:px-6 lg:px-8 */
const DEFAULT_WRAPPER = "max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Wrapper sınıfları; varsayılan responsive container */
  wrapperClassName?: string;
}

export function Section({
  children,
  className = "",
  wrapperClassName = DEFAULT_WRAPPER,
}: SectionProps) {
  return (
    <section className={`py-12 sm:py-16 md:py-20 lg:py-24 ${className}`}>
      <div className={wrapperClassName}>{children}</div>
    </section>
  );
}
