import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { BlogPostContent } from "@/components/features/blog/BlogPostContent";
import { getAbout } from "@/lib/about";
import { site } from "@/lib/site";
import type { Metadata } from "next";

function truncateForMeta(text: string, maxLen: number): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (trimmed.length <= maxLen) return trimmed;
  const cut = trimmed.slice(0, maxLen).lastIndexOf(" ");
  return cut > 0 ? trimmed.slice(0, cut) + "…" : trimmed.slice(0, maxLen) + "…";
}

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  const title = `Hakkımda | ${site.name}`;
  const description =
    about?.tagline?.trim() ||
    (about?.bio ? truncateForMeta(about.bio, 160) : undefined) ||
    `${site.name} hakkında.`;
  return {
    title,
    description,
  };
}

export default async function HakkimdaPage() {
  const about = await getAbout();

  if (!about) {
    return (
      <Section>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">
            Hakkımda
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)]">
            Henüz bir profil eklenmemiş. Yönetici panelinden Hakkımda bilgilerini doldurabilirsiniz.
          </p>
        </div>
      </Section>
    );
  }

  const fullName = [about.name, about.surname].filter(Boolean).join(" ").trim() || site.name;

  return (
    <Section wrapperClassName="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      {/* Profil üst: fotoğraf, ad soyad, tagline */}
      <header
        className="about-section mb-10 sm:mb-14"
        style={{ animationDelay: "0s" }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          {about.profile_image_url && (
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden flex-shrink-0 border-2 border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
              <Image
                src={about.profile_image_url}
                alt=""
                fill
                className="object-cover"
                sizes="160px"
                priority
                unoptimized={about.profile_image_url.includes("supabase")}
              />
            </div>
          )}
          <div className="text-center sm:text-left flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
              {fullName}
            </h1>
            {about.tagline?.trim() && (
              <p className="text-base sm:text-lg text-[var(--color-primary)] font-medium">
                {about.tagline.trim()}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Hakkımda metni */}
      {about.bio?.trim() && (
        <div
          className="about-section mb-10 sm:mb-14"
          style={{ animationDelay: "0.08s" }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
            Hakkımda
          </h2>
          <div className="blog-content text-sm sm:text-base">
            <BlogPostContent html={about.bio} />
          </div>
        </div>
      )}

      {/* Okullar */}
      {about.schools?.length > 0 && (
        <div
          className="about-section mb-10 sm:mb-14"
          style={{ animationDelay: "0.16s" }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
            Eğitim
          </h2>
          <ul className="space-y-3">
            {about.schools.map((school, i) => (
              <li
                key={school.id}
                className="about-item rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5"
                style={{ animationDelay: `${0.24 + i * 0.06}s` }}
              >
                <div className="font-medium text-[var(--color-text-primary)]">
                  {school.name}
                </div>
                {school.period && (
                  <div className="text-sm text-[var(--color-text-muted)] mt-0.5">
                    {school.period}
                  </div>
                )}
                {school.description?.trim() && (
                  <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                    {school.description.trim()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sertifikalar */}
      {about.certificates?.length > 0 && (
        <div
          className="about-section mb-10 sm:mb-14"
          style={{ animationDelay: "0.32s" }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
            Sertifikalar
          </h2>
          <ul className="space-y-3">
            {about.certificates.map((cert, i) => (
              <li
                key={cert.id}
                className="about-item rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5"
                style={{ animationDelay: `${0.4 + i * 0.06}s` }}
              >
                <div className="font-medium text-[var(--color-text-primary)]">
                  {cert.name}
                </div>
                <div className="text-sm text-[var(--color-text-muted)] mt-0.5">
                  {cert.issuer}
                  {cert.date && ` · ${cert.date}`}
                </div>
                {cert.url?.trim() && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-primary)] hover:underline mt-2 inline-block"
                  >
                    Sertifikayı görüntüle
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Yetenekler */}
      {about.skills?.length > 0 && (
        <div
          className="about-section mb-10 sm:mb-14"
          style={{ animationDelay: "0.48s" }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
            Yetenekler
          </h2>
          <ul className="flex flex-wrap gap-2">
            {about.skills.map((skill, i) => (
              <li
                key={skill.id}
                className="about-item"
                style={{ animationDelay: `${0.56 + i * 0.04}s` }}
              >
                <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-1.5 text-sm text-[var(--color-text-primary)]">
                  {skill.name}
                  {skill.level && (
                    <span className="ml-1.5 text-[var(--color-text-muted)] text-xs">
                      ({skill.level})
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Teknik bilgi */}
      {about.technical_info?.trim() && (
        <div
          className="about-section"
          style={{ animationDelay: "0.64s" }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
            Teknik ve diğer bilgiler
          </h2>
          <div className="blog-content text-sm sm:text-base">
            <BlogPostContent html={about.technical_info} />
          </div>
        </div>
      )}
    </Section>
  );
}
