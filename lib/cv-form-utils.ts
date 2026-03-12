import type {
  CV,
  CvEducation,
  CvExperience,
  CvSkill,
  CvCertificate,
  CvLanguage,
} from "@/lib/types/cv";

export function newCvId(): string {
  return crypto.randomUUID();
}

/** Tarih alanını input type="date" için YYYY-MM-DD formatına çevirir (takvim seçici). */
export function toDateInputValue(value: string | undefined): string {
  if (!value || !value.trim()) return "";
  const s = value.trim();
  const ymd = /^\d{4}-\d{2}-\d{2}$/.test(s);
  const ym = /^\d{4}-\d{2}$/.test(s);
  const y = /^\d{4}$/.test(s);
  if (ymd) return s;
  if (ym) return `${s}-01`;
  if (y) return `${s}-01-01`;
  return "";
}

export const emptyEducation = (): CvEducation => ({
  id: newCvId(),
  school: "",
  degree: "",
  field: "",
  start_date: "",
  end_date: "",
  description: "",
});

export const emptyExperience = (): CvExperience => ({
  id: newCvId(),
  company: "",
  role: "",
  start_date: "",
  end_date: "",
  description: "",
});

export const emptySkill = (): CvSkill => ({ id: newCvId(), name: "", level: undefined });

export const emptyCertificate = (): CvCertificate => ({
  id: newCvId(),
  name: "",
  issuer: "",
  date: "",
  url: "",
});

export const emptyLanguage = (): CvLanguage => ({
  id: newCvId(),
  name: "",
  level: "",
});

export interface CvFormState {
  name: string;
  surname: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  photo_url: string;
  education: CvEducation[];
  experience: CvExperience[];
  skills: CvSkill[];
  certificates: CvCertificate[];
  languages: CvLanguage[];
  additional: string;
}

export function buildCvPayload(form: CvFormState): CV {
  return {
    name: form.name.trim(),
    surname: form.surname.trim(),
    email: form.email.trim(),
    phone: form.phone.trim() || undefined,
    location: form.location.trim() || undefined,
    summary: form.summary.trim(),
    photo_url: form.photo_url.trim() || undefined,
    education: form.education.filter((e) => e.school.trim()),
    experience: form.experience.filter((e) => e.company.trim()),
    skills: form.skills.filter((s) => s.name.trim()),
    certificates: form.certificates.filter(
      (c) => c.name.trim() && c.issuer.trim()
    ),
    languages: form.languages.filter((l) => l.name.trim()),
    additional: form.additional.trim() || undefined,
  };
}
