import db from "@/lib/db";
import { isAuthenticated, isAuthenticatedV2, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {

try{

  // Collect parameter
  const { roleId } = params

  // Get token from request header
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  // Check if user is authenticated
  const auth = await isAuthenticatedV2(token);
  if (!auth.ok) return auth.response;

  const user = auth.user;

  console.log('user', user)

  // Check if user is authorized (must be 'admin')
  if (!isAuthorized(user, ['admin'])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

    // Validate id parameter
    if (!roleId) {

        return NextResponse.json(
            { error: 'Bad request: missing role ID' }, 
            { status: 400 }
        );
    }


  const [roles] = await db.execute(
    `SELECT * FROM roles where id = ?`,
    [roleId]
  );

  if (roles.length === 0 ) {
    return NextResponse.json({error: "Role not found"}, {status : 404})
  }

  return NextResponse.json(
    { message: "Role found successfully", role: roles[0] },
    { status: 200 }
  );
} catch (err) {
      console.error('Error retrieving role:', err);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(req, {params}) {

    try {
            // Collect parameter
            const { roleId } = await params

            // Get token from request header
            const authHeader = req.headers.get("authorization");
            const token = authHeader?.split(" ")[1]; // Bearer <token>

            // Check if user is authenticated
            const auth = await isAuthenticatedV2(token);
            if (!auth.ok) return auth.response;

            const user = auth.user;

            console.log('user', user)

            // Check if user is authorized (must be 'admin')
            if (!isAuthorized(user, ['admin'])) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }

                // Validate id parameter
                if (!roleId) {

                    return NextResponse.json(
                        { error: 'Bad request: missing role ID' }, 
                        { status: 400 }
                    );
                }

            const [existingRole] = await db.execute(
                `SELECT * FROM roles WHERE id = ?`,
                [roleId]
            );

            console.log(existingRole);

            if (existingRole.length === 0 ) {
                return NextResponse.json({error: "Role not found"}, {status : 404})
            }

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
        
        //  Make sure they sent at least one field
        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json({ error: 'No valid fields provided' }, { status: 400 });
        }

        //  Build the SQL parts
        let sqlParts = [];
        let values = [];


        //  Add each field to SQL
        if (updateFields.name) {

            // Check if name exist
            const [existing] = await db.execute(
                `SELECT id FROM roles WHERE name = ? AND id != ?`,
                [updateFields.name, roleId]
            );

        if (existing.length > 0) {
                return NextResponse.json(
                  { message: "Role name already exists. Role name has to be unique" },
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

        //  Add the ID at the end
        values.push(roleId);
        
        //  Join SQL parts with commas
        const sqlUpdate = sqlParts.join(', ');

        console.log('sqlUpdate',sqlUpdate);
        
        // Execute update
        const [result] = await db.execute(
            `UPDATE roles SET ${sqlUpdate} WHERE id = ?`, 
            values
        );


        if (result.changedRows === 0) {
            return NextResponse.json(
                { error: `No changes made. Role ${id} ${Object.keys(updateFields).join(',')} is already up to date` },
                { status: 200 }
            );
        }

        // Get updated category
        const [updatedRole] = await db.execute(`SELECT * FROM roles WHERE id = ?`, [roleId]);
       
        return NextResponse.json({
            message: 'Role updated successfully',
            category: updatedRole[0]
        }, { status: 200 });

    } catch (err) {
      console.error('Error partially updating role:', err);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    
    }
}

export async function DELETE(req, { params }) {
  try {
    // Collect parameter
    const { roleId } = await params;

    // Get token from request header
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1]; // Bearer <token>

    // Check if user is authenticated
    const auth = await isAuthenticatedV2(token);
    if (!auth.ok) return auth.response;

    const user = auth.user;
    console.log("user", user);

    // Only admin can delete roles
    if (!isAuthorized(user, ["admin"])) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Validate id parameter
    if (!roleId) {
      return NextResponse.json(
        { error: "Bad request: missing role ID" },
        { status: 400 }
      );
    }

    // First check if role exists
    const [roles] = await db.execute(`SELECT * FROM roles WHERE id = ?`, [
      roleId,
    ]);
    if (roles.length === 0) {
      return NextResponse.json(
        { error: "Role not found" },
        { status: 404 }
      );
    }

    // Delete role
    const [result] = await db.execute(`DELETE FROM roles WHERE id = ?`, [
      roleId,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Failed to delete role" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Role deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting role:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


