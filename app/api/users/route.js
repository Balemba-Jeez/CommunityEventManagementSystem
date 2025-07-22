import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {

  try {

    const body = await req.json();
    const { name, email, password, image = null, zone_id = null, tel = '+237678189559' } = body;
    const status = 'visitor';

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [user_result] = await db.execute(
      `INSERT INTO users (name, email, password, image, zone_id, tel)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, image, zone_id, tel]
    );

    console.log(user_result);

    //Search role id
    const [rows] = await db.execute(`
        select id from roles where name = ?`, [status])

    //Insert new role for user
    const [role_result] = await db.execute(
        `INSERT INTO user_roles (user_id, role_id)
            VALUES (?, ?)`,
        [user_result.insertId, rows[0].id]
        );

    return new Response(JSON.stringify({ message: 'User created', userId: user_result.insertId }), {
      status: 201,
    });

  } catch (error) {
    console.error('DB error:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}


