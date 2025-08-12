import db from '@/lib/db';

import { sendVerificationEmail } from '@/lib/mailer';
import generateCode from "@/lib/security/generateCode"
import getExpirationTime from '@/lib/security/generateCodeTimeFrame';

export async function POST(req) {
  const { email } = await req.json();


  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
  }

  // Generate email_verification code
  const code = generateCode("email_verification");

  // Set expiry time for email_verification
  const expires = getExpirationTime("email_verification");
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
