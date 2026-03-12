/**
 * Contact message type — Supabase contact_messages table row.
 * Use snake_case to match DB.
 */
export type ContactMessageStatus = "new" | "read" | "replied";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  reply_text: string;
  replied_at: string | null;
  created_at: string;
}

export type ContactMessageInsert = Omit<
  ContactMessage,
  "id" | "status" | "reply_text" | "replied_at" | "created_at"
> & {
  id?: string;
  status?: ContactMessageStatus;
  reply_text?: string;
  replied_at?: string | null;
  created_at?: string;
};

export type ContactMessageUpdate = Partial<{
  status: ContactMessageStatus;
  reply_text: string;
  replied_at: string | null;
}>;
