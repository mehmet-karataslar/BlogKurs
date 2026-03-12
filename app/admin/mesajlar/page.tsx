import { getMessages } from "@/lib/contact";
import { AdminSectionHeader } from "@/components/ui/AdminSectionHeader";
import { AdminDataTable } from "@/components/ui/AdminDataTable";
import { AdminEmptyState } from "@/components/ui/AdminEmptyState";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ContactMessageStatus } from "@/lib/types/contact";

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
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

function statusBadgeVariant(status: ContactMessageStatus): "blog" | "default" | "proje" {
  switch (status) {
    case "new":
      return "blog";
    case "read":
      return "default";
    case "replied":
      return "proje";
    default:
      return "default";
  }
}

function messagePreview(text: string, maxWords = 12): string {
  const words = text.trim().split(/\s+/).slice(0, maxWords);
  return words.join(" ") + (words.length >= maxWords ? "…" : "");
}

export default async function AdminMesajlarPage() {
  let messages: Awaited<ReturnType<typeof getMessages>> = [];
  try {
    messages = await getMessages();
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <AdminSectionHeader
        title="Mesajlar"
        description="İletişim formundan gelen mesajları görüntüleyin ve cevaplayın."
        icon={<MessageIcon className="h-6 w-6 sm:h-7 sm:w-7" />}
      />

      {messages.length === 0 ? (
        <AdminEmptyState
          message="Henüz mesaj yok."
          icon={<MessageIcon className="h-12 w-12" />}
        />
      ) : (
        <AdminDataTable>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
                <th className="p-3 font-medium text-[var(--color-text-primary)]">
                  Gönderen / E-posta
                </th>
                <th className="p-3 font-medium text-[var(--color-text-primary)]">
                  Konu
                </th>
                <th className="p-3 font-medium text-[var(--color-text-primary)]">
                  Mesaj önizleme
                </th>
                <th className="p-3 font-medium text-[var(--color-text-primary)] w-24">
                  Durum
                </th>
                <th className="p-3 font-medium text-[var(--color-text-primary)] w-28">
                  Tarih
                </th>
                <th className="p-3 font-medium text-[var(--color-text-primary)] w-24">
                  İşlem
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  className="border-b border-[var(--color-border)] last:border-0"
                >
                  <td className="p-3">
                    <div className="font-medium text-[var(--color-text-primary)]">
                      {msg.name}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] truncate max-w-[180px]">
                      {msg.email}
                    </div>
                  </td>
                  <td className="p-3 text-[var(--color-text-secondary)] truncate max-w-[140px]">
                    {msg.subject || "—"}
                  </td>
                  <td className="p-3 text-[var(--color-text-secondary)] max-w-[200px]">
                    {messagePreview(msg.message)}
                  </td>
                  <td className="p-3">
                    <Badge variant={statusBadgeVariant(msg.status)}>
                      {statusLabel(msg.status)}
                    </Badge>
                  </td>
                  <td className="p-3 text-[var(--color-text-muted)] text-xs">
                    {new Date(msg.created_at).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="p-3">
                    <Button as="link" href={`/admin/mesajlar/${msg.id}`} variant="outline" size="sm">
                      Görüntüle
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminDataTable>
      )}
    </>
  );
}
