// app/api/login/reset-password/route.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token, newPassword } = await req.json();

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await db.execute(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, user.userId]
    );

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
