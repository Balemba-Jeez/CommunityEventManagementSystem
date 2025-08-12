// app/api/login/reset-password/route.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token, newPassword } = await req.json();


        // Get token from request header
      const authHeader = req.headers.get("authorization");
      const token = authHeader?.split(" ")[1]; // Bearer <token>
    
      // Request Authentication
      const auth = isAuthenticated(token);
      if (!auth.ok) return auth.response;
    
      const user = auth.user;
      console.log('User authenticated:', user);

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
