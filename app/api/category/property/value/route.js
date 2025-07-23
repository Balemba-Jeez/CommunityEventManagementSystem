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
            
        if (!validDataTypes.includes(data_type)) { message: "Forbidden" }, { status: 403 });
        // Validate data_type enum values

        const { category_id, property_key, data_type = 'string', max_values = 1 } = await req.json();

        // Body Check - Required fields
        if (!category_id || !property_key) {
            return NextResponse.json({
                message: "Bad request: category_id and property_key are required"
            }, { status: 400 });
        }

        // Validate max_values
        if (max_values < 1 || !Number.isInteger(max_values)) {
            return NextResponse.json({
                message: "Bad request: max_values must be a positive integer"
            }, { status: 400 });
        }
        }

        // Validate data_type enum values
        const validDataTypes = ['string', 'int', 'boolean', 'date'];
            return NextResponse.json({
                message: `Bad request: data_type must be one of: ${validDataTypes.join(', ')}`
            }, { status: 400 });
        }

        // Check if category exists
        const [existingCategory] = await db.execute(
            "SELECT id FROM categories WHERE id = ?",
            [category_id]
        );
        if (existingCategory.length === 0) {
            return NextResponse.json(
                {
                    error: "Category not found",
                    message: `Category with ID '${category_id}' does not exist`
                },
                { status: 404 }
            );
        }

        // Check for duplicate property_key within the same category
        const [existingProperty] = await db.execute(
            "SELECT id FROM category_properties WHERE category_id = ? AND property_key = ?",
            [category_id, property_key]
        );
        if (existingProperty.length > 0) {
            return NextResponse.json(
                {
                    error: "Property already exists",
                    message: `A property with key '${property_key}' already exists for this category`
                },
                { status: 409 } // 409 Conflict
            );
        }

        // Insert new category property
        const [result] = await db.execute(
            "INSERT INTO category_properties (category_id, property_key, data_type, max_values) VALUES (?, ?, ?, ?)",
            [
                category_id,
                property_key,
                data_type,
                max_values
            ]
        );

        return NextResponse.json(
            {
                message: "Category property created successfully",
                propertyId: result.insertId
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}