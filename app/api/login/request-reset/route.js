import crypto from "crypto";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { sendResetPasswordEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";
import generateCode from "@/lib/generateCode";


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
    const code = generateCode(6);

    // Hash the code before saving
    const hashedCode = await bcrypt.hash(code, 10);

    // Set expiry time (e.g., 10 minutes from now)
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    const [latest] = await db.execute(
    "SELECT MAX(version) as maxVersion FROM password_resets WHERE user_id = ?",
    [user.id]
    );

    const newVersion = (latest[0].maxVersion || 0) + 1;

    await db.execute(
    "INSERT INTO password_resets (user_id, reset_code, expires_at, version) VALUES (?, ?, ?, ?)",
    [user.id, hashedCode, expiry, newVersion]
    );

    // Send email with the plain code
    await sendResetPasswordEmail(email, code);

    return NextResponse.json({ message: "If that email exists, a code was sent" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
