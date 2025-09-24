// /api/events/member/[id]/route.js
import db from "@/lib/db";
import { isAuthenticatedV2, isAuthorizedV2 } from "@/lib/security/auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id: eventId } = params;

    // --- Authentication ---
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const auth = await isAuthenticatedV2(token);
    if (!auth.ok) return auth.response;

    const user = auth.user;

    // --- Authorization ---
    if (!isAuthorizedV2(user, ["member"])) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    console.log("Fetching event with ID:", eventId, "for user zone:", user.zone);

    // --- Build SQL query to get single event ---
    const query = `
      SELECT 
        e.id,
        e.title,
        e.description,
        e.start_time,
        e.end_time,
        e.location,
        e.image_url,
        e.status,
        e.zone_id,
        e.organizer_id,
        e.live_status,
        e.live_stream_url,
        e.live_playback_url,
        e.live_stream_id,
        e.live_playback_id,
        c.id AS category_id,
        c.name AS category_name,
        c.image_url AS category_image,
        u.name AS organizer_name,
        u.email AS organizer_email,
        z.name AS zone_name
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN users u ON e.organizer_id = u.id
      LEFT JOIN zones z ON e.zone_id = z.id
      WHERE e.id = ? AND e.status != 'draft'
    `;

    const params_array = [eventId];

    console.log("Executing query:", query);
    console.log("With params:", params_array);

    const [events] = await db.execute(query, params_array);

    if (events.length === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const event = events[0];

    // Check access permissions
    // Members can access:
    // 1. Events in their zone
    // 2. Community events (zone_id IS NULL)
    if (event.zone_id !== null && event.zone_id !== user.zone) {
      return NextResponse.json({ message: "Access denied to this event" }, { status: 403 });
    }

    console.log("Found event:", event.title, "in zone:", event.zone_name || "Community");

    return NextResponse.json({ event }, { status: 200 });
    
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}