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
