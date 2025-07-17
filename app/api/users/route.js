import db from '@/lib/db';

import bcrypt from 'bcryptjs';



export async function GET(req){
    const {searchParams} = new URL(req.url);
    const email = searchParams.get('email');

    try {
            // console.log('query results',await db.execute(
            //     'SELECT * FROM users'));

            //Check if email already exists
              if (rows.length > 0) {
                return new Response(JSON.stringify({ message: 'request successful' }), {
                  status: 200,
                });
              }
              return new Response(JSON.stringify({ message: 'resource not found' }), {
                status: 404,
              });
              
    } catch (error) {
        console.error('DB error in GET:', error);
        return new Response(JSON.stringify({ message: 'Server error' }), {
            status: 500,
        });
    }

    console.log(searchParams, email)
}

export async function POST(req) {
  const body = await req.json();
  const { name, email, password, image = null, zone_id = null } = body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.execute(
      `INSERT INTO users (name, email, password, image, zone_id)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, image, zone_id]
    );

    return new Response(JSON.stringify({ message: 'User created', userId: result.insertId }), {
      status: 201,
    });

  } catch (error) {
    console.error('DB error:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
