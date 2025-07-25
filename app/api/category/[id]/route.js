import db from "@/lib/db";
import { isAuthenticated, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";



export async function PATCH(req, { params }) {
    try {
        // Get ID from URL
        const { id } = await params;
       
        // Authentication & Authorization (same as DELETE)
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.split(' ')[1];
        const auth = isAuthenticated(token);
        if (!auth.ok) return auth.response;
        const user = auth.user;
        
        if (!isAuthorized(user, ['zone_event_manager','general_event_manager'])) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        
        if (!id) {
            return NextResponse.json({ message: 'Bad request: missing category ID' }, { status: 400 });
        }

        // SIMPLE WAY TO GET updateFields:
        
        //  Get the data they sent
        const body = await req.json();
        
        
        //  Create updateFields object - SIMPLE!
        const updateFields = {};
        
        //  Check each valid field - if they sent it, add it
        if (body.name) {
            updateFields.name = body.name;
        }
        
        if (body.description) {
            updateFields.description = body.description;
        }
        
        if (body.image_url) {
            updateFields.image_url = body.image_url;
        }

        if (body.parent_id) {
            updateFields.coverage_area = body.coverage_area;
        }
        
        //  Make sure they sent at least one field
        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json({ error: 'No valid fields provided' }, { status: 400 });
        }

        // Check if Category exists
        const [existingCategory] = await db.execute(`SELECT id FROM Categories WHERE id = ?`, [id]);
        if (existingCategory.length === 0) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
           
        //  Build the SQL parts
        let sqlParts = [];
        let values = [];
        
        //  Add each field to SQL
        if (updateFields.name) {

            // Check if name exist
            const [existing] = await db.execute(
                `SELECT id FROM categories WHERE name = ? AND id != ?`,
                [updateFields.name, id]
            );

            if (existing.length > 0) {
                return NextResponse.json(
                  { message: "Category name already exists. Category name has to be unique" },
                  { status: 409 } // Conflict
                );
              }

            sqlParts.push('name = ?');
            values.push(updateFields.name);
        }
        
        if (updateFields.description) {
            sqlParts.push('description = ?');
            values.push(updateFields.description);
        }
        
        if (updateFields.image_url) {
            sqlParts.push('image_url = ?');
            values.push(updateFields.image_url);
        }

        if (updateFields.parent_id) {
            sqlParts.push('parent_id = ?');
            values.push(updateFields.parent_id);
        }
        
        
        //  Add the ID at the end
        values.push(user.id, user.zone, id);
        
        //  Join SQL parts with commas
        const sqlUpdate = sqlParts.join(', ');

        console.log('sqlUpdate',sqlUpdate);
        
        // Execute update
        const [result] = await db.execute(
            `UPDATE Categories SET ${sqlUpdate}, user_id = ?, zone_id = ? WHERE id = ?`, 
            values
        );


        if (result.changedRows === 0) {
            return NextResponse.json(
                { error: `No changes made. Category ${id} ${Object.keys(updateFields).join(',')} is already up to date` },
                { status: 200 }
            );
        }

        // Get updated zone
        const [updatedCategory] = await db.execute(`SELECT * FROM categories WHERE id = ?`, [id]);
       
        return NextResponse.json({
            message: 'Category updated successfully',
            zone: updatedCategory[0]
        }, { status: 200 });
       
    } catch (err) {
        console.error('Error updating zone:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}



export async function PUT(req, { params }) {
    try {
        // Await the params object first, then access the id
        const { id } = await params;
       
        // Get token from request header
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.split(' ')[1]; // Bearer <token>
       
        // Authentication
        const auth = isAuthenticated(token);
        if (!auth.ok) {
            return auth.response; // 401 Unauthorized
        }
        const user = auth.user;
       
        // Authorization
        if (!isAuthorized(user, ['zone_event_manager','general_event_manager'])) {
            return NextResponse.json(
                { error: 'Forbidden' },
                { status: 403 }
            );
        }
       
        // Validate id parameter
        if (!id) {
            return NextResponse.json(
                { message: 'Bad request: missing Category ID' },
                { status: 400 }
            );
        }

        // Collect data to be Updated in the Category
        const { name, description = null, image_url = null, parent_id = null } = await req.json();

        // Validate required fields
        if (!name) {
            return NextResponse.json(
                { error: 'Bad request: name is required' },
                { status: 400 }
            );
        }

        // Check if name exist
        const [existing] = await db.execute(
            `SELECT id FROM categories WHERE name = ? AND id != ?`,
            [name, id]
          );
          
          if (existing.length > 0) {
            return NextResponse.json(
              { message: "Category name already exists. Category name has to be unique" },
              { status: 409 } // Conflict
            );
          }
       
        // Update Category in database
        const [result] = await db.execute(
            `UPDATE categories SET name = ?, description = ?, image_url = ?, zone_id = ?, parent_id = ?, user_id = ? WHERE id = ?`, 
            [name, description || null, image_url || null, user.zone, parent_id, user.id, id]
        );
       
        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: `Category with ID '${id}' does not exist` },
                { status: 404 }
            );
        }

        if (result.changedRows === 0) {
            return NextResponse.json(
                { error: `No changes made. Category ${id} data is already up to date` },
                { status: 200 }
            );
        }


        // Fetch updated Category
        const [updatedCategory] = await db.execute(
            `SELECT * FROM Categories WHERE id = ?`, 
            [id]
        );
       
        return NextResponse.json(
            { 
                message: 'Category updated successfully',
                category: updatedCategory[0]
            },
            { status: 200 }
        );
       
    } catch (err) {
        console.error('Error updating zone:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        // Await the params object first, then access the id
        const { id } = await params;
        
        // Get token from request header
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.split(' ')[1]; // Bearer <token>
        
        // Authentication
        const auth = isAuthenticated(token);
        if (!auth.ok) {
            return auth.response; // 401 Unauthorized
        }
        const user = auth.user;
        
        // Authorization
        if (!isAuthorized(user, ['zone_event_manager','general_event_manager'])) {
            return NextResponse.json(
                { error: 'Forbidden' }, 
                { status: 403 }
            );
        }
        
        // Validate id parameter
        if (!id) {
            return NextResponse.json(
                { message: 'Bad request: missing user ID' }, 
                { status: 400 }
            );
        }
        
        // Delete Category from database
        const [result] = await db.execute(`DELETE FROM categories WHERE id = ? AND user_id = ? AND zone_id = ?`, [id, user.id, user.zone]);
        
        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: `Category not found` }, 
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { message: 'Category deleted successfully' },
            { status: 200 }
        );
        
    } catch (err) {
        console.error('Error deleting user role:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}