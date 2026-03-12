"use client";

import { useState } from "react";
import type {
  CvEducation,
  CvExperience,
  CvSkill,
  CvCertificate,
  CvLanguage,
  CvSkillLevel,
} from "@/lib/types/cv";
import {
  emptyEducation,
  emptyExperience,
  emptySkill,
  emptyCertificate,
  emptyLanguage,
  buildCvPayload,
} from "@/lib/cv-form-utils";

const SKILL_LEVELS: { value: CvSkillLevel; label: string }[] = [
  { value: "beginner", label: "Başlangıç" },
  { value: "intermediate", label: "Orta" },
  { value: "advanced", label: "İleri" },
  { value: "expert", label: "Uzman" },
];

const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]";
const labelClass =
  "block text-sm font-medium text-[var(--color-text-secondary)] mb-1";
const sectionClass =
  "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6";
const sectionTitleClass =
  "text-lg font-semibold text-[var(--color-text-primary)]";

export function CvBuilderForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [education, setEducation] = useState<CvEducation[]>([emptyEducation()]);
  const [experience, setExperience] = useState<CvExperience[]>([
    emptyExperience(),
  ]);
  const [skills, setSkills] = useState<CvSkill[]>([emptySkill()]);
  const [certificates, setCertificates] = useState<CvCertificate[]>([
    emptyCertificate(),
  ]);
  const [languages, setLanguages] = useState<CvLanguage[]>([emptyLanguage()]);
  const [additional, setAdditional] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pdfLoading, setPdfLoading] = useState(false);

  const addEducation = () =>
    setEducation((prev) => [...prev, emptyEducation()]);
  const updateEducation = (
    i: number,
    field: keyof CvEducation,
    value: string
  ) => {
    setEducation((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };
  const removeEducation = (i: number) =>
    setEducation((prev) => prev.filter((_, idx) => idx !== i));

  const addExperience = () =>
    setExperience((prev) => [...prev, emptyExperience()]);
  const updateExperience = (
    i: number,
    field: keyof CvExperience,
    value: string
  ) => {
    setExperience((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };
  const removeExperience = (i: number) =>
    setExperience((prev) => prev.filter((_, idx) => idx !== i));

  const addSkill = () => setSkills((prev) => [...prev, emptySkill()]);
  const updateSkill = (
    i: number,
    field: keyof CvSkill,
    value: string | CvSkillLevel | undefined
  ) => {
    setSkills((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };
  const removeSkill = (i: number) =>
    setSkills((prev) => prev.filter((_, idx) => idx !== i));

  const addCertificate = () =>
    setCertificates((prev) => [...prev, emptyCertificate()]);
  const updateCertificate = (
    i: number,
    field: keyof CvCertificate,
    value: string
  ) => {
    setCertificates((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };
  const removeCertificate = (i: number) =>
    setCertificates((prev) => prev.filter((_, idx) => idx !== i));

  const addLanguage = () =>
    setLanguages((prev) => [...prev, emptyLanguage()]);
  const updateLanguage = (
    i: number,
    field: keyof CvLanguage,
    value: string
  ) => {
    setLanguages((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };
  const removeLanguage = (i: number) =>
    setLanguages((prev) => prev.filter((_, idx) => idx !== i));

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Ad gerekli";
    if (!surname.trim()) e.surname = "Soyad gerekli";
    if (!email.trim()) e.email = "E-posta gerekli";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Geçerli e-posta girin";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleDownloadPdf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || pdfLoading) return;
    setPdfLoading(true);
    try {
      const payload = buildCvPayload({
        name,
        surname,
        email,
        phone,
        location,
        summary,
        photo_url: photoUrl,
        education,
        experience,
        skills,
        certificates,
        languages,
        additional,
      });
      const res = await fetch("/api/cv/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "PDF oluşturulamadı");
        return;
      }
      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition");
      const match = disposition?.match(/filename="?([^";]+)"?/);
      const filename = match?.[1] ?? "cv.pdf";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <form onSubmit={handleDownloadPdf} className="space-y-6">
      <p className="text-sm text-[var(--color-text-secondary)]">
        Bilgilerinizi girin ve PDF CV’nizi anında oluşturup indirin. Veriler
        kaydedilmez.
      </p>
      <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-[var(--color-border)]">
        <button
          type="submit"
          disabled={pdfLoading}
          className="rounded-lg bg-[var(--color-primary)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)] disabled:opacity-50"
        >
          {pdfLoading ? "PDF hazırlanıyor..." : "CV'mi PDF olarak indir"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className={sectionClass}>
            <h2 className={`${sectionTitleClass} mb-4`}>Kişisel bilgiler</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Ad *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ad"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Soyad *</label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Soyad"
                    className={inputClass}
                  />
                  {errors.surname && (
                    <p className="mt-1 text-xs text-red-500">{errors.surname}</p>
                  )}
                </div>
              </div>
              <div>
                <label className={labelClass}>E-posta *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta"
                  className={inputClass}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Telefon</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefon"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Konum / Şehir</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Konum"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Profil fotoğrafı URL (ops.)</label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Özet / Profil</label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Kısa özet (1–2 paragraf)"
                  rows={4}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={sectionTitleClass}>Eğitim</h2>
              <button
                type="button"
                onClick={addEducation}
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                + Ekle
              </button>
            </div>
            <div className="space-y-2">
              {education.map((edu, i) => (
                <div
                  key={edu.id}
                  className="flex flex-col gap-2 rounded-lg border border-[var(--color-border)] p-2"
                >
                  <div className="flex gap-2 flex-wrap">
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) =>
                        updateEducation(i, "school", e.target.value)
                      }
                      placeholder="Okul / Üniversite"
                      className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                    />
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(i, "degree", e.target.value)
                      }
                      placeholder="Derece"
                      className="w-36 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                    />
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(i, "field", e.target.value)
                      }
                      placeholder="Bölüm"
                      className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeEducation(i)}
                      className="text-red-500 hover:bg-red-500/10 rounded p-1 text-sm shrink-0"
                      aria-label="Kaldır"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={edu.start_date}
                      onChange={(e) =>
                        updateEducation(i, "start_date", e.target.value)
                      }
                      placeholder="Başlangıç"
                      className="w-24 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                    />
                    <input
                      type="text"
                      value={edu.end_date}
                      onChange={(e) =>
                        updateEducation(i, "end_date", e.target.value)
                      }
                      placeholder="Bitiş"
                      className="w-24 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    value={edu.description ?? ""}
                    onChange={(e) =>
                      updateEducation(i, "description", e.target.value)
                    }
                    placeholder="Açıklama (ops.)"
                    className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={sectionTitleClass}>İş deneyimi</h2>
              <button
                type="button"
                onClick={addExperience}
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                + Ekle
              </button>
            </div>
            <div className="space-y-2">
              {experience.map((exp, i) => (
                <div
                  key={exp.id}
                  className="flex flex-col gap-2 rounded-lg border border-[var(--color-border)] p-2"
                >
                  <div className="flex gap-2 flex-wrap">
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(i, "company", e.target.value)
                      }
                      placeholder="Şirket"
                      className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                    />
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) =>
                        updateExperience(i, "role", e.target.value)
                      }
                      placeholder="Pozisyon"
                      className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeExperience(i)}
                      className="text-red-500 hover:bg-red-500/10 rounded p-1 text-sm shrink-0"
                      aria-label="Kaldır"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={exp.start_date}
                      onChange={(e) =>
                        updateExperience(i, "start_date", e.target.value)
                      }
                      placeholder="Başlangıç"
                      className="w-24 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                    />
                    <input
                      type="text"
                      value={exp.end_date}
                      onChange={(e) =>
                        updateExperience(i, "end_date", e.target.value)
                      }
                      placeholder="Bitiş"
                      className="w-24 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                    />
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(i, "description", e.target.value)
                    }
                    placeholder="Görevler"
                    rows={2}
                    className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm w-full"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={sectionTitleClass}>Yetenekler</h2>
              <button
                type="button"
                onClick={addSkill}
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                + Ekle
              </button>
            </div>
            <div className="space-y-2">
              {skills.map((skill, i) => (
                <div
                  key={skill.id}
                  className="flex gap-2 items-center rounded-lg border border-[var(--color-border)] p-2"
                >
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(i, "name", e.target.value)}
                    placeholder="Yetenek"
                    className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <select
                    value={skill.level ?? ""}
                    onChange={(e) =>
                      updateSkill(
                        i,
                        "level",
                        e.target.value
                          ? (e.target.value as CvSkillLevel)
                          : undefined
                      )
                    }
                    className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm text-[var(--color-text-primary)]"
                  >
                    <option value="">Seviye (ops.)</option>
                    {SKILL_LEVELS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeSkill(i)}
                    className="text-red-500 hover:bg-red-500/10 rounded p-1 text-sm shrink-0"
                    aria-label="Kaldır"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={sectionTitleClass}>Sertifikalar</h2>
              <button
                type="button"
                onClick={addCertificate}
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                + Ekle
              </button>
            </div>
            <div className="space-y-2">
              {certificates.map((cert, i) => (
                <div
                  key={cert.id}
                  className="flex gap-2 flex-wrap items-center rounded-lg border border-[var(--color-border)] p-2"
                >
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) =>
                      updateCertificate(i, "name", e.target.value)
                    }
                    placeholder="Sertifika"
                    className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) =>
                      updateCertificate(i, "issuer", e.target.value)
                    }
                    placeholder="Veren"
                    className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) =>
                      updateCertificate(i, "date", e.target.value)
                    }
                    placeholder="Tarih"
                    className="w-24 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeCertificate(i)}
                    className="text-red-500 hover:bg-red-500/10 rounded p-1 text-sm shrink-0"
                    aria-label="Kaldır"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={sectionTitleClass}>Diller</h2>
              <button
                type="button"
                onClick={addLanguage}
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                + Ekle
              </button>
            </div>
            <div className="space-y-2">
              {languages.map((lang, i) => (
                <div
                  key={lang.id}
                  className="flex gap-2 items-center rounded-lg border border-[var(--color-border)] p-2"
                >
                  <input
                    type="text"
                    value={lang.name}
                    onChange={(e) =>
                      updateLanguage(i, "name", e.target.value)
                    }
                    placeholder="Dil"
                    className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    value={lang.level}
                    onChange={(e) =>
                      updateLanguage(i, "level", e.target.value)
                    }
                    placeholder="Seviye"
                    className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeLanguage(i)}
                    className="text-red-500 hover:bg-red-500/10 rounded p-1 text-sm shrink-0"
                    aria-label="Kaldır"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className={`${sectionTitleClass} mb-4`}>Ek bilgiler</h2>
            <textarea
              value={additional}
              onChange={(e) => setAdditional(e.target.value)}
              placeholder="Referanslar, hobiler vb."
              rows={3}
              className={inputClass}
            />
          </section>
        </div>
      </div>
    </form>
  );
}
