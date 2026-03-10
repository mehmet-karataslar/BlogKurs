import Link from "next/link";

export default function AdminPage() {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">
        Dashboard
      </h1>
      <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mb-8">
        Yönetim paneline hoş geldiniz. Blog yazılarınızı buradan yönetebilirsiniz.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Link
          href="/admin/blog"
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-200 hover:border-[var(--color-primary)]/50 hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            Blog yönetimi
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Yazıları listele, yeni yazı ekle veya düzenle.
          </p>
        </Link>
      </div>
    </>
  );
}
