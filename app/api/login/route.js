import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateTokenV2 } from '@/lib/security/token';

const SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const body = await req.json();
  const { email, password} = body;

  try {
    // Fetch user by email
    const [rows] = await db.execute(
      'SELECT id, name, email, password, image, zone_id, status, is_verified FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        status: 401,
      });
    }

    const user = rows[0];
    console.log(user, !user.is_verified);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        status: 401,
      });
    }

    if (!user.is_verified) {
        return new Response(JSON.stringify({ message: 'Account not verified' }), {
          status: 401,
        });
      }    

    if (user.status !== 'active') {
        return new Response(JSON.stringify({ message: 'Account not active' }), {
          status: 401,
        });
      }
    
    //fetch user role
    const [userRoles] = await db.execute(
        `select roles.name 
            from 
                users join user_roles on users.id = user_roles.user_id 
                join roles on user_roles.role_id = roles.id where users.id = ?`
    , 
    [user.id]
    );

    console.log(userRoles);

    const payload =       {
        id: user.id,
        email: user.email,
        role: userRoles,
        zone: user.zone_id
      }

    // Create JWT token
    // const token = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //     role: userRoles,
    //     zone: user.zone_id
    //   },
    //   SECRET,
    //   { expiresIn: '1d' }
    // );
    //git add . && git commit -m "adding method to get events" && git push -u CEM backend

    const token = await generateTokenV2("login", payload);

    // 4. Return token + basic user info
    return new Response(
      JSON.stringify({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          zone_id: user.zone_id,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}
