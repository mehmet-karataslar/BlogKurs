import { NextResponse } from "next/server";
import {
  getPostBySlug,
  updatePost,
  deletePost,
  isSlugTaken,
} from "@/lib/blog";
import { createServerSupabase } from "@/lib/supabase/server";
import type { PostUpdate } from "@/lib/types/blog";
import { z } from "zod";

// TODO: Add auth check when auth is implemented.

const updateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  cover_image_url: z.string().nullable().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
  featured_on_homepage: z.boolean().optional(),
  homepage_order: z.number().optional(),
  reading_time_minutes: z.number().optional(),
  category: z.string().nullable().optional(),
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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug, false);
    if (!post) {
      return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Yazı yüklenemedi" },
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

    const existing = await getPostBySlug(currentSlug, false);
    if (!existing) {
      return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });
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

    const updates: PostUpdate = { ...data };
    const post = await updatePost(currentSlug, updates);
    return NextResponse.json(post);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Yazı güncellenemedi" },
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
    const post = await getPostBySlug(slug, false);
    if (!post) {
      return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });
    }

    const bucket = "blog-covers";
    if (post.cover_image_url) {
      const filePath = getPathFromStorageUrl(post.cover_image_url);
      if (filePath) {
        const supabase = createServerSupabase();
        await supabase.storage.from(bucket).remove([filePath]);
      }
    }

    await deletePost(slug);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Yazı silinemedi" },
      { status: 500 }
    );
  }
}
