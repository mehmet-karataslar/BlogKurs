import { NextResponse } from "next/server";
import { getAbout, saveAbout } from "@/lib/about";
import type { AboutUpdate } from "@/lib/types/about";
import { z } from "zod";

const skillLevelSchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
  "expert",
]);

const schoolSchema = z.object({
  id: z.string(),
  name: z.string(),
  period: z.string(),
  description: z.string().optional(),
});

const certificateSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  url: z.string().optional(),
});

const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: skillLevelSchema.optional(),
});

const putSchema = z.object({
  name: z.string().min(1, "Ad gerekli"),
  surname: z.string().min(1, "Soyad gerekli"),
  tagline: z.string().optional(),
  profile_image_url: z.string().nullable().optional(),
  bio: z.string().optional(),
  schools: z.array(schoolSchema).optional(),
  certificates: z.array(certificateSchema).optional(),
  skills: z.array(skillSchema).optional(),
  technical_info: z.string().optional(),
});

export async function GET() {
  try {
    const about = await getAbout();
    return NextResponse.json(about ?? null);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Hakkımda verisi yüklenemedi" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsed = putSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const updates: AboutUpdate = {
      name: data.name,
      surname: data.surname,
      tagline: data.tagline ?? "",
      profile_image_url: data.profile_image_url ?? null,
      bio: data.bio ?? "",
      schools: data.schools ?? [],
      certificates: data.certificates ?? [],
      skills: data.skills ?? [],
      technical_info: data.technical_info ?? "",
    };

    const about = await saveAbout(updates);
    return NextResponse.json(about);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Hakkımda güncellenemedi" },
      { status: 500 }
    );
  }
}
