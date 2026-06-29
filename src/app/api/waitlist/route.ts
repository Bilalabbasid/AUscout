import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rateLimit";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { full_name, email, phone, role, leagues, message, consent } = body;

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    // Basic server-side validation
    if (!full_name || !email || !phone || !role || !consent) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { error } = await supabaseAdmin.from("waitlist").insert({
      full_name: full_name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      role,
      leagues: leagues || [],
      message: (message || "").trim(),
      consent,
    });

    if (error) {
      // Duplicate email — treat as success
      if (error.code === "23505") {
        return NextResponse.json({ success: true, duplicate: true });
      }
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { message: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Send notification email via Resend (non-blocking — don't fail the signup)
    if (resend && process.env.NOTIFY_EMAIL_TO && process.env.NOTIFY_EMAIL_FROM) {
      try {
        await resend.emails.send({
          from: process.env.NOTIFY_EMAIL_FROM,
          to: process.env.NOTIFY_EMAIL_TO,
          subject: `🏀 New waitlist signup: ${full_name.trim()}`,
          html: `
            <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; background: #0C0D10; color: #FFFFFF; border-radius: 16px;">
              <h2 style="margin: 0 0 24px; font-size: 20px; color: #FF5A1F;">New Waitlist Signup</h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px 0; color: #9CA0AB;">Name</td><td style="padding: 8px 0;">${full_name.trim()}</td></tr>
                <tr><td style="padding: 8px 0; color: #9CA0AB;">Email</td><td style="padding: 8px 0;"><a href="mailto:${normalizedEmail}" style="color: #FF5A1F;">${normalizedEmail}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #9CA0AB;">Phone</td><td style="padding: 8px 0;">${phone.trim()}</td></tr>
                <tr><td style="padding: 8px 0; color: #9CA0AB;">Role</td><td style="padding: 8px 0;">${role}</td></tr>
                <tr><td style="padding: 8px 0; color: #9CA0AB;">Leagues</td><td style="padding: 8px 0;">${(leagues || []).join(", ") || "—"}</td></tr>
                ${message ? `<tr><td style="padding: 8px 0; color: #9CA0AB;">Message</td><td style="padding: 8px 0;">${message.trim()}</td></tr>` : ""}
              </table>
              <hr style="border: none; border-top: 1px solid #1E2130; margin: 24px 0;" />
              <p style="margin: 0; font-size: 12px; color: #5B6472;">Scout AU Waitlist · ${new Date().toISOString()}</p>
            </div>
          `,
        });
      } catch (emailErr) {
        // Log but don't fail the signup
        console.error("Resend notification error:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
