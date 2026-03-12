import { createServerSupabase } from "@/lib/supabase/server";
import type { About, AboutInsert, AboutUpdate } from "@/lib/types/about";
import { DEFAULT_ABOUT } from "@/lib/types/about";

const TABLE = "about";

/** Single about profile (one row). Returns null if table missing or error. */
export async function getAbout(): Promise<About | null> {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .limit(1)
      .maybeSingle();
    if (error) return null;
    return data as About | null;
  } catch {
    return null;
  }
}

/** Create or update the single about profile. Throws if table is missing (run supabase/about-schema.sql). */
export async function saveAbout(data: AboutUpdate & { id?: string }): Promise<About> {
  const supabase = createServerSupabase();
  const existing = await getAbout();

  if (existing) {
    const updates: AboutUpdate = {
      name: data.name ?? existing.name,
      surname: data.surname ?? existing.surname,
      tagline: data.tagline ?? existing.tagline,
      profile_image_url: data.profile_image_url !== undefined ? data.profile_image_url : existing.profile_image_url,
      bio: data.bio ?? existing.bio,
      schools: data.schools ?? existing.schools,
      certificates: data.certificates ?? existing.certificates,
      skills: data.skills ?? existing.skills,
      technical_info: data.technical_info ?? existing.technical_info,
    };
    const { data: updated, error } = await supabase
      .from(TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw error;
    return updated as About;
  }

  const insert: AboutInsert = {
    name: data.name ?? DEFAULT_ABOUT.name,
    surname: data.surname ?? DEFAULT_ABOUT.surname,
    tagline: data.tagline ?? DEFAULT_ABOUT.tagline,
    profile_image_url: data.profile_image_url ?? DEFAULT_ABOUT.profile_image_url,
    bio: data.bio ?? DEFAULT_ABOUT.bio,
    schools: data.schools ?? DEFAULT_ABOUT.schools,
    certificates: data.certificates ?? DEFAULT_ABOUT.certificates,
    skills: data.skills ?? DEFAULT_ABOUT.skills,
    technical_info: data.technical_info ?? DEFAULT_ABOUT.technical_info,
    updated_at: new Date().toISOString(),
  };
  const { data: created, error } = await supabase
    .from(TABLE)
    .insert(insert)
    .select()
    .single();
  if (error) throw error;
  return created as About;
}
