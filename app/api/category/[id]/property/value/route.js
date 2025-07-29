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