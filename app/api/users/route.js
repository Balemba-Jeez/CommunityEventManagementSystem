import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(req) {

  try {

    const body = await req.json();
    const { name, email, password, image = null, zone_id = null, tel = '+237678189559' } = body;

     // Body Check
      if (!name || !email || !password || !tel) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
      }
    
      // Check if user with same email already exists
      const [existingZone] = await db.execute(
        "SELECT id FROM users WHERE email = ?",
        [email]
        );
    
      if (existingZone.length > 0) {
        return NextResponse.json(
            { 
                error: "User already exists", 
                message: `A user with the email '${email}' already exists` 
            },
            { status: 409 } // 409 Conflict
        );
      }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [user_result] = await db.execute(
      `INSERT INTO users (name, email, password, image, zone_id, tel)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, image, zone_id, tel]
    );

    console.log(user_result);


    return new Response(JSON.stringify({ message: 'User created Successfully', userId: user_result.insertId }), {
      status: 201,
    });

  } catch (error) {
    console.error('DB error:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}


