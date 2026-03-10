import { NextResponse } from "next/server";
import { incrementViewCount } from "@/lib/blog";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    await incrementViewCount(slug);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Görüntülenme artırılamadı" },
      { status: 500 }
    );
  }
}
