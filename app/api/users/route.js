import db from '@/lib/db';

export async function POST(req) {
  const body = await req.json();
  const { name, email, password, image = null, zone_id = null } = body;

  try {

    // 1. Check if email already exists
    const [existingUser] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return new Response(JSON.stringify({ message: 'Email already in use' }), {
        status: 409,
      });
    }

    // 2. Insert new user
    const [result] = await db.execute(
      `INSERT INTO users (name, email, password, image, zone_id)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, password, image, zone_id]
    );

    return new Response(JSON.stringify({ message: 'User created', userId: result.insertId }), {
      status: 201,
    });

  } catch (error) {
    console.error('DB error:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
