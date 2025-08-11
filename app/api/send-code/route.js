import db from '@/lib/db';

import { sendVerificationEmail } from '@/lib/mailer';
import generateCode from '@/lib/generateCode';

export async function POST(req) {
  const { email } = await req.json();


  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
  }

  // Generate 6-digit code
  const code = generateCode(6);

  // Set expiry time (e.g., 4 minutes from now)
  const expires = new Date(Date.now() + 4 * 60 * 1000);
  console.log(expires);

  // Save to database
  await db.execute(
    'INSERT INTO verifications (email, code, expires_at) VALUES (?, ?, ?)',
    [email, code, expires]
  );

  // Send code by email
  await sendVerificationEmail(email, code);

  return new Response(JSON.stringify({ message: 'Code sent successfully', expire_min: '4' }), { status: 200 });
}
