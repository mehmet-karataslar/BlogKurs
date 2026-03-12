import { getAbout } from "@/lib/about";
import { AboutForm } from "@/components/features/about/AboutForm";

export default async function AdminHakkimdaPage() {
  const about = await getAbout();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
        Hakkımda düzenle
      </h1>
      <p className="text-sm text-[var(--color-text-secondary)]">
        Tek profil kaydını buradan düzenleyebilirsiniz. Ad, soyad, fotoğraf, hakkımda metni,
        okullar, sertifikalar ve yetenekler alanları kaydedilir.
      </p>
      <AboutForm initial={about} />
    </div>
  );
}
