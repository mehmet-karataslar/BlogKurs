/**
 * Project type — Supabase projects table row.
 * Use snake_case to match DB.
 */
export interface RelatedLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  content: string;
  github_url: string | null;
  live_demo_url: string | null;
  related_links: RelatedLink[];
  published: boolean;
  featured_on_homepage: boolean;
  homepage_order: number;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
}

export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type ProjectUpdate = Partial<
  Omit<Project, "id" | "created_at" | "updated_at">
>;
