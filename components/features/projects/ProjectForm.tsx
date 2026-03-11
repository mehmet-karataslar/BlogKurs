"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor, ImportFileButton } from "@/components/features/blog/RichTextEditor";
import { CoverImageField } from "@/components/features/blog/CoverImageField";
import { slugify } from "@/lib/slug";
import type { Project, RelatedLink } from "@/lib/types/project";

const PROJECT_COVER_UPLOAD = "/api/admin/projeler/upload";

interface ProjectFormProps {
  mode: "create" | "edit";
  initial?: Project | null;
}

export function ProjectForm({ mode, initial }: ProjectFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(
    initial?.cover_image_url ?? null
  );
  const [liveDemoUrl, setLiveDemoUrl] = useState(initial?.live_demo_url ?? "");
  const [githubUrl, setGithubUrl] = useState(initial?.github_url ?? "");
  const [relatedLinks, setRelatedLinks] = useState<RelatedLink[]>(
    Array.isArray(initial?.related_links) ? [...initial.related_links] : []
  );
  const [published, setPublished] = useState(initial?.published ?? false);
  const [featuredOnHomepage, setFeaturedOnHomepage] = useState(
    initial?.featured_on_homepage ?? false
  );
  const [homepageOrder, setHomepageOrder] = useState(
    initial?.homepage_order ?? 0
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleTitleBlur = useCallback(() => {
    if (mode === "create" && !slug.trim()) {
      setSlug(slugify(title));
    }
  }, [mode, title, slug]);

  const handleImportFile = useCallback((text: string) => {
    setContent((prev) => prev + (prev ? "\n\n" : "") + text);
  }, []);

  const addRelatedLink = () => {
    setRelatedLinks((prev) => [...prev, { label: "", url: "" }]);
  };

  const updateRelatedLink = (index: number, field: "label" | "url", value: string) => {
    setRelatedLinks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const removeRelatedLink = (index: number) => {
    setRelatedLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Başlık gerekli";
    if (!slug.trim()) e.slug = "Slug gerekli";
    if (!excerpt.trim()) e.excerpt = "Özet gerekli";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);
    try {
      const body = {
        slug: slug.trim(),
        title: title.trim(),
        excerpt: excerpt.trim(),
        cover_image_url: coverImageUrl,
        content,
        live_demo_url: liveDemoUrl.trim() || null,
        github_url: githubUrl.trim() || null,
        related_links: relatedLinks.filter((l) => l.label.trim() && l.url.trim()),
        published,
        featured_on_homepage: featuredOnHomepage,
        homepage_order: homepageOrder,
      };
      if (mode === "create") {
        const res = await fetch("/api/admin/projeler", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 409) setErrors({ slug: "Bu slug zaten kullanılıyor" });
          else setErrors({ form: data.error || "Kayıt başarısız" });
          return;
        }
        router.push("/admin/projeler");
        router.refresh();
      } else {
        const res = await fetch(
          `/api/admin/projeler/${encodeURIComponent(initial!.slug)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 409) setErrors({ slug: "Bu slug zaten kullanılıyor" });
          else setErrors({ form: data.error || "Güncelleme başarısız" });
          return;
        }
        router.push("/admin/projeler");
        router.refresh();
      }
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

      <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-[var(--color-border)]">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-[var(--color-primary)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)] disabled:opacity-50"
        >
          {submitting ? "Kaydediliyor..." : mode === "create" ? "Oluştur" : "Kaydet"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projeler")}
          className="rounded-lg border border-[var(--color-border)] px-6 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
        >
          İptal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Temel bilgiler
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                  Başlık *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleTitleBlur}
                  placeholder="Proje başlığı"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="proje-slug"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                />
                {errors.slug && (
                  <p className="mt-1 text-xs text-red-500">{errors.slug}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                  Özet
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Projenin kısa tanıtımı..."
                  rows={3}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                />
                {errors.excerpt && (
                  <p className="mt-1 text-xs text-red-500">{errors.excerpt}</p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                İçerik
              </h2>
              <ImportFileButton onImport={handleImportFile} />
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mb-3">
              Proje detaylarınızı burada yazın.
            </p>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Proje açıklamanızı buraya yazın..."
            />
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Kapak görseli
            </h2>
            <CoverImageField
              value={coverImageUrl}
              onChange={setCoverImageUrl}
              uploadEndpoint={PROJECT_COVER_UPLOAD}
            />
          </section>

          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Yayınlama
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded border-[var(--color-border)]"
                />
                <span className="text-sm text-[var(--color-text-primary)]">
                  Projeyi yayınla
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featuredOnHomepage}
                  onChange={(e) => setFeaturedOnHomepage(e.target.checked)}
                  className="rounded border-[var(--color-border)]"
                />
                <span className="text-sm text-[var(--color-text-primary)]">
                  Ana sayfada öne çıkar
                </span>
              </label>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                  Ana sayfa sırası
                </label>
                <input
                  type="number"
                  min={0}
                  value={homepageOrder}
                  onChange={(e) =>
                    setHomepageOrder(Number(e.target.value) || 0)
                  }
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Linkler
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                  Canlı demo URL
                </label>
                <input
                  type="url"
                  value={liveDemoUrl}
                  onChange={(e) => setLiveDemoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                    İlgili linkler
                  </label>
                  <button
                    type="button"
                    onClick={addRelatedLink}
                    className="text-sm text-[var(--color-primary)] hover:underline"
                  >
                    + Ekle
                  </button>
                </div>
                <div className="space-y-2">
                  {relatedLinks.map((link, i) => (
                    <div
                      key={i}
                      className="flex gap-2 items-center rounded-lg border border-[var(--color-border)] p-2"
                    >
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) =>
                          updateRelatedLink(i, "label", e.target.value)
                        }
                        placeholder="Etiket"
                        className="flex-1 min-w-0 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-sm"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) =>
                          updateRelatedLink(i, "url", e.target.value)
                        }
                        placeholder="https://..."
                        className="flex-1 min-w-0 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeRelatedLink(i)}
                        className="text-red-500 hover:bg-red-500/10 rounded p-1 text-sm shrink-0"
                        aria-label="Kaldır"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
