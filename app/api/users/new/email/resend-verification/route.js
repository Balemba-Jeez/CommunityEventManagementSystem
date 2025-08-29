// app/api/auth/resend-verification/route.js
import db from "@/lib/db";
import { NextResponse } from "next/server";
import generateCode from "@/lib/security/generateCode";
import mailer from "@/lib/mail";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Mark all old codes for this email as used
    await db.query(
      "UPDATE email_verifications SET used = 1 WHERE email = ? AND used = 0",
      [email]
    );

    // Generate new code
    const code = generateCode("email_verification");

    // Set expiry time
    const expiresAt = getExpirationTime("email_verification");

    // Insert new verification code
    await db.query(
      "INSERT INTO email_verifications (email, code, expires_at, used) VALUES (?, ?, ?, 0)",
      [email, code, expiresAt]
    );

    // Send verification code by email
    await mailer.resendVerificationEmail(email, code, 1);

    return NextResponse.json({ message: "Verification code resent" });
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
