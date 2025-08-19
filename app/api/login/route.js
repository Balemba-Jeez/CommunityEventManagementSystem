import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateTokenV2 } from '@/lib/security/token';


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
    
    // Fetch user role
    const [userRoles] = await db.execute(
        `select roles.name 
            from 
                users join user_roles on users.id = user_roles.user_id 
                join roles on user_roles.role_id = roles.id where users.id = ?`
    , 
    [user.id]
    );

    console.log(userRoles);

 if (userRoles.length === 0) {
      return Response.json({ message: 'No roles assigned' }, { status: 403 });
    }

    // Temporary token (just for confirming role)
    const tempToken = await generateTokenV2("login_session", {
      id: user.id,
      email: user.email,
      roles: userRoles.map(r => r.name),
      zone: user.zone_id
    });

    return Response.json({
      message: "Login step 1 successful. Please confirm role.",
      tempToken,
      roles: userRoles.map(r => r.name) // send available roles
    });

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
