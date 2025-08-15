import db from "@/lib/db";
import { isAuthenticated, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";


export async function GET(req, { params: routeParams }){
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

        // Parse query parameter
        const { searchParams } = new URL(req.url);
        const all = searchParams.get("all") === "true";
        const { eventId } = routeParams;
        

        let whereClause = '';
        let sqlParams = [];

        if (all) {
            // Must have permission to view all events
            
            const roles = user.role.map(r => r.name); // ['visitor', 'member', 'general_event_manager']
            console.log(roles, user.role, user)
            if (!roles.includes('general_event_manager')) {
                return NextResponse.json({ message: "Not authorized for all events" }, { status: 403 });
            }
            whereClause = `WHERE e.status != 'draft' AND e.id = ?`;
            sqlParams.push(eventId);
        } else {
            // Only their own events
            whereClause = `WHERE e.organizer_id = ? AND e.id = ?`;
            sqlParams.push(user.id, eventId);
        }

        // Get mapping category → events + properties
    const [categoryMap] = await db.execute(`
      SELECT 
        c.id AS category_type, 
        GROUP_CONCAT(DISTINCT e.id ORDER BY e.id SEPARATOR ',') AS events, 
        GROUP_CONCAT(DISTINCT p.id ORDER BY p.id SEPARATOR ',') AS properties
      FROM events e
      LEFT JOIN categories c ON c.id = e.category_id
      LEFT JOIN category_properties p ON c.id = p.category_id
      ${whereClause}
      GROUP BY c.id
    `, sqlParams);

    if (categoryMap.length === 0) {
      return NextResponse.json({ message: "No events found" }, { status: 404 });
    }

    // Fetch full event details and category-specific properties
    let fullEvents = [];

    for (const row of categoryMap) {
      const eventIds = row.events.split(",");
      const propertyIds = row.properties ? row.properties.split(",") : [];

      // Get general event data
      const [eventsData] = await db.execute(
        `SELECT * FROM events WHERE id IN (${eventIds.map(() => "?").join(",")}) ORDER BY updated_at DESC`,
        eventIds
      );

      // Get property details if any
      let propertiesData = [];
      if (propertyIds.length > 0) {
        [propertiesData] = await db.execute(
          `SELECT * FROM category_properties WHERE id IN (${propertyIds.map(() => "?").join(",")})`,
          propertyIds
        );
      }

      // Merge general + category-specific
        for (let ev of eventsData) {
            let propertiesWithValues = [];

            if (propertyIds.length > 0) {
                // Get properties
                const [propertiesData] = await db.execute(
                `SELECT * FROM category_properties WHERE id IN (${propertyIds.map(() => "?").join(",")})`,
                propertyIds
                );

                // Get all property_values for this event
                const [valuesData] = await db.execute(
                `SELECT * FROM property_values WHERE event_id = ? AND property_id IN (${propertyIds.map(() => "?").join(",")})`,
                [ev.id, ...propertyIds]
                );

                // Map values to their property
                propertiesWithValues = propertiesData.map(p => ({
                ...p,
                property_values: valuesData
                    .filter(v => v.property_id === p.id)
                    .map(v => ({ id: v.id, value: v.value }))
                }));
            }

            fullEvents.push({
                ...ev,
                category_type: row.category_type,
                category_properties: propertiesWithValues
            });
        }
    }

    return NextResponse.json({ events: fullEvents }, { status: 200 });

    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}


export async function PATCH(req, { params: routeParams }) {
    try {
        // Auth
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1];
        const auth = isAuthenticated(token);
        if (!auth.ok) return auth.response;

        const user = auth.user;
        const { eventId } = routeParams;
        const body = await req.json();

        // Find the event
        const [events] = await db.execute(
            `SELECT * FROM events WHERE id = ?`,
            [eventId]
        );
        if (events.length === 0) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }
        const event = events[0];

        // Permission check: only their own events
        if (event.organizer_id !== user.id) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        // Allowed fields for general event updates
        const allowedFields = [
            "title",
            "description",
            "location",
            "start_time",
            "image_url",
            "status",
            "category_id"
        ];

        // Build update dynamically
        const updates = [];
        const values = [];
        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                updates.push(`${field} = ?`);
                values.push(body[field]);
            }
        }

        if (updates.length === 0) {
            return NextResponse.json({ message: "No valid fields to update" }, { status: 400 });
        }

        // Add event ID for WHERE clause
        values.push(eventId);

        // Update event
        await db.execute(
            `UPDATE events SET ${updates.join(", ")}, updated_at = NOW() WHERE id = ?`,
            values
        );

        return NextResponse.json({ message: "Event updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("PUT route error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
}


export async function DELETE(req, { params: routeParams }) {
    try {
        // Auth
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1];
        const auth = isAuthenticated(token);
        if (!auth.ok) return auth.response;

        const user = auth.user;
        const { eventId } = routeParams;

        // Find the event
        const [events] = await db.execute(
            `SELECT * FROM events WHERE id = ?`,
            [eventId]
        );
        if (events.length === 0) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }
        const event = events[0];

        // Permission check: only their own events
        if (event.organizer_id !== user.id) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        // Delete property values first
        await db.execute(
            `DELETE FROM property_values WHERE event_id = ?`,
            [eventId]
        );

        // Delete the event
        await db.execute(
            `DELETE FROM events WHERE id = ?`,
            [eventId]
        );

        return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete route error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}