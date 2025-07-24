import db from "@/lib/db";
import { isAuthenticated, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const auth = isAuthenticated(token);
    if (!auth.ok) return auth.response;

    const user = auth.user;

    if (!isAuthorized(user, ['zone_event_manager', 'general_event_manager'])) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { name, description = null, image_url = null, zone_id = null, parent_id = null } = await req.json();

    if (!name) {
      return NextResponse.json({ message: "Bad request: name is required" }, { status: 400 });
    }

    // Zone Event Managers must provide a valid zone_id
    if (isAuthorized(user, ['zone_event_manager'])) {
      if (!zone_id) {
        return NextResponse.json({ message: "Bad request: zone_id is required for zone_event_manager" }, { status: 400 });
      }

      // Check if zone exist
      const [zone] = await db.execute("SELECT id FROM zones WHERE id = ?", [zone_id]);
      if (zone.length === 0) {
        return NextResponse.json({ message: `Zone with ID '${zone_id}' does not exist` }, { status: 404 });
      }
    }

    // Check parent category (if provided)
    if (parent_id) {
      const [parent] = await db.execute("SELECT id FROM categories WHERE id = ?", [parent_id]);
      if (parent.length === 0) {
        return NextResponse.json({ message: `Parent category with ID '${parent_id}' does not exist` }, { status: 404 });
      }
    }

    // Ensure unique name
    const [existing] = await db.execute("SELECT id FROM categories WHERE name = ?", [name]);
    if (existing.length > 0) {
      return NextResponse.json({ message: `Category with name '${name}' already exists` }, { status: 409 });
    }

    // Insert
    const [result] = await db.execute(
      "INSERT INTO categories (name, description, image_url, user_id, zone_id, parent_id) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, image_url, user.id, zone_id, parent_id]
    );

    return NextResponse.json({ message: "Category created successfully", categoryId: result.insertId }, { status: 201 });

  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
