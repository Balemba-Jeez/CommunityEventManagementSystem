// // /api/events/member/route.js
// import db from "@/lib/db";
// import { isAuthenticatedV2, isAuthorizedV2 } from "@/lib/security/auth";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     // --- Authentication ---
//     const authHeader = req.headers.get("authorization");
//     const token = authHeader?.split(" ")[1];
//     const auth = await isAuthenticatedV2(token);
//     if (!auth.ok) return auth.response;

//     const user = auth.user;

//     // --- Authorization ---
//     if (!isAuthorizedV2(user, ["member"])) {
//       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//     }

//     // --- Query parameters ---
//     const { searchParams } = new URL(req.url);
//     const category = searchParams.get("category"); // <-- new
//     const light = searchParams.get("light") === "true";

//     // --- Build SQL query ---
//     let query = "";
//     const params = [user.zone]; // always filter by zone

//     if (light) {
//       query = `
//         SELECT e.id, e.title AS name
//         FROM events e
//         WHERE e.zone_id = ? AND e.status != 'draft'
//       `;
//       if (category) {
//         query += " AND e.category_id = ?";
//         params.push(category);
//       }
//       query += " ORDER BY e.start_time ASC";
//     } else {
//       query = `
//         SELECT 
//           e.id,
//           e.title,
//           e.description,
//           e.start_time,
//           e.end_time,
//           e.location,
//           e.image_url,
//           e.status,
//           e.zone_id,
//           c.id AS category_id,
//           c.name AS category_name,
//           c.image_url AS category_image
//         FROM events e
//         LEFT JOIN categories c ON e.category_id = c.id
//         WHERE e.zone_id = ? AND e.status != 'draft'
//       `;
//       if (category) {
//         query += " AND e.category_id = ?";
//         params.push(category);
//       }
//       query += " ORDER BY e.start_time ASC";
//     }

//     const [events] = await db.execute(query, params);

//     if (events.length === 0) {
//       return NextResponse.json({ message: "No events found" }, { status: 404 });
//     }

//     return NextResponse.json({ events }, { status: 200 });
//   } catch (error) {
//     console.error("Route error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// /api/events/member/route.js
// import db from "@/lib/db";
// import { isAuthenticatedV2, isAuthorizedV2 } from "@/lib/security/auth";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     // --- Authentication ---
//     const authHeader = req.headers.get("authorization");
//     const token = authHeader?.split(" ")[1];
//     const auth = await isAuthenticatedV2(token);
//     if (!auth.ok) return auth.response;

//     const user = auth.user;

//     // --- Authorization ---
//     if (!isAuthorizedV2(user, ["member"])) {
//       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//     }

//     // --- Query parameters ---
//     const { searchParams } = new URL(req.url);
//     const category = searchParams.get("category"); // category name like "Technology"
//     const light = searchParams.get("light") === "true";
//     const global = searchParams.get("global") === "true"; // NEW: global events flag
//     const live_status = searchParams.get("live_status") // "active", "ended", "ready"

//     console.log("Fetching events - global:", global, "zone:", user.zone, "category:", category);

//     // --- Build SQL query ---
//     let query = "";
//     const params = [];

//     if (live_status) {
//   query += " AND e.live_status = ?"
//   params.push(live_status)
// }

//     // Determine zone filtering
//     if (global) {
//       // Global events: no zone filtering
//       console.log("Fetching global events from all zones");
//     } else {
//       // Zone events: filter by user's zone
//       params.push(user.zone);
//       console.log("Fetching zone events for zone:", user.zone);
//     }

//     if (light) {
//       query = `
//         SELECT e.id, e.title AS name
//         FROM events e
//       `;
//       if (category) {
//         query += `
//         LEFT JOIN categories c ON e.category_id = c.id
//         WHERE e.status != 'draft' AND c.name = ?
//         `;
//         if (!global) {
//           query = query.replace("WHERE", "WHERE e.zone_id = ? AND");
//         }
//         params.push(category);
//       } else {
//         if (global) {
//           query += `WHERE e.status != 'draft'`;
//         } else {
//           query += `WHERE e.zone_id = ? AND e.status != 'draft'`;
//         }
//       }
//       query += " ORDER BY e.start_time ASC";
//     } else {
//       query = `
//         SELECT 
//           e.id,
//           e.title,
//           e.description,
//           e.start_time,
//           e.end_time,
//           e.location,
//           e.image_url,
//           e.status,
//           e.zone_id,
//           c.id AS category_id,
//           c.name AS category_name,
//           c.image_url AS category_image${global ? ',\n          z.name AS zone_name' : ''}
//         FROM events e
//         LEFT JOIN categories c ON e.category_id = c.id${global ? '\n        LEFT JOIN zones z ON e.zone_id = z.id' : ''}
//       `;
      
//       if (global) {
//         query += `WHERE e.status != 'draft' AND e.zone_id is null`;
//       } else {
//         query += `WHERE e.zone_id = ? AND e.status != 'draft'`;
//       }
      
//       if (category) {
//         query += " AND c.name = ?";
//         params.push(category);
//       }
//       query += " ORDER BY e.start_time ASC";
//     }

//     console.log("Executing query:", query);
//     console.log("With params:", params);

//     const [events] = await db.execute(query, params);

//     console.log("Found events:", events.length);

//     // Return empty array if no events found
//     return NextResponse.json({ events: events || [] }, { status: 200 });
//   } catch (error) {
//     console.error("Route error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// /api/events/member/route.js
import db from "@/lib/db";
import { isAuthenticatedV2, isAuthorizedV2 } from "@/lib/security/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // --- Authentication ---
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const auth = await isAuthenticatedV2(token);
    if (!auth.ok) return auth.response;

    const user = auth.user;

    // --- Authorization ---
    if (!isAuthorizedV2(user, ["member"])) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // --- Query parameters ---
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category"); // category name like "Technology"
    const light = searchParams.get("light") === "true";
    const global = searchParams.get("global") === "true"; // global events flag
    const live_status = searchParams.get("live_status"); // "active", "ended", "ready"

    console.log("Fetching events - global:", global, "zone:", user.zone, "category:", category, "live_status:", live_status);

    // --- Build SQL query ---
    let query = "";
    const params = [];

    // Determine event scope
    if (global) {
      console.log("Fetching community-level events");
    } else {
      console.log("Fetching zone events for zone:", user.zone);
    }

    if (light) {
      query = `
        SELECT e.id, e.title AS name
        FROM events e
      `;
      
      // Build WHERE clause
      let whereConditions = ["e.status != 'draft'"];
      
      if (global) {
        // Community-level events: events with zone_id = NULL (community events)
        whereConditions.push("e.zone_id IS NULL");
      } else {
        // Zone-specific events: events for user's zone only
        whereConditions.push("e.zone_id = ?");
        params.push(user.zone);
      }
      
      if (category) {
        query += ` LEFT JOIN categories c ON e.category_id = c.id`;
        whereConditions.push("c.name = ?");
        params.push(category);
      }
      
      if (live_status) {
        whereConditions.push("e.live_status = ?");
        params.push(live_status);
      }
      
      query += ` WHERE ${whereConditions.join(" AND ")}`;
      query += " ORDER BY e.start_time ASC";
      
    } else {
      query = `
        SELECT 
          e.id,
          e.title,
          e.description,
          e.start_time,
          e.end_time,
          e.location,
          e.image_url,
          e.status,
          e.zone_id,
          e.organizer_id,
          e.live_status,
          e.live_stream_url,
          e.live_playback_url,
          e.live_stream_id,
          e.live_playback_id,
          c.id AS category_id,
          c.name AS category_name,
          c.image_url AS category_image${global ? ',\n          z.name AS zone_name,\n          u.name AS organizer_name' : ',\n          u.name AS organizer_name'}
        FROM events e
        LEFT JOIN categories c ON e.category_id = c.id
        LEFT JOIN users u ON e.organizer_id = u.id${global ? '\n        LEFT JOIN zones z ON e.zone_id = z.id' : ''}
      `;
      
      // Build WHERE clause
      let whereConditions = ["e.status != 'draft'"];
      
      if (global) {
        // Community-level events: events with zone_id = NULL (community events)
        whereConditions.push("e.zone_id IS NULL");
      } else {
        // Zone-specific events: events for user's zone only
        whereConditions.push("e.zone_id = ?");
        params.push(user.zone);
      }
      
      if (category) {
        whereConditions.push("c.name = ?");
        params.push(category);
      }
      
      if (live_status) {
        whereConditions.push("e.live_status = ?");
        params.push(live_status);
      }
      
      query += ` WHERE ${whereConditions.join(" AND ")}`;
      query += " ORDER BY e.start_time ASC";
    }

    console.log("Executing query:", query);
    console.log("With params:", params);

    const [events] = await db.execute(query, params);

    console.log("Found events:", events.length);

    // Return empty array if no events found
    return NextResponse.json({ events: events || [] }, { status: 200 });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}