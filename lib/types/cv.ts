/**
 * CV (Özgeçmiş) type — single row in Supabase cv table (data JSONB).
 * Use camelCase for app; API/DB stores same shape in JSONB.
 */
export type CvSkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface CvEducation {
  id: string;
  school: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
  description?: string;
}

export interface CvExperience {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface CvSkill {
  id: string;
  name: string;
  level?: CvSkillLevel;
}

export interface CvCertificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface CvLanguage {
  id: string;
  name: string;
  level: string;
}

export interface CV {
  name: string;
  surname: string;
  email: string;
  phone?: string;
  location?: string;
  summary: string;
  photo_url?: string;
  education: CvEducation[];
  experience: CvExperience[];
  skills: CvSkill[];
  certificates: CvCertificate[];
  languages: CvLanguage[];
  additional?: string;
  updated_at?: string;
}

export type CVInsert = CV;

export type CVUpdate = Partial<Omit<CV, "updated_at">> & { updated_at?: string };

/** Empty CV for initial form / fallback. */
export const DEFAULT_CV: CV = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  photo_url: "",
  education: [],
  experience: [],
  skills: [],
  certificates: [],
  languages: [],
  additional: "",
  updated_at: "",
};
