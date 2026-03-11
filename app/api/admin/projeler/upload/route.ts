import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const BUCKET = "project-covers";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") ?? formData.get("cover");
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Dosya gerekli (file veya cover)" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Sadece JPEG, PNG veya WebP yüklenebilir" },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Dosya en fazla 5 MB olabilir" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();
    const ext = file.name.split(".").pop() || "jpg";
    const name = `${crypto.randomUUID()}.${ext}`;

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(name, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Yükleme başarısız" },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(data.path);
    return NextResponse.json({ url: urlData.publicUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Yükleme hatası" },
      { status: 500 }
    );
  }
}
