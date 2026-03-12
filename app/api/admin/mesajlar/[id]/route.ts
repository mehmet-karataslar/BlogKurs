import { NextResponse } from "next/server";
import { getMessageById, updateMessage } from "@/lib/contact";
import { z } from "zod";

const patchSchema = z.object({
  status: z.enum(["new", "read", "replied"]).optional(),
  reply_text: z.string().optional(),
  replied_at: z.string().optional().nullable(),
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const message = await getMessageById(id);
    if (!message) {
      return NextResponse.json({ error: "Mesaj bulunamadı" }, { status: 404 });
    }
    return NextResponse.json(message);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Mesaj yüklenemedi" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const message = await getMessageById(id);
    if (!message) {
      return NextResponse.json({ error: "Mesaj bulunamadı" }, { status: 404 });
    }
    const body = await request.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const updates = parsed.data;
    if (updates.reply_text !== undefined) {
      updates.replied_at = updates.replied_at ?? new Date().toISOString();
      updates.status = "replied";
    }
    const updated = await updateMessage(id, updates);
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Mesaj güncellenemedi" },
      { status: 500 }
    );
  }
}
