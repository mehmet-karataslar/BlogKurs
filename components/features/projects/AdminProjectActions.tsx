"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Project } from "@/lib/types/project";

interface AdminProjectActionsProps {
  project: Project;
}

export function AdminProjectActions({ project }: AdminProjectActionsProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);

  const handleDelete = async () => {
    if (confirmSlug !== project.slug) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `/api/admin/projeler/${encodeURIComponent(project.slug)}`,
        { method: "DELETE" }
      );
      if (res.ok) router.refresh();
    } finally {
      setDeleting(false);
      setConfirmSlug(null);
    }
  };

  const wantDelete = confirmSlug === project.slug;

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/projeler/${project.slug}/duzenle`}
        className="rounded-lg px-3 py-1.5 text-sm bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
      >
        Düzenle
      </Link>
      {!wantDelete ? (
        <button
          type="button"
          onClick={() => setConfirmSlug(project.slug)}
          className="rounded-lg px-3 py-1.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
        >
          Sil
        </button>
      ) : (
        <>
          <span className="text-xs text-[var(--color-text-muted)]">
            Silinsin mi?
          </span>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg px-3 py-1.5 text-sm bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          >
            {deleting ? "..." : "Evet"}
          </button>
          <button
            type="button"
            onClick={() => setConfirmSlug(null)}
            className="rounded-lg px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
          >
            Hayır
          </button>
        </>
      )}
    </div>
  );
}
