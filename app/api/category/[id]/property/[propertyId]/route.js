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
        `SELECT * FROM categories c JOIN category_properties p ON c.id = p.category_id WHERE c.id = ? AND ${zoneCondition} AND c.user_id = ?`,
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
        { error: `Property ${propertyId} not found for Category ${id}` }, 
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

export async function PATCH(req, {params}) {

    try {
    
        
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
            `SELECT * FROM categories c JOIN category_properties p ON c.id = p.category_id WHERE c.id = ? AND ${zoneCondition} AND c.user_id = ?`,
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
            { error: `Property ${propertyId} not found for Category ${id}` }, 
            { status: 404 }
        );
        }
    
    //  Get the data they sent
    const body = await req.json();
            
            
    //  Create updateFields object
    const updateFields = {};

    //  Check each valid field - if they sent it, add it
    if (body.property_key) {
        updateFields.property_key = body.property_key;
    }

    if (body.data_type) {
        updateFields.data_type = body.data_type;
    }

    if (body.max_values) {
        updateFields.max_values = body.max_values;
    }

    //  Make sure they sent at least one field
    if (Object.keys(updateFields).length === 0) {
        return NextResponse.json({ error: 'No valid fields provided' }, { status: 400 });
    }



    //  Build the SQL parts
    let sqlParts = [];
    let sqlValues = [];

    //  Add each field to SQL
    if (updateFields.property_key) {
        sqlParts.push('property_key = ?');
        sqlValues.push(updateFields.name);
    }

    if (updateFields.data_type) {
        sqlParts.push('description = ?');
        sqlValues.push(updateFields.data_type);
    }

    if (updateFields.image) {
        sqlParts.push('image = ?');
        sqlValues.push(updateFields.image);
    }


    //  Add the ID at the end
    sqlValues.push(id);

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
    
        console.error('Error retrieving category property:', err);
        console.error('Error stack:', err.stack);
        return NextResponse.json(
            { error: 'Internal Server Error'}, 
            { status: 500 }
            );
        }     
    
        
    }