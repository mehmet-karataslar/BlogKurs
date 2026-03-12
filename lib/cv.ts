import { createServerSupabase } from "@/lib/supabase/server";
import type { CV, CVUpdate } from "@/lib/types/cv";
import { DEFAULT_CV } from "@/lib/types/cv";

const TABLE = "cv";

interface CvRow {
  id: string;
  data: CV;
  updated_at: string;
}

/** Single CV (site owner). Returns null if table missing or no row. */
export async function getCv(): Promise<CV | null> {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from(TABLE)
      .select("data, updated_at")
      .limit(1)
      .maybeSingle();
    if (error) return null;
    const row = data as { data: CV; updated_at: string } | null;
    if (!row || !row.data) return null;
    return { ...DEFAULT_CV, ...row.data, updated_at: row.updated_at } as CV;
  } catch {
    return null;
  }
}

/** Create or update the single CV. Throws if table missing. */
export async function saveCv(data: CVUpdate): Promise<CV> {
  const supabase = createServerSupabase();
  const existing = await getCv();
  const { data: existingRow } = await supabase
    .from(TABLE)
    .select("id")
    .limit(1)
    .maybeSingle();

  const merged: CV = {
    ...DEFAULT_CV,
    ...(existing ?? {}),
    ...data,
    name: data.name ?? existing?.name ?? DEFAULT_CV.name,
    surname: data.surname ?? existing?.surname ?? DEFAULT_CV.surname,
    email: data.email ?? existing?.email ?? DEFAULT_CV.email,
    summary: data.summary ?? existing?.summary ?? DEFAULT_CV.summary,
    education: data.education ?? existing?.education ?? DEFAULT_CV.education,
    experience: data.experience ?? existing?.experience ?? DEFAULT_CV.experience,
    skills: data.skills ?? existing?.skills ?? DEFAULT_CV.skills,
    certificates: data.certificates ?? existing?.certificates ?? DEFAULT_CV.certificates,
    languages: data.languages ?? existing?.languages ?? DEFAULT_CV.languages,
    updated_at: new Date().toISOString(),
  };

  if (existingRow?.id) {
    const { data: updated, error } = await supabase
      .from(TABLE)
      .update({ data: merged, updated_at: merged.updated_at })
      .eq("id", existingRow.id)
      .select()
      .single();
    if (error) throw error;
    const row = updated as CvRow;
    return { ...merged, ...row.data, updated_at: row.updated_at } as CV;
  }

  const { data: created, error } = await supabase
    .from(TABLE)
    .insert({ data: merged })
    .select()
    .single();
  if (error) throw error;
  const row = created as CvRow;
  return { ...merged, ...row.data, updated_at: row.updated_at } as CV;
}
