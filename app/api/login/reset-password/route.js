// app/api/login/reset-password/route.js
import jwt from "jsonwebtoken";
import { isAuthenticatedV2, isAuthorized } from "@/lib/security/auth";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { markTokenUsed } from "@/lib/security/token";

export async function POST(req) {
  try {
    const { newPassword } = await req.json();


        // Validate newPassword exists
    if (!newPassword) {
      return NextResponse.json(
        { error: "New password is required" }, 
        { status: 400 }
      );
    }
        // Get token from request header
      const authHeader = req.headers.get("authorization");
      const token = authHeader?.split(" ")[1]; // Bearer <token>
    
      // Request Authentication
      const auth = isAuthenticatedV2(token);
      if (!auth.ok) return auth.response;
    
      const user = auth.user;
      console.log('User authenticated:', user);

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await db.execute(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, user.userId]
    );

    await markTokenUsed(user.jwtid);

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });


  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
