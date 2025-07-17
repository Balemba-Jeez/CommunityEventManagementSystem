import db from '@/lib/db';

export async function POST(req) {
  const { email, code } = await req.json();
  
  //check if code has not expired
  const [rows] = await db.execute(
    'SELECT * FROM verifications WHERE email = ? AND code = ? AND expires_at > NOW()',
    [email, code]
  );
  
  
  if (rows.length === 0) {
    return new Response(JSON.stringify({ error: 'Invalid or expired code' }), { status: 400 });
  }

  return new Response(JSON.stringify({ message: 'Email verified!' }), { status: 200 });
}
