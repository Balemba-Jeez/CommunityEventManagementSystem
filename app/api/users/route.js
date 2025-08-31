import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, tel = '237678189559', opt_ins = {} } = body;

    // Body Check
    if (!name || !email || !password || !tel) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    // Check if user already exists
    const [existingUser] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { 
          error: "User already exists", 
          message: `A user with the email '${email}' already exists` 
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Format phone (Vonage E.164 without +) ---
    let formattedTel = tel.replace(/\D/g, ""); // keep only digits

    if (formattedTel.length === 9 && formattedTel.startsWith("6")) {
      // local CM number
      formattedTel = "237" + formattedTel;
    }
    if (formattedTel.startsWith("237") && formattedTel.length === 12) {
      // already good
    }
    if (formattedTel.length < 10 || formattedTel.length > 15) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    // Insert new user
    const [user_result] = await db.execute(
      `INSERT INTO users (name, email, password, tel)
       VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, tel]
    );

    const userId = user_result.insertId;

    //  Fetch all available channels
    const [channels] = await db.execute("SELECT id, name FROM notification_channels");

    //  Build lookup { sms: 1, whatsapp: 2, email: 3 }
    const channelMap = {};
    channels.forEach(ch => {
      channelMap[ch.name] = ch.id;
    });


  // Insert user opt-ins
  for (const channelName of Object.keys(opt_ins)) {
    if (opt_ins[channelName] && channelMap[channelName]) {
      let address = null;

      switch (channelName) {
        case "email":
          address = email;
          break;
        case "sms":
          address = formattedTel;
          break;
        case "whatsapp":
          address = body.whatsapp_number || null;
          break;
        default:
          address = null;
      }

      await db.execute(
        `INSERT INTO user_notification_channels (user_id, channel_id, address, preferences)
        VALUES (?, ?, ?, ?)`,
        [userId, channelMap[channelName], address, JSON.stringify({})]
      );
    }
  }


    return NextResponse.json(
      { message: 'User created Successfully', userId },
      { status: 201 }
    );

  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
