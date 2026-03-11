import { NextResponse } from "next/server";
import { incrementLikeCount } from "@/lib/projects";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    await incrementLikeCount(slug);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Beğeni artırılamadı" },
      { status: 500 }
    );
  }
}
