import db from '@/lib/db';

export async function POST(req) {
  const { phoneNumber, code } = await req.json();
  
  //check existence of code which has not expired and is correct
  const [rows] = await db.execute(
    'SELECT * FROM phone_verifications WHERE phone_number = ? AND code = ? AND expires_at >= NOW()',
    [phoneNumber, code]
  );
  
  //check if result(rows) is empty implying code is wrong or expired.
  if (rows.length === 0) {
    return new Response(JSON.stringify({ error: 'Invalid or expired code' }), { status: 400 });
  }

  // delete the code after successful verification
  await db.execute('DELETE FROM phone_verifications WHERE phone_number = ?', [phoneNumber]);

  return new Response(JSON.stringify({ message: 'Phone number verified!' }), { status: 200 });
}
