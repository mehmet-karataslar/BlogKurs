"use client";

import { useState, useCallback } from "react";
import { RichTextEditor, ImportFileButton } from "@/components/features/blog/RichTextEditor";
import { CoverImageField } from "@/components/features/blog/CoverImageField";
import type { About, School, Certificate, Skill } from "@/lib/types/about";
import type { SkillLevel } from "@/lib/types/about";

const ABOUT_UPLOAD = "/api/admin/about/upload";

function newId() {
  return crypto.randomUUID();
}

const SKILL_LEVELS: { value: SkillLevel; label: string }[] = [
  { value: "beginner", label: "Başlangıç" },
  { value: "intermediate", label: "Orta" },
  { value: "advanced", label: "İleri" },
  { value: "expert", label: "Uzman" },
];

interface AboutFormProps {
  initial: About | null;
}

export function AboutForm({ initial }: AboutFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [surname, setSurname] = useState(initial?.surname ?? "");
  const [tagline, setTagline] = useState(initial?.tagline ?? "");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(
    initial?.profile_image_url ?? null
  );
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [schools, setSchools] = useState<School[]>(
    Array.isArray(initial?.schools) ? initial.schools.map((s) => ({ ...s, id: s.id || newId() })) : []
  );
  const [certificates, setCertificates] = useState<Certificate[]>(
    Array.isArray(initial?.certificates)
      ? initial.certificates.map((c) => ({ ...c, id: c.id || newId() }))
      : []
  );
  const [skills, setSkills] = useState<Skill[]>(
    Array.isArray(initial?.skills) ? initial.skills.map((s) => ({ ...s, id: s.id || newId() })) : []
  );
  const [technicalInfo, setTechnicalInfo] = useState(initial?.technical_info ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleImportBio = useCallback((text: string) => {
    setBio((prev) => prev + (prev ? "\n\n" : "") + text);
  }, []);

  const addSchool = () => {
    setSchools((prev) => [...prev, { id: newId(), name: "", period: "", description: "" }]);
  };
  const updateSchool = (index: number, field: keyof School, value: string) => {
    setSchools((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };
  const removeSchool = (index: number) => {
    setSchools((prev) => prev.filter((_, i) => i !== index));
  };

  const addCertificate = () => {
    setCertificates((prev) => [
      ...prev,
      { id: newId(), name: "", issuer: "", date: "", url: "" },
    ]);
  };
  const updateCertificate = (index: number, field: keyof Certificate, value: string) => {
    setCertificates((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };
  const removeCertificate = (index: number) => {
    setCertificates((prev) => prev.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    setSkills((prev) => [...prev, { id: newId(), name: "", level: undefined }]);
  };
  const updateSkill = (index: number, field: keyof Skill, value: string | undefined) => {
    setSkills((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };
  const removeSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Ad gerekli";
    if (!surname.trim()) e.surname = "Soyad gerekli";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);
    setSaved(false);
    try {
      const body = {
        name: name.trim(),
        surname: surname.trim(),
        tagline: tagline.trim(),
        profile_image_url: profileImageUrl,
        bio,
        schools: schools.filter((s) => s.name.trim()),
        certificates: certificates.filter((c) => c.name.trim() && c.issuer.trim()),
        skills: skills.filter((s) => s.name.trim()),
        technical_info: technicalInfo,
      };
      const res = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors({ form: data.error || "Kayıt başarısız" });
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errors.form && (
        <p className="rounded-lg bg-red-500/10 text-red-500 px-4 py-2 text-sm">
          {errors.form}
        </p>
      )}
      {saved && (
        <p className="rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-4 py-2 text-sm">
          Kaydedildi.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-[var(--color-border)]">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-[var(--color-primary)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)] disabled:opacity-50"
        >
          {submitting ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Kimlik
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                    Ad *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ad"
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                    Soyad *
                  </label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Soyad"
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                  />
                  {errors.surname && (
                    <p className="mt-1 text-xs text-red-500">{errors.surname}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                  Kısa unvan
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Örn. Yazılım Mühendisi"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Hakkımda metni
              </h2>
              <ImportFileButton onImport={handleImportBio} />
            </div>
            <RichTextEditor
              content={bio}
              onChange={setBio}
              placeholder="Kendinizi tanıtın..."
            />
          </section>

          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Okuduğu okullar
              </h2>
              <button
                type="button"
                onClick={addSchool}
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                + Ekle
              </button>
            </div>
            <div className="space-y-2">
              {schools.map((school, i) => (
                <div
                  key={school.id}
                  className="flex gap-2 flex-wrap items-start rounded-lg border border-[var(--color-border)] p-2"
                >
                  <input
                    type="text"
                    value={school.name}
                    onChange={(e) => updateSchool(i, "name", e.target.value)}
                    placeholder="Okul adı"
                    className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    value={school.period}
                    onChange={(e) => updateSchool(i, "period", e.target.value)}
                    placeholder="Dönem (örn. 2015–2019)"
                    className="w-28 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    value={school.description ?? ""}
                    onChange={(e) => updateSchool(i, "description", e.target.value)}
                    placeholder="Açıklama (ops.)"
                    className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeSchool(i)}
                    className="text-red-500 hover:bg-red-500/10 rounded p-1 text-sm shrink-0"
                    aria-label="Kaldır"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Sertifikalar
              </h2>
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
                    onChange={(e) => updateCertificate(i, "name", e.target.value)}
                    placeholder="Sertifika adı"
                    className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertificate(i, "issuer", e.target.value)}
                    placeholder="Veren kurum"
                    className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => updateCertificate(i, "date", e.target.value)}
                    placeholder="Tarih"
                    className="w-24 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <input
                    type="url"
                    value={cert.url ?? ""}
                    onChange={(e) => updateCertificate(i, "url", e.target.value)}
                    placeholder="Link (ops.)"
                    className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
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

          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Yetenekler / beceriler
              </h2>
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
                    placeholder="Yetenek adı"
                    className="flex-1 min-w-[8rem] rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm"
                  />
                  <select
                    value={skill.level ?? ""}
                    onChange={(e) =>
                      updateSkill(
                        i,
                        "level",
                        e.target.value ? (e.target.value as SkillLevel) : undefined
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

          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Teknik ve diğer bilgiler
            </h2>
            <RichTextEditor
              content={technicalInfo}
              onChange={setTechnicalInfo}
              placeholder="Ek bilgiler (Markdown/HTML)..."
            />
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Profil / kapak fotoğrafı
            </h2>
            {profileImageUrl && (
              <div className="mb-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setProfileImageUrl(null)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Kaldır
                </button>
              </div>
            )}
            <CoverImageField
              value={profileImageUrl}
              onChange={setProfileImageUrl}
              uploadEndpoint={ABOUT_UPLOAD}
            />
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              Yuvarlak önizleme sayfada gösterilir.
            </p>
          </section>
        </div>
      </div>
    </form>
  );
}
