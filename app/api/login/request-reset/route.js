import crypto from "crypto";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { sendResetPasswordEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";
import generateCode from "@/lib/security/generateCode";
import getExpirationTime from "@/lib/security/generateCodeTimeFrame";
import mailer from "@/lib/mail";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Find user by email
    const [users] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      // respond with same message to avoid leaking info
      return NextResponse.json({ message: "If that email exists, a code was sent" });
    }

    const user = users[0];

    // Generate 6-digit code
    const code = generateCode("password_reset");

    console.log(code)

    // Hash the code before saving
    const hashedCode = await bcrypt.hash(code, 10);

    // Set expiry time for reset_password (purpose = reset_password)
    const expiry = getExpirationTime("password_reset");

    await db.execute(
    "INSERT INTO password_resets (user_id, reset_code, expires_at) VALUES (?, ?, ?)",
    [user.id, hashedCode, expiry]
    );

    // Send email with the plain code
    await mailer.sendResetPasswordEmail(email, code);

    return NextResponse.json({ message: "If that email exists, a code was sent" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
