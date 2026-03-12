import { getCv } from "@/lib/cv";
import { CvForm } from "@/components/features/cv/CvForm";
import { AdminSectionHeader } from "@/components/ui/AdminSectionHeader";
import { AdminCard } from "@/components/ui/AdminCard";

function CvIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

export default async function AdminCvPage() {
  const cv = await getCv();

  return (
    <>
      <AdminSectionHeader
        title="CV / Özgeçmiş"
        description="Site sahibi CV’nizi buradan düzenleyebilirsiniz. Kaydedip PDF olarak indirebilirsiniz. Ziyaretçiler /cv sayfasında bu CV’yi görebilir ve PDF indirebilir."
        icon={<CvIcon className="h-6 w-6 sm:h-7 sm:w-7" />}
      />
      <AdminCard>
        <CvForm initial={cv} />
      </AdminCard>
    </>
  );
}
