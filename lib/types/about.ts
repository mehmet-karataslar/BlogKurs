/**
 * About (Hakkımda) profile type — single row in Supabase about table.
 * Use snake_case for DB column names.
 */
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface School {
  id: string;
  name: string;
  period: string;
  description?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: SkillLevel;
}

export interface About {
  id: string;
  name: string;
  surname: string;
  tagline: string;
  profile_image_url: string | null;
  bio: string;
  schools: School[];
  certificates: Certificate[];
  skills: Skill[];
  technical_info: string;
  updated_at: string;
}

export type AboutInsert = Omit<About, "id" | "updated_at"> & {
  id?: string;
  updated_at?: string;
};

export type AboutUpdate = Partial<
  Omit<About, "id" | "updated_at">
> & { updated_at?: string };

/** Empty profile for initial form / fallback. */
export const DEFAULT_ABOUT: Omit<About, "id" | "updated_at"> = {
  name: "",
  surname: "",
  tagline: "",
  profile_image_url: null,
  bio: "",
  schools: [],
  certificates: [],
  skills: [],
  technical_info: "",
};
