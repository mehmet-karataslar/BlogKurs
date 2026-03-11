"use client";

import { useEffect, useRef } from "react";

interface ViewTrackerProps {
  slug: string;
  /** Cookie name for deduplication. Default: blog. Use "project_view" for projects. */
  cookieName?: string;
  /** API base path (e.g. "/api/blog" or "/api/projeler"). Request: POST {basePath}/{slug}/view */
  basePath?: string;
}

const COOKIE_DAYS = 1;

function getViewedSlugs(cookieName: string): string[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(new RegExp(`${cookieName}=([^;]+)`));
  if (!match) return [];
  try {
    return JSON.parse(decodeURIComponent(match[1])) as string[];
  } catch {
    return [];
  }
}

function addViewedSlug(slug: string, cookieName: string) {
  const slugs = getViewedSlugs(cookieName);
  if (slugs.includes(slug)) return;
  slugs.push(slug);
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DAYS);
  document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(slugs))}; path=/; expires=${expires.toUTCString()}`;
}

export function ViewTracker({
  slug,
  cookieName = "blog_view",
  basePath = "/api/blog",
}: ViewTrackerProps) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    const viewed = getViewedSlugs(cookieName);
    if (viewed.includes(slug)) return;
    sent.current = true;
    fetch(`${basePath}/${encodeURIComponent(slug)}/view`, { method: "POST" })
      .then(() => addViewedSlug(slug, cookieName))
      .catch(() => {});
  }, [slug, cookieName, basePath]);
  return null;
}
