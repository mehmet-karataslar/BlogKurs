"use client";

import { CvLayout } from "@/components/features/cv/CvLayout";
import { CvDownloadButton } from "@/components/features/cv/CvDownloadButton";
import type { CV } from "@/lib/types/cv";

interface CvSiteSectionProps {
  cv: CV | null;
}

export function CvSiteSection({ cv }: CvSiteSectionProps) {
  if (!cv) {
    return (
      <p className="text-[var(--color-text-secondary)] text-sm sm:text-base py-4">
        Henüz CV eklenmemiş.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <CvLayout data={cv} />
      <div className="pt-4">
        <CvDownloadButton data={cv}>
          Site sahibi CV’sini PDF indir
        </CvDownloadButton>
      </div>
    </div>
  );
}
