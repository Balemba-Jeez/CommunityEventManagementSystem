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
        const { propertyId: property_id } = await params;
        const { valueId: value_id } = await params;
        const { id: category_id} = await params;


        // Check - Required fields
        if (!event_id || !property_id || !category_id || !value_id) {
            return NextResponse.json({
                message: "Bad request: event_id, property_id and category are required"
            }, { status: 400 });
        }

    // Single query check for category existence, ownership by user and event property belongs to category
        const [rows] = await db.execute(
            `SELECT u.id AS user, c.id AS category, e.id AS event, p.id AS property, v.*
             FROM users u
             LEFT JOIN events e ON u.id = e.organizer_id
             LEFT JOIN categories c ON e.category_id = c.id
             LEFT JOIN category_properties p ON p.category_id = c.id
             LEFT JOIN property_values v ON v.property_id = p.id
             WHERE c.id = ? 
               AND p.id = ? 
               AND v.id = ? 
               AND e.id = ? 
               AND u.id = ?`,
            [category_id, property_id, value_id, event_id, user.id]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { error: "Not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Property value found successfully", value: rows[0] },
            { status: 200 }
        );

    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(req, {params}) {
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
        const { propertyId: property_id } = await params;
        const { valueId: value_id } = await params;
        const { id: category_id} = await params;


        // Check - Required fields
        if (!event_id || !property_id || !category_id || !value_id) {
            return NextResponse.json({
                message: "Bad request: event_id, property_id and category are required"
            }, { status: 400 });
        }

    // Single query check for category existence, ownership by user and event property belongs to category
        const [rows] = await db.execute(
            `SELECT u.id AS user, c.id AS category, e.id AS event, p.id AS property, v.*
             FROM users u
             LEFT JOIN events e ON u.id = e.organizer_id
             LEFT JOIN categories c ON e.category_id = c.id
             LEFT JOIN category_properties p ON p.category_id = c.id
             LEFT JOIN property_values v ON v.property_id = p.id
             WHERE c.id = ? 
               AND p.id = ? 
               AND v.id = ? 
               AND e.id = ? 
               AND u.id = ?`,
            [category_id, property_id, value_id, event_id, user.id]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { error: "Category or Property, value or event Not found or unauthorized" },
                { status: 404 }
            );
        }

        //  Get the update data 
        const body = await req.json();

        //  Build the SQL parts
        let sqlParts = [];
        let values = [];

        //  Create updateFields object
        const updateFields = {};
        
        //  Check each valid field - if they sent it, add it
        if (body.value) {
            updateFields.value = body.value;
        }

        //  Make sure they sent at least one field
        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json({ error: 'No valid fields provided' }, { status: 400 });
        }

        //  Add each field to SQL
        if (updateFields.value) {
            sqlParts.push('value = ?');
            values.push(updateFields.value);
        }

        //  Add the ID at the end
        values.push(value_id);

        //  Join SQL parts with commas
        const sqlUpdate = sqlParts.join(', ');

        console.log('sqlUpdate:',sqlUpdate, 'values:', values);

        // Execute update
        const [result] = await db.execute(
            `UPDATE property_values SET ${sqlUpdate} WHERE id = ?`, 
            values
        );


        if (result.changedRows === 0) {
            return NextResponse.json(
                { error: `No changes made. Property Value ${value_id} ${Object.keys(updateFields).join(',')} is already up to date` },
                { status: 200 }
            );
        }

        // Get updated property value
        const [updatedValue] = await db.execute(`SELECT * FROM property_values WHERE id = ?`, [value_id]);

        return NextResponse.json(
            { message: "Property value updated successfully", updatedValue: rows[0] },
            { status: 200 }
        );

    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req, {params}){
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
        const { propertyId: property_id } = await params;
        const { valueId: value_id } = await params;
        const { id: category_id} = await params;


        // Check - Required fields
        if (!event_id || !property_id || !category_id || !value_id) {
            return NextResponse.json({
                message: "Bad request: event_id, property_id and category are required"
            }, { status: 400 });
        }

    // Single query check for category existence, ownership by user and event property belongs to category
        const [rows] = await db.execute(
            `SELECT u.id AS user, c.id AS category, e.id AS event, p.id AS property, v.*
             FROM users u
             LEFT JOIN events e ON u.id = e.organizer_id
             LEFT JOIN categories c ON e.category_id = c.id
             LEFT JOIN category_properties p ON p.category_id = c.id
             LEFT JOIN property_values v ON v.property_id = p.id
             WHERE c.id = ? 
               AND p.id = ? 
               AND v.id = ? 
               AND e.id = ? 
               AND u.id = ?`,
            [category_id, property_id, value_id, event_id, user.id]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { error: "Value Not found or unauthorized" },
                { status: 404 }
            );
        }

        // Delete Property Value from database
        const [result] = await db.execute(`DELETE FROM property_values WHERE id = ? `, [value_id]);
        
        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: `value not found` }, 
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { message: 'value deleted successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }  
}