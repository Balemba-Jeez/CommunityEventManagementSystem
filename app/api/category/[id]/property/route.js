import db from "@/lib/db";
import { isAuthenticated, isAuthenticatedV2, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {

    try {
               
        // Get token from request header
      const authHeader = req.headers.get("authorization");
      const token = authHeader?.split(" ")[1]; // Bearer <token>
    
      // Request Authentication
      const auth = await isAuthenticatedV2(token);
      if (!auth.ok) return auth.response;
    
      const user = auth.user;
      console.log('User authenticated:', user);
    
      // Request Authorization
      if (!isAuthorized(user, ['zone_event_manager','general_event_manager'])) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

        // Await the params object first, then access the id
        const { id:category_id } = await params;

        // Gneral venet manager can view the properties of any category
        if (isAuthorized(user, ['general_event_manager'])) {
            const [rows] = await db.execute(`SELECT *  FROM category_properties WHERE category_id = ?`, [category_id]);

            if (rows.length === 0) {
                    return NextResponse.json(
                        { error: `No properties found for category ${category_id}` }, 
                        { status: 404 }
                    );
                }
            
            // Return the Zone data
            return NextResponse.json(
                {
                    message: 'Properties found successfully',
                    properties: rows
                },
                
                { status: 200 }
                );
        }
    
    
      console.log('About to execute database query');
            
      // Fetch properties for a particular category from database
      const [rows] = await db.execute(`SELECT p.* FROM categories c JOIN category_properties p ON c.id = p.category_id WHERE c.id = ? AND c.user_id = ?`, [category_id, user.id]);
    
      if (rows.length === 0) {
        return NextResponse.json(
            { error: `No properties found for category ${category_id} or unauthorized` }, 
            { status: 404 }
        );
        }
    
      // Return the Zone data
      return NextResponse.json(
        {
            message: 'Properties found successfully',
            properties: rows
        },
         
        { status: 200 }
        );
    
    } catch (err) {
    
        console.error('Error retrieving Zones:', err);
        console.error('Error stack:', err.stack);
        return NextResponse.json(
            { error: 'Internal Server Error' }, 
            { status: 500 }
            );
        }     
    
        
    }

export async function POST(req, {params}) {
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

        // Await the params object first, then access the id
        const { id:category_id } = await params;

        const { property_key, data_type = 'string', max_values = 1 } = await req.json();

        // Body Check - Required fields
        if (!category_id || !property_key) {
            return NextResponse.json({
                message: "Bad request: category_id and property_key are required"
            }, { status: 400 });
        }

        // Validate data_type enum values
        const validDataTypes = ['string', 'int', 'boolean', 'date'];
        if (!validDataTypes.includes(data_type)) {
            return NextResponse.json({
                message: `Bad request: data_type must be one of: ${validDataTypes.join(', ')}`
            }, { status: 400 });
        }

        // Validate max_values
        if (max_values && (!Number.isInteger(Number(max_values)) || Number(max_values) < 1)) {
            return NextResponse.json({
                message: "Bad request: max_values must be a positive integer"
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