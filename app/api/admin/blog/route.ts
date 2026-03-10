import { NextResponse } from "next/server";
import { getPosts, createPost, isSlugTaken } from "@/lib/blog";
import type { PostInsert } from "@/lib/types/blog";
import { z } from "zod";

// TODO: Add auth check when auth is implemented (e.g. ADMIN_SECRET or session).

const createSchema = z.object({
  slug: z.string().min(1, "Slug gerekli"),
  title: z.string().min(1, "Başlık gerekli"),
  excerpt: z.string(),
  cover_image_url: z.string().nullable().optional(),
  content: z.string(),
  published: z.boolean().optional(),
  featured_on_homepage: z.boolean().optional(),
  homepage_order: z.number().optional(),
  reading_time_minutes: z.number().optional(),
  category: z.string().nullable().optional(),
});

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Yazılar yüklenemedi" },
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

    const insert: PostInsert = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt ?? "",
      cover_image_url: data.cover_image_url ?? null,
      content: data.content ?? "",
      published: data.published ?? false,
      featured_on_homepage: data.featured_on_homepage ?? false,
      homepage_order: data.homepage_order ?? 0,
      reading_time_minutes: data.reading_time_minutes ?? 5,
      category: data.category ?? null,
      view_count: 0,
      like_count: 0,
    };
    const post = await createPost(insert);
    return NextResponse.json(post);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Yazı oluşturulamadı" },
      { status: 500 }
    );
  }
}
