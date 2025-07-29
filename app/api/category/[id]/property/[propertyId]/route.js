import db from "@/lib/db";
import { isAuthenticated, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {

try {

    // Await the params object first, then access the id
    const { id, propertyId } = params;
           
    // Get token from request header
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  // Request Authentication
  const auth = isAuthenticated(token);
  if (!auth.ok) return auth.response;

  const user = auth.user;
  console.log('User authenticated:', user);

  // Request Authorization
  if (!isAuthorized(user, ['zone_event_manager','general_event_manager'])) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

    // Validate id parameter
    if (!id || !propertyId) {

    return NextResponse.json(
        { error: "Bad request: missing Category and property ID's" }, 
        { status: 400 }
    );

    }


      // Check if category exists
      const [existingCategory] = await db.execute(
        "SELECT id FROM categories WHERE id = ?",
        [id]
    );
    if (existingCategory.length === 0) {
        return NextResponse.json(
            {
                error: "Category not found",
                message: `Category with ID '${id}' does not exist`
            },
            { status: 404 }
        );
    }

    console.log(id, user.zone, user.id);

      // Check if category exists for that user or user has that category
      let zoneCondition = user.zone === null ? 'c.zone_id IS NULL' : 'c.zone_id = ?';
      let values = user.zone === null ? [id, user.id] : [id, user.zone, user.id];

      const [existingUserCategory] = await db.execute(
        `SELECT * FROM categories c JOIN category_properties p ON c.id = = p.category_id WHERE c.id = ? AND ${zoneCondition} AND c.user_id = ?`,
        values
    );
    if (existingUserCategory.length === 0) {
        return NextResponse.json(
            {
                error: "Category does not exist for user",
                message: `Category with ID '${id}' does not exist for user`
            },
            { status: 403 }
        );
    }
   
  console.log('About to execute database query'); 
  
  // Fetch specific category property - SEPARATE VALUES ARRAY
  let mainQueryValues = user.zone === null ? [id, user.id, propertyId] : [id, user.zone, user.id, propertyId];

  // Fetch all Category properties for a paricular zone_event manager or general _event_manager.

  const [rows] = await db.execute(`SELECT * FROM categories c JOIN category_properties p ON c.id = p.category_id WHERE c.id = ? AND ${zoneCondition} AND c.user_id = ? AND p.id = ?`, mainQueryValues);

  console.log('rows', rows);

  if (rows.length === 0) {
    return NextResponse.json(
        { error: `Property ${propertyId} not found for Category '${id}'` }, 
        { status: 404 }
    );
    }

  // Return the Category Property data
  return NextResponse.json(
    {
        message: 'Category property found successfully',
        zones: rows[0]
    },
     
    { status: 200 }
    );

} catch (err) {

    console.error('Error retrieving category property:', err);
    console.error('Error stack:', err.stack);
    return NextResponse.json(
        { error: 'Internal Server Error'}, 
        { status: 500 }
        );
    }     

    
}