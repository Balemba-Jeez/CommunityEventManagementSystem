import db from "@/lib/db";
import { isAuthenticated, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";


export async function GET(req){
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

        let whereClause = '';
        let params = [];

        if (all) {
            // Must have permission to view all events
            
            const roles = user.role.map(r => r.name); // ['visitor', 'member', 'general_event_manager']
            console.log(roles, user.role, user)
            if (!roles.includes('general_event_manager')) {
                return NextResponse.json({ message: "Not authorized for all events" }, { status: 403 });
            }
            whereClause = `WHERE e.status != 'draft'`;
            params
        } else {
            // Only their own events
            whereClause = `WHERE e.organizer_id = ?`;
            params.push(user.id);
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
    `, params);

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