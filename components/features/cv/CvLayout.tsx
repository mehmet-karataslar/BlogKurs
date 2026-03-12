import type { CV } from "@/lib/types/cv";

const SECTION_TITLE =
  "text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mt-6 sm:mt-8 mb-2";

interface CvLayoutProps {
  data: CV;
}

/** Web preview of CV — theme vars, responsive. Same structure as PDF. */
export function CvLayout({ data }: CvLayoutProps) {
  const fullName = [data.name, data.surname].filter(Boolean).join(" ");
  const contactLine = [data.email, data.phone, data.location]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="text-[var(--color-text-primary)] text-sm sm:text-base max-w-none">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] pb-4 mb-4">
        <div className="flex flex-wrap gap-4 items-start justify-between">
          <div>
            {fullName && (
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                {fullName}
              </h1>
            )}
            {contactLine && (
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {contactLine}
              </p>
            )}
          </div>
          {data.photo_url && (
            // eslint-disable-next-line @next/next/no-img-element -- User-provided URL; next/image requires known origin
            <img
              src={data.photo_url}
              alt=""
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-[var(--color-border)] shrink-0"
            />
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary?.trim() && (
        <section className="mb-4">
          <h2 className={SECTION_TITLE}>Özet</h2>
          <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap">
            {data.summary}
          </p>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-4">
          <h2 className={SECTION_TITLE}>Eğitim</h2>
          <ul className="space-y-3">
            {data.education.map((edu) => (
              <li key={edu.id} className="border-b border-[var(--color-border)] pb-3 last:border-0">
                <p className="font-semibold text-[var(--color-text-primary)]">
                  {edu.school}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {[edu.degree, edu.field].filter(Boolean).join(" · ")}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {edu.start_date} – {edu.end_date}
                </p>
                {edu.description?.trim() && (
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {edu.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-4">
          <h2 className={SECTION_TITLE}>İş Deneyimi</h2>
          <ul className="space-y-3">
            {data.experience.map((exp) => (
              <li key={exp.id} className="border-b border-[var(--color-border)] pb-3 last:border-0">
                <p className="font-semibold text-[var(--color-text-primary)]">
                  {exp.company}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {exp.role}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {exp.start_date} – {exp.end_date}
                </p>
                {exp.description?.trim() && (
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap">
                    {exp.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="mb-4">
          <h2 className={SECTION_TITLE}>Yetenekler</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s) => (
              <span
                key={s.id}
                className="rounded-md bg-[var(--color-surface-elevated)] px-2 py-1 text-sm text-[var(--color-text-secondary)]"
              >
                {s.name}
                {s.level ? ` (${s.level})` : ""}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certificates */}
      {data.certificates?.length > 0 && (
        <section className="mb-4">
          <h2 className={SECTION_TITLE}>Sertifikalar</h2>
          <ul className="space-y-2">
            {data.certificates.map((cert) => (
              <li key={cert.id} className="text-sm">
                <span className="font-semibold text-[var(--color-text-primary)]">
                  {cert.name}
                </span>
                {" · "}
                <span className="text-[var(--color-text-secondary)]">
                  {cert.issuer}
                </span>
                {cert.date && (
                  <>
                    {" · "}
                    <span className="text-[var(--color-text-muted)]">
                      {cert.date}
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <section className="mb-4">
          <h2 className={SECTION_TITLE}>Diller</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-text-secondary)]">
            {data.languages.map((lang) => (
              <span key={lang.id}>
                {lang.name}
                {lang.level ? ` — ${lang.level}` : ""}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Additional */}
      {data.additional?.trim() && (
        <section className="mb-4">
          <h2 className={SECTION_TITLE}>Ek bilgiler</h2>
          <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap text-sm">
            {data.additional}
          </p>
        </section>
      )}
    </article>
  );
}
