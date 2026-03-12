import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { CvPdfDocument } from "@/components/features/cv/CvPdfDocument";
import { DEFAULT_CV } from "@/lib/types/cv";
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

const cvBodySchema = z.object({
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

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = cvBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Geçersiz CV verisi", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = {
      ...DEFAULT_CV,
      ...parsed.data,
      education: parsed.data.education ?? [],
      experience: parsed.data.experience ?? [],
      skills: parsed.data.skills ?? [],
      certificates: parsed.data.certificates ?? [],
      languages: parsed.data.languages ?? [],
    };
    const doc = React.createElement(CvPdfDocument, { data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- renderToBuffer expects Document root; CvPdfDocument renders Document
    const buffer = await renderToBuffer(doc as any);
    const filename =
      parsed.data.name && parsed.data.surname
        ? `${slug(parsed.data.name)}-${slug(parsed.data.surname)}-cv.pdf`
        : "cv.pdf";
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(buffer.length),
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "PDF oluşturulamadı" },
      { status: 500 }
    );
  }
}
