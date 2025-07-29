import db from "@/lib/db";
import { isAuthenticated, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
      const authHeader = req.headers.get("authorization");
      const token = authHeader?.split(" ")[1];
      const auth = isAuthenticated(token);
      if (!auth.ok) return auth.response;
  
      const user = auth.user;
  
      if (!isAuthorized(user, ['zone_event_manager', 'general_event_manager'])) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }
  
      const url = new URL(req.url);
      const zone = url.searchParams.get('zone');
      const user_id = url.searchParams.get('user_id');
      const parent_id = url.searchParams.get('parent_id');
  
      let rows = [];
  
      // General Event Manager logic
      if (isAuthorized(user, ['general_event_manager'])) {
        let query = 'SELECT * FROM categories';
        let values = [];
        const filters = [];
  
        if (zone) {
          filters.push('zone_id = ?');
          values.push(zone);
        }
  
        if (user_id) {
          filters.push('user_id = ?');
          values.push(user_id);
        }
  
        if (url.searchParams.has('parent_id')) {
            if (parent_id === 'null') {
              filters.push('parent_id IS NULL');
            } else {
              filters.push('parent_id = ?');
              values.push(parent_id);
            }
          }
  
        if (filters.length > 0) {
          query += ' WHERE ' + filters.join(' AND ');
        }
  
        const [results] = await db.execute(query, values);
        rows = results;
      }
  
      // Zone Event Manager logic
      else if (isAuthorized(user, ['zone_event_manager'])) {
        let filters;
        if (parent_id) {
           filters = ' AND parent_id = ?'
        } else if (!parent_id) {
           filters = '';
        } else if (parent_id = 'null') {
           filters = ' AND parent_id IS NULL';
        }
        const query = `SELECT * FROM categories WHERE zone_id = ? AND user_id = ?${filters}`;
        const values = parent_id ? [user.zone, user.id, parent_id] : [user.zone, user.id];
  
        const [results] = await db.execute(query, values);
        rows = results;
      }
  
      if (rows.length === 0) {
        return NextResponse.json({ error: `Categories not found` }, { status: 404 });
      }
  
      return NextResponse.json(
        {
          message: 'Categories found successfully',
          categories: rows,
        },
        { status: 200 }
      );
    } catch (err) {
      console.error('Error retrieving Categories:', err);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const auth = isAuthenticated(token);
    if (!auth.ok) return auth.response;

    const user = auth.user;

    if (!isAuthorized(user, ['zone_event_manager', 'general_event_manager'])) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { name, description = null, image_url = null, zone_id = null, parent_id = null } = await req.json();

    if (!name) {
      return NextResponse.json({ message: "Bad request: name is required" }, { status: 400 });
    }


    // Check parent category (if provided)
    if (parent_id) {
      const [parent] = await db.execute("SELECT id FROM categories WHERE id = ?", [parent_id]);
      if (parent.length === 0) {
        return NextResponse.json({ message: `Parent category with ID '${parent_id}' does not exist` }, { status: 404 });
      }
    }

    // Ensure unique name
    const [existing] = await db.execute("SELECT id FROM categories WHERE name = ?", [name]);
    if (existing.length > 0) {
      return NextResponse.json({ message: `Category with name '${name}' already exists` }, { status: 409 });
    }

    // Insert
    const [result] = await db.execute(
      "INSERT INTO categories (name, description, image_url, user_id, zone_id, parent_id) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, image_url, user.id, zone_id, parent_id]
    );

    return NextResponse.json({ message: "Category created successfully", categoryId: result.insertId }, { status: 201 });

  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
