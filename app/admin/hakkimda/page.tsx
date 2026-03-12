import { getAbout } from "@/lib/about";
import { AboutForm } from "@/components/features/about/AboutForm";
import { AdminSectionHeader } from "@/components/ui/AdminSectionHeader";
import { AdminCard } from "@/components/ui/AdminCard";

function AboutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

export default async function AdminHakkimdaPage() {
  const about = await getAbout();

  return (
    <>
      <AdminSectionHeader
        title="Hakkımda düzenle"
        description="Tek profil kaydını buradan düzenleyebilirsiniz. Ad, soyad, fotoğraf, hakkımda metni, okullar, sertifikalar ve yetenekler alanları kaydedilir."
        icon={<AboutIcon className="h-6 w-6 sm:h-7 sm:w-7" />}
      />
      <AdminCard>
        <AboutForm initial={about} />
      </AdminCard>
    </>
  );
}
