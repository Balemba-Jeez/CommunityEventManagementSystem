import db from "@/lib/db";
import { isAuthenticated, isAuthenticatedV2, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";

export async function GET(req) {

try{
  // Get token from request header
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  // Check if user is authenticated
  const auth = await isAuthenticatedV2(token);
  if (!auth.ok) return auth.response;

  const user = auth.user;

  // Check if user is authorized (must be 'admin')
  if (!isAuthorized(user, ['admin'])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }


  const [roles] = await db.execute(
    `SELECT * FROM roles`
  );

  if (roles.length === 0 ) {
    return NextResponse.json({error: "No roles found"}, {status : 404})
  }

  return NextResponse.json(
    { message: "Roles found successfully", roles: roles },
    { status: 200 }
  );
}
  catch(err){
    console.error('Error retrieving roles:', err);
    console.error('Error stack:', err.stack);
    return NextResponse.json(
        { error: 'Internal Server Error'}, 
        { status: 500 }
        );
    }     
}



export async function POST(req) {

try{
  // Get token from request header
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  // Check if user is authenticated
  const auth = await isAuthenticatedV2(token);
  if (!auth.ok) return auth.response;

  const user = auth.user;

  // Check if user is authorized (must be 'admin')
  if (!isAuthorized(user, ['admin'])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, description = null } = await req.json();

  if (name === null) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const [existingRole] = await db.execute(
    `SELECT * FROM roles WHERE name = ?`,
    [name]
  );

  if (existingRole.length > 0 ) {
    return NextResponse.json({error: "Role with same name already exists"}, {status : 409})
  }

  const [result] = await db.execute(
    "INSERT INTO roles (name, description) VALUES (?, ?)",
    [name, description]
  );

  return NextResponse.json(
    { message: "Role created successfully", roleId: result.insertId },
    { status: 201 }
  );
} catch (err) {
      console.error('Error creating roles:', err);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
