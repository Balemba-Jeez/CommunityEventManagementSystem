import db from "@/lib/db";
import { isAuthenticated, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";

// PATCH /api/events/:eventId/properties
export async function PATCH(req, { params }) {
    try {
        const { eventId } = params;

        // Get token from request header
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1]; // Bearer <token>

        // Authentication
        const auth = isAuthenticated(token);
        if (!auth.ok) return auth.response;
        const user = auth.user;

        // Ensure user owns this event (or has admin role)
        const [[event]] = await db.execute(
            `SELECT * FROM events WHERE id = ?`,
            [eventId]
        );
        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }
        if (event.organizer_id !== user.id && !isAuthorized(user, ['general_event_manager'])) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        // Parse incoming properties
        const body = await req.json();
        const properties = body.properties || [];

        if (!Array.isArray(properties) || properties.length === 0) {
            return NextResponse.json({ message: "No properties to update" }, { status: 400 });
        }

        // Validate that each property belongs to this event's category
        const [validProps] = await db.execute(
            `SELECT id FROM category_properties WHERE category_id = ?`,
            [event.category_id]
        );
        const validPropIds = validProps.map(p => p.id);

        for (const prop of properties) {
            if (!validPropIds.includes(prop.property_id)) {
                return NextResponse.json({
                    message: `Property ID ${prop.property_id} is invalid for this category`
                }, { status: 400 });
            }
        }

        // Update or insert values
        for (const prop of properties) {
            const [existing] = await db.execute(
                `SELECT id FROM property_values WHERE event_id = ? AND property_id = ?`,
                [eventId, prop.property_id]
            );

            if (existing.length > 0) {
                // Update
                await db.execute(
                    `UPDATE property_values SET value = ?, updated_at = CURRENT_TIMESTAMP
                     WHERE event_id = ? AND property_id = ?`,
                    [prop.value, eventId, prop.property_id]
                );
            } else {
                // Insert
                await db.execute(
                    `INSERT INTO property_values (event_id, property_id, value) VALUES (?, ?, ?)`,
                    [eventId, prop.property_id, prop.value]
                );
            }
        }

        return NextResponse.json({ message: "Property values updated successfully" }, { status: 200 });

    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
