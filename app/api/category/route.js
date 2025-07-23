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

        const { name, description = null, image_url = null, zone_id = null, parent_id = null } = await req.json();

        // Body Check - Required fields
        if (!name) {
            return NextResponse.json({
                message: "Bad request: name is required"
            }, { status: 400 });
        }

        // Check if zone exists (if zone_id is provided)
        if (zone_id) {
            const [existingZone] = await db.execute(
                "SELECT id FROM zones WHERE id = ?",
                [zone_id]
            );
            if (existingZone.length === 0) {
                return NextResponse.json(
                    {
                        error: "Zone not found",
                        message: `Zone with ID '${zone_id}' does not exist`
                    },
                    { status: 404 }
                );
            }
        }

        // Check if parent category exists (if parent_id is provided)
        if (parent_id) {
            const [existingParent] = await db.execute(
                "SELECT id FROM categories WHERE id = ?",
                [parent_id]
            );
            if (existingParent.length === 0) {
                return NextResponse.json(
                    {
                        error: "Parent category not found",
                        message: `Parent category with ID '${parent_id}' does not exist`
                    },
                    { status: 404 }
                );
            }
        }

        // Check for duplicate category name (since name has UNIQUE constraint)
        const [existingCategory] = await db.execute(
            "SELECT id FROM categories WHERE name = ?",
            [name]
        );
        if (existingCategory.length > 0) {
            return NextResponse.json(
                {
                    error: "Category already exists",
                    message: `A category with the name '${name}' already exists`
                },
                { status: 409 } // 409 Conflict
            );
        }

        // Insert new category
        const [result] = await db.execute(
            "INSERT INTO categories (name, description, image_url, user_id, zone_id, parent_id) VALUES (?, ?, ?, ?, ?, ?)",
            [
                name,
                description,
                image_url,
                user.id, // user_id from authenticated user
                zone_id,
                parent_id
            ]
        );

        return NextResponse.json(
            {
                message: "Category created successfully",
                categoryId: result.insertId
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Route error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}