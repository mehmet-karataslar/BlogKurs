import { NextResponse } from "next/server";
import {
  getProjectBySlug,
  updateProject,
  deleteProject,
  isSlugTaken,
} from "@/lib/projects";
import { createServerSupabase } from "@/lib/supabase/server";
import type { ProjectUpdate } from "@/lib/types/project";
import { z } from "zod";

const relatedLinkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

const updateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  cover_image_url: z.string().nullable().optional(),
  content: z.string().optional(),
  github_url: z.string().nullable().optional(),
  live_demo_url: z.string().nullable().optional(),
  related_links: z.array(relatedLinkSchema).optional(),
  published: z.boolean().optional(),
  featured_on_homepage: z.boolean().optional(),
  homepage_order: z.number().optional(),
});

function getPathFromStorageUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const match = u.pathname.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

const BUCKET = "project-covers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const project = await getProjectBySlug(slug, false);
    if (!project) {
      return NextResponse.json(
        { error: "Proje bulunamadı" },
        { status: 404 }
      );
    }
    return NextResponse.json(project);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Proje yüklenemedi" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const currentSlug = (await params).slug;
  try {
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const existing = await getProjectBySlug(currentSlug, false);
    if (!existing) {
      return NextResponse.json(
        { error: "Proje bulunamadı" },
        { status: 404 }
      );
    }

    if (data.slug !== undefined && data.slug !== currentSlug) {
      const taken = await isSlugTaken(data.slug, existing.id);
      if (taken) {
        return NextResponse.json(
          { error: "Bu slug zaten kullanılıyor" },
          { status: 409 }
        );
      }
    }

    const updates: ProjectUpdate = { ...data };
    const project = await updateProject(currentSlug, updates);
    return NextResponse.json(project);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Proje güncellenemedi" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  try {
    const project = await getProjectBySlug(slug, false);
    if (!project) {
      return NextResponse.json(
        { error: "Proje bulunamadı" },
        { status: 404 }
      );
    }

    if (project.cover_image_url) {
      const filePath = getPathFromStorageUrl(project.cover_image_url);
      if (filePath) {
        const supabase = createServerSupabase();
        await supabase.storage.from(BUCKET).remove([filePath]);
      }
    }

    await deleteProject(slug);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Proje silinemedi" },
      { status: 500 }
    );
  }
}
