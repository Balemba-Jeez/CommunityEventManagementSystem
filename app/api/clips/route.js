import { NextResponse } from "next/server";
import db from "@/lib/db";


// export async function GET() {
//   try {
//     const [clips] = await db.execute(`
//       SELECT 
//         id,
//         title,
//         description,
//         content,
//         thumbnail,
//         status,
//         user_id,
//         event_id,
//         created_at,
//         updated_at
//       FROM clips
//       ORDER BY created_at DESC
//     `);

//     // Map DB rows to frontend-friendly shape
//     const videos = clips.map((clip) => ({
//       id: clip.id,
//       title: clip.title || "Untitled",
//       eventId: clip.event_id,
//       eventName: "", // can be joined later if you want event name
//       uploadedBy: `User ${clip.user_id}`, // or fetch from users table
//       uploadCreateDate: new Date(clip.created_at).toLocaleDateString(),
//       uploadModifyDate: new Date(clip.updated_at).toLocaleDateString(),
//       size: "—", // if you want file size you need to store it at upload
//       duration: "—", // same for duration, unless you calculate later
//       thumbnail: clip.thumbnail,
//       status: clip.status || "processing", // 👈 we’ll add `status` column in step 2
//       type: "video", // since these are all videos
//     }));

//     console.log(videos)

//     return NextResponse.json(videos);
//   } catch (err) {
//     console.error("Error fetching clips:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    const [clips] = await db.execute(`
      SELECT 
        id,
        title,
        description,
        content,
        thumbnail,
        status,
        user_id,
        event_id,
        created_at,
        updated_at,
        size,
        duration
      FROM clips
      ORDER BY created_at DESC
    `);

    const formatFileSize = (bytes) => {
      if (!bytes) return "—";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const videos = clips.map((clip) => ({
      id: clip.id,
      title: clip.title || "Untitled",
      eventId: clip.event_id,
      eventName: "", // optional join later
      uploadedBy: `User ${clip.user_id}`,
      uploadCreateDate: new Date(clip.created_at).toLocaleDateString(),
      uploadModifyDate: new Date(clip.updated_at).toLocaleDateString(),
      size: formatFileSize(clip.size),
      duration: clip.duration ? `${Math.floor(clip.duration / 60)}:${Math.floor(clip.duration % 60).toString().padStart(2, "0")}` : "—",
      thumbnail: clip.thumbnail,
      status: clip.status || "processing",
      type: "video",
    }));

    return NextResponse.json(videos);
  } catch (err) {
    console.error("Error fetching clips:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id, event_id, content, thumbnail, title, description, size, duration } = body;

    if (!user_id || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into MySQL
    const [result] = await db.execute(
      `INSERT INTO clips 
        (user_id, event_id, content, thumbnail, title, description, status, size, duration, views_count)
       VALUES (?, ?, ?, ?, ?, ?, 'processing', ?, ?, 0)`,
      [
        user_id,
        event_id || null,
        content,
        thumbnail || null,
        title || null,
        description || null,
        size || null,
        duration || null
      ]
    );

    return NextResponse.json(
      {
        id: result.insertId,
        user_id,
        event_id,
        content,
        thumbnail,
        title,
        description,
        status: 'processing',
        size,
        duration,
        views_count: 0,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error inserting clip:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



