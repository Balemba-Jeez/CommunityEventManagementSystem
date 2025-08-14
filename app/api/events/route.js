import db from "@/lib/db";
import { isAuthenticated, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";




export async function POST(req) {
    try {
        // Get token from request header
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1]; // Bearer <token>

        // Request Authentication
        const auth = isAuthenticated(token);
        if (!auth.ok) return auth.response;

        const user = auth.user;

        // Request Authorization
        if (!isAuthorized(user, ['zone_event_manager', 'general_event_manager'])) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const { title, description = null, location, start_time, category_id = null, status = 'draft', image_url = null, } = await req.json();

        // Body Check - Required fields
        if (!title || !location || !start_time) {
            return NextResponse.json({ 
                message: "Bad request: title, location, start_time are required" 
            }, { status: 400 });
        }

        // Check if category exists (if category_id is provided) for that user
        if (category_id) {
            const [existingCategory] = await db.execute(
                "SELECT id FROM categories WHERE id = ? and user_id = ?", 
                [category_id, user.id]
            );

            if (existingCategory.length === 0) { 
                return NextResponse.json(
                    {
                        error: "Category not found or Unauthorized",
                        message: `Category ${category_id} not found or does not exist for user`
                    },
                    { status: 403 } // 403 Unathorized (not 409 Conflict)
                );
            }
        }

        //Check for duplicate events (same title, location, and start_time)
        const [existingEvent] = await db.execute(
            "SELECT id FROM events WHERE title = ? AND location = ? AND start_time = ?",
            [title, location, start_time]
        );

        if (existingEvent.length > 0) {
            return NextResponse.json(
                {
                    error: "Event already exists",
                    message: `An event with the same title, location, and start time already exists`
                },
                { status: 409 } // 409 Conflict
            );
        }

        // Insert new event
        const [result] = await db.execute(
            "INSERT INTO events (title, description, location, start_time, organizer_id, category_id, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                title, 
                description, 
                location, 
                start_time, 
                user.id, 
                category_id, 
                image_url, 
                status 
            ]
        );

        return NextResponse.json(
            { 
                message: "Event created successfully", 
                event: result.insertId 
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}