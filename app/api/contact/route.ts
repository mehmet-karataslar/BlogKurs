import { NextResponse } from "next/server";
import { createMessage } from "@/lib/contact";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Ad gerekli"),
  email: z.string().min(1, "E-posta gerekli").email("Geçerli bir e-posta girin"),
  subject: z.string().optional().default(""),
  message: z.string().min(1, "Mesaj gerekli"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const msg =
        first.name?.[0] ?? first.email?.[0] ?? first.message?.[0] ?? "Geçersiz veri";
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    const { name, email, subject, message } = parsed.data;
    await createMessage({ name, email, subject: subject ?? "", message });
    return NextResponse.json(
      { message: "Mesajınız alındı, en kısa sürede dönüş yapacağız." },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Mesaj gönderilemedi." },
      { status: 500 }
    );
  }
}
