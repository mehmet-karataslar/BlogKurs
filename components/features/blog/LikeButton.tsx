"use client";

import { useState, useCallback, useEffect } from "react";

interface LikeButtonProps {
  slug: string;
  initialCount: number;
  /** localStorage key for deduplication. Default: blog. Use "project_liked" for projects. */
  storageKey?: string;
  /** API base path (e.g. "/api/blog" or "/api/projeler"). Request: POST {basePath}/{slug}/like */
  basePath?: string;
}

function getLikedSlugs(storageKey: string): string[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function addLikedSlug(slug: string, storageKey: string) {
  const slugs = getLikedSlugs(storageKey);
  if (slugs.includes(slug)) return;
  slugs.push(slug);
  localStorage.setItem(storageKey, JSON.stringify(slugs));
}

export function LikeButton({
  slug,
  initialCount,
  storageKey = "blog_liked",
  basePath = "/api/blog",
}: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(getLikedSlugs(storageKey).includes(slug));
  }, [slug, storageKey]);

  const handleClick = useCallback(() => {
    if (liked) return;
    fetch(`${basePath}/${encodeURIComponent(slug)}/like`, { method: "POST" })
      .then((res) => {
        if (res.ok) {
          setCount((c) => c + 1);
          setLiked(true);
          addLikedSlug(slug, storageKey);
        }
      })
      .catch(() => {});
  }, [slug, liked, storageKey, basePath]);

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
