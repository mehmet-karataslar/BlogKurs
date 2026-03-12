import { NextResponse } from "next/server";
import { getMessages } from "@/lib/contact";

export async function GET() {
  try {
    const messages = await getMessages();
    return NextResponse.json(messages);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Mesajlar yüklenemedi" },
      { status: 500 }
    );
  }
}
