import db from '@/lib/db';
import { verifyToken } from '@/lib/auth'; 


export async function GET(req, context) {

 try {

    const { params } = await context;

    const { id } = await params;

    const {searchParams} = new URL(req.url);
    const email = searchParams.get('email'); // get paramaters(email)
    const req_role = searchParams.get('role');

    // Get token from request header
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1]; // Bearer <token>

        // If we have email parameter then that means we do email existence check
        if (email) { 

            // console.log('query results',await db.execute(
            //     'SELECT * FROM users'));

                const [results] = await db.execute(
                        'SELECT * FROM users where email = ?', [email]);

                //Check if email already exists
                if (results.length > 0) {
                    return new Response(JSON.stringify({ message: 'request successful'}), {
                    status: 200,
                    });
                }
                return new Response(JSON.stringify({ message: 'resource not found' }), {
                    status: 404,
                });
        }

        // Verify token
        const user = verifyToken(token);

        console.log('Requested user id:', id);
        console.log('user-token',user)

        if (!user) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        //Token role
        const { name:role } = user.role[0]

        // Get all accounts if role is admin
        if (role === 'admin') {


            // Get all accounts for all the zones based on a given role (visitor, member, zone_event_manager, general_event_manager, admin)
                if (role) {
                    const [rows] = await db.execute(
                        `SELECT 
                        zones.name AS zone_name,
                        users.id AS user_id,
                        users.name AS user_name,
                        users.email AS user_email,
                        users.tel AS user_tel,
                        users.image AS user_image,
                        users.status AS user_status,
                        users.created_at AS user_created_at,
                        roles.name AS role_name 
                        FROM users
                            LEFT JOIN zones ON zones.id = users.zone_id
                            LEFT JOIN user_roles ON users.id = user_roles.user_id
                            LEFT JOIN roles ON user_roles.role_id = roles.id
                    WHERE roles.name = ?
                    `, 
                    [req_role]
                    )

                    if (rows.length > 0) {
                        return new Response(JSON.stringify({message: "request successful", accounts: rows}), {status: 200});
                    }

                    return new Response(JSON.stringify({message: "resource not found"}), {status: 404});
                    
                }

            //Get all accounts for all the zones with their roles
                const [rows] = await db.execute(
                    `SELECT 
                        zones.name AS zone_name,
                        users.id AS user_id,
                        users.name AS user_name,
                        users.email AS user_email,
                        users.tel AS user_tel,
                        users.image AS user_image,
                        users.status AS user_status,
                        users.created_at AS user_created_at,
                        roles.name AS role_name 
                    FROM users
                            LEFT JOIN zones ON zones.id = users.zone_id
                            LEFT JOIN user_roles ON users.id = user_roles.user_id
                            LEFT JOIN roles ON user_roles.role_id = roles.id
                    `
                )

                if (rows.length > 0) {
                    return new Response(JSON.stringify({message: "request successful", accounts: rows}), {status: 200});
                }

                return new Response(JSON.stringify({message: "resource not found"}), {status: 404});                 

        } else if (['member', 'zone_event_manager', 'general_event_manager', 'visitor'].includes(role)) {

            // check that user can only access their own data
            if (user.id !== Number(id)) {
                return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
            }
        
            const [rows] = await db.execute(
                `SELECT 
                    zones.name AS zone_name,
                    users.id AS user_id,
                    users.name AS user_name,
                    users.email AS user_email,
                    users.tel AS user_tel,
                    users.image AS user_image,
                    users.status AS user_status,
                    users.created_at AS user_created_at,
                    roles.name AS role_name 
                FROM users
                        LEFT JOIN zones ON zones.id = users.zone_id
                        LEFT JOIN user_roles ON users.id = user_roles.user_id
                        LEFT JOIN roles ON user_roles.role_id = roles.id
                WHERE users.id = ?
                `, 
                [id]
            );
        
            if (rows.length > 0) {
                return new Response(JSON.stringify({ message: "request successful", accounts: rows }), { status: 200 });
            }
        
            return new Response(JSON.stringify({ message: "resource not found" }), { status: 404 });

        

        } else {

            return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
          }

                
        } catch (error) {
            console.error('DB error in GET:', error);
            return new Response(JSON.stringify({ message: 'Server error' }), {
                status: 500,
            });
        }
    

    
}


export async function PUT(req, { params }) {
    try {
        const body = await req.json();
        const { status } = body;
        const { id } = params;
        // Get token from request header
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.split(' ')[1]; // Bearer <token>

        // Verify token
        const user = verifyToken(token);
        console.log('user-token',user)
        if (!user) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        const { name:role } = user.role[0]

        // update if role is admin
        if (role === 'admin') {

            // Update status in database
            const [result] = await db.execute(
                `UPDATE users SET status = ? WHERE id = ?`,
                [status, id]
            );
    
            console.log(result);
        
            if (result.affectedRows === 0) {
                return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
            }
        
            return new Response(JSON.stringify({ message: 'Status updated successfully' }), {
                status: 200,
            });
            
          }else{

            return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
          }

    
 
    
      } catch (error) {
        console.error('Update error:', error);
        return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
      }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    // (Optional) Extract token from headers and verify
    const token = req.headers.get('authorization')?.split(' ')[1];
    const user = verifyToken(token);

    if (user.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });
    }

    const [result] = await db.execute(`DELETE FROM users WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'User deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
