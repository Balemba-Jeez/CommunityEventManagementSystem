import db from "@/lib/db";
import { isAuthenticated, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {

try {

    // Await the params object first, then access the id
    const { id } = await params;
    // Get token from request header
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  // Request Authentication
  const auth = isAuthenticated(token);
  if (!auth.ok) return auth.response;

  const user = auth.user;
  console.log('User authenticated:', user);

  // Request Authorization (must be 'admin')
  if (!isAuthorized(user, ['admin'])) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

    // Validate id parameter
    if (!id) {

    return NextResponse.json(
        { error: 'Bad request: missing Zone ID' }, 
        { status: 400 }
    );

    }

  console.log('About to execute database query');
        
  // Fetch zones from database
  const [rows] = await db.execute(`SELECT * FROM zones WHERE id = ?`, [id]);

  if (rows.length === 0) {
    return NextResponse.json(
        { error: 'Zone not found' }, 
        { status: 404 }
    );
    }

  // Return the Zone data
  return NextResponse.json(
    {
        message: 'Zone found successfully',
        zones: rows[0]
    },
     
    { status: 200 }
    );

} catch (err) {

    console.error('Error retrieving user role:', err);
    console.error('Error stack:', err.stack);
    return NextResponse.json(
        { error: 'Internal Server Error', details: err.message }, 
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
        if (!isAuthorized(user, ['admin'])) {
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
        
        // Delete Zone from database
        const [result] = await db.execute(`DELETE FROM zones WHERE id = ?`, [id]);
        
        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: 'Zone not found' }, 
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { message: 'Zone deleted successfully' },
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
        if (!isAuthorized(user, ['admin'])) {
            return NextResponse.json(
                { error: 'Forbidden' },
                { status: 403 }
            );
        }
       
        // Validate id parameter
        if (!id) {
            return NextResponse.json(
                { message: 'Bad request: missing zone ID' },
                { status: 400 }
            );
        }

        // Parse request body
        const body = await req.json();
        const { name, description, image } = body;

        // Validate required fields
        if (!name) {
            return NextResponse.json(
                { error: 'Bad request: name is required' },
                { status: 400 }
            );
        }

        // Check if zone exists
        const [existingZone] = await db.execute(
            `SELECT id FROM zones WHERE id = ?`, 
            [id]
        );

        if (existingZone.length === 0) {
            return NextResponse.json(
                { error: 'Zone not found' },
                { status: 404 }
            );
        }
       
        // Update zone in database
        const [result] = await db.execute(
            `UPDATE zones SET name = ?, description = ?, image = ? WHERE id = ?`, 
            [name, description || null, image || null, id]
        );
       
        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: 'Failed to update zone' },
                { status: 500 }
            );
        }

        // Fetch updated zone
        const [updatedZone] = await db.execute(
            `SELECT * FROM zones WHERE id = ?`, 
            [id]
        );
       
        return NextResponse.json(
            { 
                message: 'Zone updated successfully',
                zone: updatedZone[0]
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
        
        if (!isAuthorized(user, ['admin'])) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        
        if (!id) {
            return NextResponse.json({ message: 'Bad request: missing zone ID' }, { status: 400 });
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
        
        if (body.image) {
            updateFields.image = body.image;
        }

        if (body.coverage_area) {
            updateFields.coverage_area = body.coverage_area;
        }
        
        //  Make sure they sent at least one field
        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json({ error: 'No valid fields provided' }, { status: 400 });
        }

        // Check if zone exists
        const [existingZone] = await db.execute(`SELECT id FROM zones WHERE id = ?`, [id]);
        if (existingZone.length === 0) {
            return NextResponse.json({ error: 'Zone not found' }, { status: 404 });
        }
       
    
        
        //  Build the SQL parts
        let sqlParts = [];
        let values = [];
        
        //  Add each field to SQL
        if (updateFields.name) {
            sqlParts.push('name = ?');
            values.push(updateFields.name);
        }
        
        if (updateFields.description) {
            sqlParts.push('description = ?');
            values.push(updateFields.description);
        }
        
        if (updateFields.image) {
            sqlParts.push('image = ?');
            values.push(updateFields.image);
        }

        if (updateFields.coverage_area) {
            sqlParts.push('coverage_area = ?');
            values.push(updateFields.coverage_area);
        }
        
        
        //  Add the ID at the end
        values.push(id);
        
        //  Join SQL parts with commas
        const sqlUpdate = sqlParts.join(', ');
        
        // Execute update
        const [result] = await db.execute(
            `UPDATE zones SET ${sqlUpdate} WHERE id = ?`, 
            values
        );
       
        if (result.changedRows === 0) {
            return NextResponse.json({ error: 'Failed to update zone' }, { status: 500 });
        }

        // Get updated zone
        const [updatedZone] = await db.execute(`SELECT * FROM zones WHERE id = ?`, [id]);
       
        return NextResponse.json({
            message: 'Zone updated successfully',
            zone: updatedZone[0]
        }, { status: 200 });
       
    } catch (err) {
        console.error('Error updating zone:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}