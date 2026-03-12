import { createServerSupabase } from "@/lib/supabase/server";
import type {
  ContactMessage,
  ContactMessageInsert,
  ContactMessageUpdate,
} from "@/lib/types/contact";

const TABLE = "contact_messages";

/** All contact messages, newest first (for admin list). */
export async function getMessages(): Promise<ContactMessage[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ContactMessage[];
}

/** Single message by id. */
export async function getMessageById(
  id: string
): Promise<ContactMessage | null> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as ContactMessage | null;
}

/** Insert a new contact message (from public form). */
export async function createMessage(
  row: ContactMessageInsert
): Promise<ContactMessage> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      name: row.name,
      email: row.email,
      subject: row.subject ?? "",
      message: row.message,
      status: "new",
    })
    .select()
    .single();
  if (error) throw error;
  return data as ContactMessage;
}

/** Update message (mark read, save reply). */
export async function updateMessage(
  id: string,
  updates: ContactMessageUpdate
): Promise<ContactMessage> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as ContactMessage;
}
