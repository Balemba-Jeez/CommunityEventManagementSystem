import db from "@/lib/db";
import { isAuthenticated, isAuthenticatedV2, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";

export async function GET(req) {

try {
           
    // Get token from request header
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  // Request Authentication
  const auth = await isAuthenticatedV2(token);
  if (!auth.ok) return auth.response;

  const user = auth.user;
  console.log('User authenticated:', user);

  // Request Authorization (must be 'admin')
  if (!isAuthorized(user, ['admin'])) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }


  console.log('About to execute database query');
        
  // Fetch zones from database
  const [rows] = await db.execute(`SELECT * FROM zones`);

  if (rows.length === 0) {
    return NextResponse.json(
        { error: 'No zones found' }, 
        { status: 404 }
    );
    }

  // Return the Zone data
  return NextResponse.json(
    {
        message: 'Zones found successfully',
        zones: rows
    },
     
    { status: 200 }
    );

} catch (err) {

    console.error('Error retrieving Zones:', err);
    console.error('Error stack:', err.stack);
    return NextResponse.json(
        { error: 'Internal Server Error', details: err.message }, 
        { status: 500 }
        );
    }     

    
}


export async function POST(req) {

try {
    
  // Get token from request header
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  // Request Authentication
  const auth = await isAuthenticatedV2(token);
  if (!auth.ok) return auth.response;

  const user = auth.user;

  // Request Authorization (must be 'admin')
  if (!isAuthorized(user, ['admin'])) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { name, image, description, coverage_area } = await req.json();

  // Body Check
  if (!name || !coverage_area) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  // Check if zone with same name already exists
  const [existingZone] = await db.execute(
    "SELECT id FROM zones WHERE name = ?",
    [name]
    );

  if (existingZone.length > 0) {
    return NextResponse.json(
        { 
            error: "Zone already exists", 
            message: `A zone with the name '${name}' already exists` 
        },
        { status: 409 } // 409 Conflict
    );
  }

  const [result] = await db.execute(
    "INSERT INTO zones (name, image, description, coverage_area) VALUES (?, ?, ?,?)",
    [ name, image, description, coverage_area]
  );

  return NextResponse.json(
    { message: "Zone added successfully", ZoneId: result.insertId },
    { status: 201 }
  );
} catch (error) {
    console.error('Route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    
}
}

export async function DELETE(req) {
  try {
    // Get token from headers
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const auth = await isAuthenticatedV2(token);
    if (!auth.ok) return auth.response;

    const user = auth.user;

    if (!isAuthorized(user, ['admin', 'general_event_manager'])) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Parse query parameters
    const url = new URL(req.url);
    const idsParam = url.searchParams.get("ids");
    console.log('url',url);
    console.log('idsParam',typeof(idsParam));
    if (!idsParam) {
        return NextResponse.json({ error: "Missing zone IDs" }, { status: 400 });
      }
  
      const ids = idsParam.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
  
      if (ids.length === 0) {
        return NextResponse.json({ error: "No valid zone IDs provided" }, { status: 400 });
      }
  
      const [existing] = await db.query(
        `SELECT id FROM zones WHERE id IN (?)`, [ids]
      );
      console.log('existing:', existing)

      if(existing.length ===0){
        return NextResponse.json(
            {
                error: 'All zone IDs do not exist',
                'nonExistingId(s)': ids
            },
            { status:400 });
      }

      if (existing.length !== ids.length) {
        return NextResponse.json({
          error: 'Some zone IDs do not exist',
          'existingId(s)': existing.map(z => z.id),
          'nonExistingId(s)': ids.filter(id => !existing.map(z => z.id).includes(id))
        }, { status: 400 });
      }
      

      // Build placeholders for query
      const placeholders = ids.map(() => '?').join(', ');
  
      const [result] = await db.execute(
        `DELETE FROM zones WHERE id IN (${placeholders})`,
        ids
      );
  
      return NextResponse.json({
        message: "Zones deleted successfully",
        affectedRows: result.affectedRows,
        deletedZones: ids
      }, { status: 200 });
} catch (err) {
    console.error("Error deleting zones:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}