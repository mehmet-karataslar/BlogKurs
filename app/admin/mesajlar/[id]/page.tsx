import { notFound } from "next/navigation";
import { getMessageById } from "@/lib/contact";
import { MessageDetailActions } from "@/components/features/contact/MessageDetailActions";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { ContactMessageStatus } from "@/lib/types/contact";

interface PageProps {
  params: Promise<{ id: string }>;
}

function statusLabel(status: ContactMessageStatus): string {
  switch (status) {
    case "new":
      return "Yeni";
    case "read":
      return "Okundu";
    case "replied":
      return "Cevaplandı";
    default:
      return status;
  }
}

export default async function AdminMesajDetayPage({ params }: PageProps) {
  const { id } = await params;
  const message = await getMessageById(id);
  if (!message) notFound();

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            Mesaj detayı
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            {new Date(message.created_at).toLocaleString("tr-TR")}
          </p>
        </div>
        <Button as="link" href="/admin/mesajlar" variant="secondary" size="sm">
          Listeye dön
        </Button>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              Gönderen
            </span>
            <p className="text-[var(--color-text-primary)] font-medium mt-0.5">
              {message.name}
            </p>
          </div>
          <div>
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              E-posta
            </span>
            <p className="text-[var(--color-text-primary)] mt-0.5">
              <a
                href={`mailto:${message.email}`}
                className="text-[var(--color-primary)] hover:underline"
              >
                {message.email}
              </a>
            </p>
          </div>
        </div>

        {message.subject && (
          <div>
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              Konu
            </span>
            <p className="text-[var(--color-text-primary)] mt-0.5">
              {message.subject}
            </p>
          </div>
        )}

        <div>
          <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
            Mesaj
          </span>
          <p className="text-[var(--color-text-primary)] mt-0.5 whitespace-pre-wrap">
            {message.message}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
            Durum
          </span>
          <Badge
            variant={
              message.status === "new"
                ? "blog"
                : message.status === "replied"
                  ? "proje"
                  : "default"
            }
          >
            {statusLabel(message.status)}
          </Badge>
        </div>

        {message.reply_text && (
          <div>
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              Kaydedilen cevap
              {message.replied_at &&
                ` (${new Date(message.replied_at).toLocaleString("tr-TR")})`}
            </span>
            <p className="text-[var(--color-text-primary)] mt-0.5 whitespace-pre-wrap">
              {message.reply_text}
            </p>
          </div>
        )}

        <hr className="border-[var(--color-border)]" />

        <MessageDetailActions message={message} />
      </div>
    </>
  );
}
