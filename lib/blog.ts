import { createServerSupabase } from "@/lib/supabase/server";
import type { Post, PostInsert, PostUpdate } from "@/lib/types/blog";

const TABLE = "posts";

/** All posts (admin list — includes drafts). */
export async function getPosts(): Promise<Post[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

/** Single post by slug. Optional filter: only published. */
export async function getPostBySlug(
  slug: string,
  publishedOnly = false
): Promise<Post | null> {
  const supabase = createServerSupabase();
  let q = supabase.from(TABLE).select("*").eq("slug", slug);
  if (publishedOnly) q = q.eq("published", true);
  const { data, error } = await q.maybeSingle();
  if (error) throw error;
  return data as Post | null;
}

/** Posts for public blog list: published only, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("published", true)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

/** Posts for homepage: published + featured, ordered by homepage_order then updated_at, limited. */
export async function getPostsForHomepage(limit = 6): Promise<Post[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("published", true)
    .eq("featured_on_homepage", true)
    .order("homepage_order", { ascending: true })
    .order("updated_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Post[];
}

/** Check if slug is used by another post (excludeId = current post id when editing). */
export async function isSlugTaken(
  slug: string,
  excludeId?: string
): Promise<boolean> {
  const supabase = createServerSupabase();
  let q = supabase.from(TABLE).select("id").eq("slug", slug);
  if (excludeId) q = q.neq("id", excludeId);
  const { data, error } = await q.maybeSingle();
  if (error) throw error;
  return !!data;
}

export async function createPost(row: PostInsert): Promise<Post> {
  const supabase = createServerSupabase();
  const withDefaults = {
    ...row,
    view_count: row.view_count ?? 0,
    like_count: row.like_count ?? 0,
    reading_time_minutes: row.reading_time_minutes ?? 5,
    homepage_order: row.homepage_order ?? 0,
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase
    .from(TABLE)
    .insert(withDefaults)
    .select()
    .single();
  if (error) throw error;
  return data as Post;
}

export async function updatePost(
  slug: string,
  updates: PostUpdate
): Promise<Post> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("slug", slug)
    .select()
    .single();
  if (error) throw error;
  return data as Post;
}

export async function deletePost(slug: string): Promise<void> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from(TABLE).delete().eq("slug", slug);
  if (error) throw error;
}

/** Increment view_count by 1. */
export async function incrementViewCount(slug: string): Promise<void> {
  const supabase = createServerSupabase();
  const { data: post } = await supabase
    .from(TABLE)
    .select("view_count")
    .eq("slug", slug)
    .single();
  if (!post) return;
  await supabase
    .from(TABLE)
    .update({
      view_count: (post.view_count ?? 0) + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);
}

/** Increment like_count by 1. */
export async function incrementLikeCount(slug: string): Promise<void> {
  const supabase = createServerSupabase();
  const { data: post } = await supabase
    .from(TABLE)
    .select("like_count")
    .eq("slug", slug)
    .single();
  if (!post) return;
  await supabase
    .from(TABLE)
    .update({
      like_count: (post.like_count ?? 0) + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);
}
