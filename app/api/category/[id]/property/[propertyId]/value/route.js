import db from "@/lib/db";
import { isAuthenticated, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
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

        const { searchParams } = new URL(req.url);
        const event_id = searchParams.get('event_id');
        const { propertyId:property_id } = await params;
        const { id } = await params;


        // Check - Required fields
        if (!event_id || !property_id || !id) {
            return NextResponse.json({
                message: "Bad request: event_id, property_id and value are required"
            }, { status: 400 });
        }


    // Check if category exists
      const [existingCategory] = await db.execute(
        "SELECT id FROM categories WHERE id = ?",
        [id]
    );
    if (existingCategory.length === 0) {
        return NextResponse.json(
            {
                error: "Category not found",
                message: `Category with ID '${id}' does not exist`
            },
            { status: 404 }
        );
    }

    console.log(id, user.zone, user.id);

      // Check if category exists for that user or user has that category
      let zoneCondition = user.zone === null ? 'c.zone_id IS NULL' : 'c.zone_id = ?';
      let values = user.zone === null ? [id, user.id] : [id, user.zone, user.id];

      const [existingUserCategory] = await db.execute(
        `SELECT * FROM categories c JOIN category_properties p ON c.id = p.category_id WHERE c.id = ? AND ${zoneCondition} AND c.user_id = ?`,
        values
    );
    if (existingUserCategory.length === 0) {
        return NextResponse.json(
            {
                error: "Category does not exist for user",
                message: `Category with ID '${id}' does not exist for user`
            },
            { status: 403 }
        );
    }

      // Check if specific property exists for category
      let mainQueryValues = user.zone === null ? [id, user.id, property_id] : [id, user.zone, user.id, property_id];
    
      // Fetch all Category properties for a paricular zone_event manager or general _event_manager.
    
      const [rows] = await db.execute(`SELECT p.* FROM categories c JOIN category_properties p ON c.id = p.category_id WHERE c.id = ? AND ${zoneCondition} AND c.user_id = ? AND p.id = ?`, mainQueryValues);
    
      console.log('rows', rows);
    
      if (rows.length === 0) {
        return NextResponse.json(
            { error: `Property ${property_id} not found for Category ${id}` }, 
            { status: 404 }
        );
        }

        // Check if event exists
        const [existingEvent] = await db.execute(
            "SELECT id FROM events WHERE id = ?",
            [event_id]
        );
        if (existingEvent.length === 0) {
            return NextResponse.json(
                {
                    error: "Event not found",
                    message: `Event with ID '${event_id}' does not exist`
                },
                { status: 404 }
            );
        }

        // Check if event exists for that user or user has that event

      const [existingUserEvent] = await db.execute(
        `SELECT * FROM users u JOIN events e ON u.id = e.organizer_id WHERE e.id = ? AND u.id = ?`,
        [event_id, user.id]
    );
    if (existingUserEvent.length === 0) {
        return NextResponse.json(
            {
                error: "Event does not exist for user",
                message: `Event with ID '${event_id}' does not exist for user`
            },
            { status: 403 }
        );
    }

    // Fetch all values for a property related to an event for a paricular zone_event manager or general _event_manager.

    const [rows_] = await db.execute(`SELECT * FROM property_values WHERE event_id = ? and property_id = ?`, [event_id,property_id]);

    console.log('property values', rows_);

    if (rows_.length === 0) {
        return NextResponse.json(
            { error: `Values not found for Property ${property_id}, Event ${event_id}` }, 
            { status: 404 }
        );
        }

        return NextResponse.json(
            {
                message: "Property values found successfully",
                values: rows_
            },
            { status: 200 }
        );

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

        const { event_id, property_id, value } = await req.json();

        // Body Check - Required fields
        if (!event_id || !property_id || !value) {
            return NextResponse.json({
                message: "Bad request: event_id, property_id and value are required"
            }, { status: 400 });
        }

        // Check if event exists
        const [existingEvent] = await db.execute(
            "SELECT id FROM events WHERE id = ?",
            [event_id]
        );
        if (existingEvent.length === 0) {
            return NextResponse.json(
                {
                    error: "Event not found",
                    message: `Event with ID '${event_id}' does not exist`
                },
                { status: 404 }
            );
        }

        // Check if property exists
        const [existingProperty] = await db.execute(
            "SELECT id, data_type, max_values FROM category_properties WHERE id = ?",
            [property_id]
        );
        if (existingProperty.length === 0) {
            return NextResponse.json(
                {
                    error: "Property not found",
                    message: `Property with ID '${property_id}' does not exist`
                },
                { status: 404 }
            );
        }

        // Validate value based on data_type
        const dataType = existingProperty[0].data_type;
        const maxValues = existingProperty[0].max_values || 1;
        if (value !== null && value !== undefined) {
            switch (dataType) {
                case 'int':
                    if (!Number.isInteger(Number(value)) || isNaN(Number(value))) {
                        return NextResponse.json({
                            message: `Bad request: value must be an integer for data_type 'int'`
                        }, { status: 400 });
                    }
                    break;
                case 'boolean':
                    if (typeof value !== 'boolean' && value !== 'true' && value !== 'false') {
                        return NextResponse.json({
                            message: `Bad request: value must be boolean (true/false) for data_type 'boolean'`
                        }, { status: 400 });
                    }
                    break;
                case 'date':
                    if (isNaN(Date.parse(value))) {
                        return NextResponse.json({
                            message: `Bad request: value must be a valid date for data_type 'date'`
                        }, { status: 400 });
                    }
                    break;
                // 'string' type accepts any value
            }
        }

        // Check if max_values limit is reached for this event-property combination
        const [existingValues] = await db.execute(
            "SELECT COUNT(*) as count FROM property_values WHERE event_id = ? AND property_id = ?",
            [event_id, property_id]
        );
        
        const currentCount = existingValues[0].count;
        if (currentCount >= maxValues) {
            return NextResponse.json(
                {
                    error: "Maximum values exceeded",
                    message: `This property allows maximum ${maxValues} value(s) per event. Current count: ${currentCount}`
                },
                { status: 409 } // 409 Conflict
            );
        }

        // Check for duplicate value (same event, property, and value)
        if (value !== null && value !== undefined) {
            const [duplicateValue] = await db.execute(
                "SELECT id FROM property_values WHERE event_id = ? AND property_id = ? AND value = ?",
                [event_id, property_id, value]
            );
            if (duplicateValue.length > 0) {
                return NextResponse.json(
                    {
                        error: "Duplicate value",
                        message: `This value already exists for this event and property`
                    },
                    { status: 409 } // 409 Conflict
                );
            }
        }

        // Insert new property value
        const [result] = await db.execute(
            "INSERT INTO property_values (event_id, property_id, value) VALUES (?, ?, ?)",
            [
                event_id,
                property_id,
                value
            ]
        );

        return NextResponse.json(
            {
                message: "Property value created successfully",
                valueId: result.insertId
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}