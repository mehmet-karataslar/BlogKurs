"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { ContactMessage, ContactMessageStatus } from "@/lib/types/contact";

interface MessageDetailActionsProps {
  message: ContactMessage;
  onUpdate?: (updated: ContactMessage) => void;
}

export function MessageDetailActions({ message, onUpdate }: MessageDetailActionsProps) {
  const [replyText, setReplyText] = useState(message.reply_text ?? "");
  const [status, setStatus] = useState<ContactMessageStatus>(message.status);
  const [markingRead, setMarkingRead] = useState(false);
  const [savingReply, setSavingReply] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const markAsRead = async () => {
    if (status !== "new") return;
    setMarkingRead(true);
    try {
      const res = await fetch(`/api/admin/mesajlar/${message.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "read" }),
      });
      if (res.ok) {
        const data = await res.json();
        setStatus("read");
        onUpdate?.(data);
      }
    } finally {
      setMarkingRead(false);
    }
  };

  const saveReply = async () => {
    setSavingReply(true);
    setNotice(null);
    try {
      const res = await fetch(`/api/admin/mesajlar/${message.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reply_text: replyText,
          replied_at: new Date().toISOString(),
          status: "replied",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setStatus("replied");
        setNotice("Cevap kaydedildi.");
        onUpdate?.(data);
      } else {
        setNotice("Cevap kaydedilemedi.");
      }
    } catch {
      setNotice("Cevap kaydedilemedi.");
    } finally {
      setSavingReply(false);
    }
  };

  const inputBase =
    "w-full rounded-lg border bg-[var(--color-surface)] px-3 py-2 text-sm sm:text-base text-[var(--color-text-primary)] border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]";

  return (
    <div className="space-y-6">
      {status === "new" && (
        <div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={markAsRead}
            disabled={markingRead}
          >
            {markingRead ? "İşaretleniyor…" : "Okundu işaretle"}
          </Button>
        </div>
      )}

      <div>
        <label
          htmlFor="reply-text"
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
        >
          Cevap
        </label>
        <textarea
          id="reply-text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          rows={5}
          className={`${inputBase} resize-y min-h-[120px]`}
          placeholder="Cevabınızı yazın…"
          disabled={savingReply}
        />
        <div className="mt-2 flex items-center gap-3">
          <Button
            type="button"
            onClick={saveReply}
            disabled={savingReply}
          >
            {savingReply ? "Kaydediliyor…" : "Cevabı kaydet"}
          </Button>
          {notice && (
            <span
              className={`text-sm ${
                notice === "Cevap kaydedildi."
                  ? "text-[var(--color-primary)]"
                  : "text-red-500"
              }`}
              role="status"
            >
              {notice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
