"use client";

import { useEffect, useRef } from "react";

interface ViewTrackerProps {
  slug: string;
}

const COOKIE_NAME = "blog_view";
const COOKIE_DAYS = 1;

function getViewedSlugs(): string[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return [];
  try {
    return JSON.parse(decodeURIComponent(match[1])) as string[];
  } catch {
    return [];
  }
}

function addViewedSlug(slug: string) {
  const slugs = getViewedSlugs();
  if (slugs.includes(slug)) return;
  slugs.push(slug);
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DAYS);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(slugs))}; path=/; expires=${expires.toUTCString()}`;
}

export function ViewTracker({ slug }: ViewTrackerProps) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    const viewed = getViewedSlugs();
    if (viewed.includes(slug)) return;
    sent.current = true;
    fetch(`/api/blog/${encodeURIComponent(slug)}/view`, { method: "POST" })
      .then(() => addViewedSlug(slug))
      .catch(() => {});
  }, [slug]);
  return null;
}
