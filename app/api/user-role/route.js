import db from "@/lib/db";
import { isAuthenticated, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Get token from request header
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  // Check if user is authenticated
  const auth = isAuthenticated(token);
  if (!auth.ok) return auth.response;

  const user = auth.user;

  // Check if user is authorized (must be 'admin')
  if (!isAuthorized(user, ['admin'])) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { userId, roleId } = await req.json();

  if (userId == null || roleId == null) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  const [result] = await db.execute(
    "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
    [userId, roleId]
  );

  return NextResponse.json(
    { message: "Role assigned successfully", user_roleId: result.insertId },
    { status: 201 }
  );
}
