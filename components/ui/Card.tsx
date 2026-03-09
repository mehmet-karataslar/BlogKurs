import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { Badge } from "./Badge";

type BadgeType = "proje" | "blog" | "hizmet";

export interface CardItem {
  title: string;
  description: string;
  slug?: string;
  badge?: BadgeType;
  imageUrl?: string;
  imageAlt?: string;
}

interface CardProps {
  item: CardItem;
  href: string;
  children?: ReactNode;
}

export function Card({ item, href, children }: CardProps) {
  const { title, description, badge } = item;

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 hover:border-[var(--color-primary)]/50"
    >
      {item.imageUrl ? (
        <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-surface-elevated)]">
          <Image
            src={item.imageUrl}
            alt={item.imageAlt ?? title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-[var(--color-surface-elevated)]" aria-hidden />
      )}
      <div className="p-3 sm:p-4 md:p-5">
        {badge && (
          <Badge variant={badge} className="mb-2">
            {badge === "proje" ? "Proje" : badge === "blog" ? "Blog" : "Hizmet"}
          </Badge>
        )}
        <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] line-clamp-2">
          {description}
        </p>
        {children}
      </div>
    </Link>
  );
}
