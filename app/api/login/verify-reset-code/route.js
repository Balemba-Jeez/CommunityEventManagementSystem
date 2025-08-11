import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/lib/db";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET; 

export async function POST(req) {
  try {
    const { email, code } = await req.json();


    // Find user by email
    const [users] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      // Always respond with same message to avoid leaking info
      return NextResponse.json({ message: "No valid reset code found" }, { status: 400 });
    }

    const user = users[0];

    const [latestCodes] = await db.execute(
    "SELECT * FROM password_resets WHERE user_id = ? ORDER BY version DESC LIMIT 1",
    [user.id]
    );

    if (latestCodes.length === 0) {
    return NextResponse.json({ error: "No valid reset code found" }, { status: 400 });
    }

    const latestCode = latestCodes[0];

    const isValid = await bcrypt.compare(code, latestCode.reset_code);
    if (!isValid) {
    return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
    }
    // Create JWT token for password reset (expires in 10 mins)
    const token = jwt.sign(
      { userId: user.id, purpose: "password_reset" },
      JWT_SECRET,
      { expiresIn: "10m" }
    );

    return NextResponse.json({ message: "Code verified", token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
