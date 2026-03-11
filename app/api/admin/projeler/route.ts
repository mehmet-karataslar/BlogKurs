import { NextResponse } from "next/server";
import { getProjects, createProject, isSlugTaken } from "@/lib/projects";
import type { ProjectInsert } from "@/lib/types/project";
import { z } from "zod";

const relatedLinkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

const createSchema = z.object({
  slug: z.string().min(1, "Slug gerekli"),
  title: z.string().min(1, "Başlık gerekli"),
  excerpt: z.string(),
  cover_image_url: z.string().nullable().optional(),
  content: z.string(),
  github_url: z.string().nullable().optional(),
  live_demo_url: z.string().nullable().optional(),
  related_links: z.array(relatedLinkSchema).optional(),
  published: z.boolean().optional(),
  featured_on_homepage: z.boolean().optional(),
  homepage_order: z.number().optional(),
});

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Projeler yüklenemedi" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const taken = await isSlugTaken(data.slug);
    if (taken) {
      return NextResponse.json(
        { error: "Bu slug zaten kullanılıyor" },
        { status: 409 }
      );
    }

    const insert: ProjectInsert = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt ?? "",
      cover_image_url: data.cover_image_url ?? null,
      content: data.content ?? "",
      github_url: data.github_url ?? null,
      live_demo_url: data.live_demo_url ?? null,
      related_links: data.related_links ?? [],
      published: data.published ?? false,
      featured_on_homepage: data.featured_on_homepage ?? false,
      homepage_order: data.homepage_order ?? 0,
      view_count: 0,
      like_count: 0,
    };
    const project = await createProject(insert);
    return NextResponse.json(project);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Proje oluşturulamadı" },
      { status: 500 }
    );
  }
}
