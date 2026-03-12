import { NextResponse } from "next/server";
import { getCv } from "@/lib/cv";

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
