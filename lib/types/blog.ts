/**
 * Blog post type — Supabase posts table row.
 * Use snake_case to match DB; map to camelCase in UI if desired.
 */
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  content: string;
  published: boolean;
  featured_on_homepage: boolean;
  homepage_order: number;
  reading_time_minutes: number;
  category: string | null;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
}

export type PostInsert = Omit<Post, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type PostUpdate = Partial<
  Omit<Post, "id" | "created_at" | "updated_at">
>;
