import { NextResponse } from "next/server";
import { getCv, saveCv } from "@/lib/cv";
import type { CVUpdate } from "@/lib/types/cv";
import { z } from "zod";

const skillLevelSchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
  "expert",
]);

const educationSchema = z.object({
  id: z.string(),
  school: z.string(),
  degree: z.string(),
  field: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  description: z.string().optional(),
});

const experienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  description: z.string(),
});

const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: skillLevelSchema.optional(),
});

const certificateSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  url: z.string().optional(),
});

const languageSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.string(),
});

const putSchema = z.object({
  name: z.string().min(1, "Ad gerekli"),
  surname: z.string().min(1, "Soyad gerekli"),
  email: z.string().min(1, "E-posta gerekli").email("Geçerli e-posta girin"),
  phone: z.string().optional(),
  location: z.string().optional(),
  summary: z.string().optional(),
  photo_url: z.string().optional(),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional(),
  skills: z.array(skillSchema).optional(),
  certificates: z.array(certificateSchema).optional(),
  languages: z.array(languageSchema).optional(),
  additional: z.string().optional(),
});

export async function GET() {
  try {
    const cv = await getCv();
    return NextResponse.json(cv ?? null);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "CV verisi yüklenemedi" },
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

    const updates: CVUpdate = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone ?? "",
      location: data.location ?? "",
      summary: data.summary ?? "",
      photo_url: data.photo_url ?? "",
      education: data.education ?? [],
      experience: data.experience ?? [],
      skills: data.skills ?? [],
      certificates: data.certificates ?? [],
      languages: data.languages ?? [],
      additional: data.additional ?? "",
    };

    const cv = await saveCv(updates);
    return NextResponse.json(cv);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "CV güncellenemedi" },
      { status: 500 }
    );
  }
}
