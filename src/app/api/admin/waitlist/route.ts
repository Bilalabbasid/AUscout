import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    // Re-create token verification code locally
    const secret = process.env.ADMIN_PASSWORD || "fallback-admin-secret-base64";
    const expectedToken = Buffer.from(secret).toString("base64");

    if (!token || token !== expectedToken) {
      return NextResponse.json(
        { message: "Unauthorized. Access denied." },
        { status: 401 }
      );
    }

    // Fetch entries from Supabase sorted chronologically (latest first)
    const { data: entries, error } = await supabaseAdmin
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase waitlist fetch error:", error);
      return NextResponse.json(
        { message: "Failed to fetch waitlist entries from database." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, entries });
  } catch (err) {
    console.error("Admin waitlist API error:", err);
    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}
