"use client";

import { useEffect } from "react";

export default function AdminMesajlarError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-[var(--color-text-primary)]">
      <h2 className="text-lg font-semibold mb-2">Bir hata oluştu</h2>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
        {error.message}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm text-white hover:bg-[var(--color-primary-hover)]"
      >
        Tekrar dene
      </button>
    </div>
  );
}
