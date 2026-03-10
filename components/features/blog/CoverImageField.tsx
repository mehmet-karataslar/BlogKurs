"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";

const COMPRESS_THRESHOLD = 800 * 1024; // 800 KB
const OPTIONS = { maxWidthOrHeight: 1600, maxSizeMB: 1, useWebWorker: true };

interface CoverImageFieldProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export function CoverImageField({ value, onChange }: CoverImageFieldProps) {
  const [mode, setMode] = useState<"url" | "file">("url");
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      let blob: Blob = file;
      if (file.size > COMPRESS_THRESHOLD) {
        blob = await imageCompression(file, OPTIONS);
      }
      const formData = new FormData();
      formData.append("file", blob, file.name);
      const res = await fetch("/api/admin/blog/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Yükleme başarısız");
      }
      const { url } = await res.json();
      onChange(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Yükleme başarısız");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const applyUrl = () => {
    const v = urlInput.trim();
    onChange(v || null);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--color-text-secondary)]">
        URL girin veya dosya yükleyin
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`rounded-lg px-3 py-1.5 text-sm ${mode === "url" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]"}`}
        >
          URL
        </button>
        <button
          type="button"
          onClick={() => { setMode("file"); fileInputRef.current?.click(); }}
          className={`rounded-lg px-3 py-1.5 text-sm ${mode === "file" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]"}`}
        >
          Dosya
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFile}
          disabled={uploading}
        />
      </div>
      {mode === "url" && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
          />
          <button
            type="button"
            onClick={applyUrl}
            className="rounded-lg bg-[var(--color-primary)] px-3 py-2 text-sm text-white hover:bg-[var(--color-primary-hover)]"
          >
            Uygula
          </button>
        </div>
      )}
      {uploading && (
        <p className="text-sm text-[var(--color-text-muted)]">Yükleniyor...</p>
      )}
      <div className="relative aspect-video w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] overflow-hidden">
        {value ? (
          <Image
            src={value}
            alt="Kapak önizleme"
            fill
            className="object-cover"
            sizes="400px"
            unoptimized={value.startsWith("blob:") || value.includes("supabase")}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] text-sm">
            Görsel önizlemesi
          </div>
        )}
      </div>
    </div>
  );
}
