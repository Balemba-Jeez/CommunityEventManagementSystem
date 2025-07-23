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

        const { title, description, location, start_time, organizer_id, category_id, image_url, status } = await req.json();

        // Body Check - Required fields
        if (!title || !location || !start_time || !organizer_id) {
            return NextResponse.json({ 
                message: "Bad request: title, location, start_time, and organizer_id are required" 
            }, { status: 400 });
        }

        // Check if category exists (if category_id is provided)
        if (category_id) {
            const [existingCategory] = await db.execute(
                "SELECT id FROM categories WHERE id = ?", // Fixed table name case
                [category_id] // Fixed typo: was category_ide
            );

            if (existingCategory.length === 0) { // Fixed: was existingZone
                return NextResponse.json(
                    {
                        error: "Category not found",
                        message: `Category with ID '${category_id}' does not exist`
                    },
                    { status: 404 } // 404 Not Found (not 409 Conflict)
                );
            }
        }

        // Check if organizer exists
        const [existingOrganizer] = await db.execute(
            "SELECT id FROM users WHERE id = ? AND role IN ('zone_event_manager', 'general_event_manager')",
            [organizer_id]
        );

        if (existingOrganizer.length === 0) {
            return NextResponse.json(
                {
                    error: "Organizer not found",
                    message: `Organizer with ID '${organizer_id}' does not exist or is not authorized to organize events`
                },
                { status: 404 }
            );
        }

        // Optional: Check for duplicate events (same title, location, and start_time)
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
                description || null, // Optional field
                location, 
                start_time, 
                organizer_id, 
                category_id || null, // Optional field
                image_url || null, // Optional field
                status || 'pending' // Default to 'pending' if not provided
            ]
        );

        return NextResponse.json(
            { 
                message: "Event created successfully", 
                eventId: result.insertId 
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}