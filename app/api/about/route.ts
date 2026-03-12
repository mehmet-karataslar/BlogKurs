import { NextResponse } from "next/server";
import { getAbout } from "@/lib/about";

export async function GET() {
  try {
    const about = await getAbout();
    if (!about) {
      return NextResponse.json(null, { status: 200 });
    }
    return NextResponse.json(about);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Hakkımda verisi yüklenemedi" },
      { status: 500 }
    );
  }
}
