import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(req, { params }) {
  try {
    const { id } = params; // clip ID from URL
    const body = await req.json();
    const { status, content, thumbnail, size, duration } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing clip ID" }, { status: 400 });
    }

    const fields = [];
    const values = [];

    if (status) {
      fields.push("status = ?");
      values.push(status);
    }
    if (content) {
      fields.push("content = ?");
      values.push(content);
    }
    if (thumbnail) {
      fields.push("thumbnail = ?");
      values.push(thumbnail);
    }
    if (size !== undefined) {
      fields.push("size = ?");
      values.push(size);
    }
    if (duration !== undefined) {
      fields.push("duration = ?");
      values.push(duration);
    }

    if (fields.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    values.push(id); // for WHERE clause

    const [result] = await db.execute(
      `UPDATE clips SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating clip:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

