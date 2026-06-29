import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

// Helper function to get base64 encoded token from password (local only, not exported)
function getAdminToken() {
  const secret = process.env.ADMIN_PASSWORD || "fallback-admin-secret-base64";
  return Buffer.from(secret).toString("base64");
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: "Too many attempts. Please try again shortly." },
        { status: 429 }
      );
    }

    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedPassword) {
      return NextResponse.json(
        { message: "Admin portal is not configured (missing ADMIN_PASSWORD env var)." },
        { status: 500 }
      );
    }

    if (password === expectedPassword) {
      const token = getAdminToken();
      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json(
      { message: "Invalid password. Access denied." },
      { status: 401 }
    );
  } catch (err) {
    console.error("Admin auth API error:", err);
    return NextResponse.json(
      { message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
