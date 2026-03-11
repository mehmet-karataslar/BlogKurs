import { createServerSupabase } from "@/lib/supabase/server";
import type { Project, ProjectInsert, ProjectUpdate } from "@/lib/types/project";

const TABLE = "projects";

/** All projects (admin list — includes drafts). */
export async function getProjects(): Promise<Project[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Project[];
}

/** Single project by slug. Optional filter: only published. */
export async function getProjectBySlug(
  slug: string,
  publishedOnly = false
): Promise<Project | null> {
  const supabase = createServerSupabase();
  let q = supabase.from(TABLE).select("*").eq("slug", slug);
  if (publishedOnly) q = q.eq("published", true);
  const { data, error } = await q.maybeSingle();
  if (error) throw error;
  return data as Project | null;
}

/** Projects for public list: published only, newest first. */
export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("published", true)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Project[];
}

/** Projects for homepage: published + featured, ordered by homepage_order then updated_at, limited. */
export async function getProjectsForHomepage(
  limit = 6
): Promise<Project[]> {
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
  return (data ?? []) as Project[];
}

/** Check if slug is used by another project (excludeId = current project id when editing). */
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

export async function createProject(row: ProjectInsert): Promise<Project> {
  const supabase = createServerSupabase();
  const withDefaults = {
    ...row,
    view_count: row.view_count ?? 0,
    like_count: row.like_count ?? 0,
    homepage_order: row.homepage_order ?? 0,
    related_links: row.related_links ?? [],
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase
    .from(TABLE)
    .insert(withDefaults)
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

export async function updateProject(
  slug: string,
  updates: ProjectUpdate
): Promise<Project> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("slug", slug)
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

export async function deleteProject(slug: string): Promise<void> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from(TABLE).delete().eq("slug", slug);
  if (error) throw error;
}

/** Increment view_count by 1. */
export async function incrementViewCount(slug: string): Promise<void> {
  const supabase = createServerSupabase();
  const { data: project } = await supabase
    .from(TABLE)
    .select("view_count")
    .eq("slug", slug)
    .single();
  if (!project) return;
  await supabase
    .from(TABLE)
    .update({
      view_count: (project.view_count ?? 0) + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);
}

/** Increment like_count by 1. */
export async function incrementLikeCount(slug: string): Promise<void> {
  const supabase = createServerSupabase();
  const { data: project } = await supabase
    .from(TABLE)
    .select("like_count")
    .eq("slug", slug)
    .single();
  if (!project) return;
  await supabase
    .from(TABLE)
    .update({
      like_count: (project.like_count ?? 0) + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);
}
