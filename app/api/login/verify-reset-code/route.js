import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/lib/db";
import { NextResponse } from "next/server"; 
import { generateTokenV2 } from "@/lib/security/token";
import { markResetCodeUsed } from "@/lib/security/generateCode";

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

    console.log(user)

    // Get the latest valid reset code for the user
    const [latestCodes] = await db.execute(
    "SELECT * FROM password_resets WHERE user_id = ? AND created_at = (SELECT MAX(created_at) FROM password_resets) AND used_at IS NULL",
    [user.id]
    );

    if (latestCodes.length === 0) {
    return NextResponse.json({ error: "No valid reset code found" }, { status: 400 });
    }

    const latestCode = latestCodes[0];

    
    // Verify the reset code
    const isValid = await bcrypt.compare(code, latestCode.reset_code);
    if (!isValid) {
    return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
    }
    // Mark reset code as used when code verification is done
    await markResetCodeUsed(latestCode.id);

    // Create JWT token for password reset (expires in 10 mins)
    const token = await generateTokenV2(
      "password_reset",
      { userId: user.id, purpose: "password_reset" }
    );

    console.log('verify token',token);


    return NextResponse.json({ message: "Code verified", token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
