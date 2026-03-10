"use client";

import { useState, useCallback, useEffect } from "react";

interface LikeButtonProps {
  slug: string;
  initialCount: number;
}

const STORAGE_KEY = "blog_liked";

function getLikedSlugs(): string[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function addLikedSlug(slug: string) {
  const slugs = getLikedSlugs();
  if (slugs.includes(slug)) return;
  slugs.push(slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
}

export function LikeButton({ slug, initialCount }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(getLikedSlugs().includes(slug));
  }, [slug]);

  const handleClick = useCallback(() => {
    if (liked) return;
    fetch(`/api/blog/${encodeURIComponent(slug)}/like`, { method: "POST" })
      .then((res) => {
        if (res.ok) {
          setCount((c) => c + 1);
          setLiked(true);
          addLikedSlug(slug);
        }
      })
      .catch(() => {});
  }, [slug, liked]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={liked}
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      aria-label={liked ? "Zaten beğendiniz" : "Beğen"}
    >
      <span aria-hidden>{liked ? "♥" : "♡"}</span>
      <span>{count}</span>
    </button>
  );
}
