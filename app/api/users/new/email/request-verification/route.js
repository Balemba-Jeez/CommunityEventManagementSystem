import db from '@/lib/db';
import generateCode from "@/lib/security/generateCode";
import getExpirationTime from '@/lib/security/generateCodeTimeFrame';
import mailer from "@/lib/mail";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    // Check if a verified user already exists
    const [verifiedUsers] = await db.execute(
      'SELECT id FROM users WHERE email = ? AND is_verified = 1',
      [email]
    );

    if (verifiedUsers.length > 0) {
      return new Response(
        JSON.stringify({ error: 'Email is already registered and verified' }),
        { status: 409 }
      );
    }

    // Generate email verification code
    const code = generateCode("email_verification");

    // Set expiry time
    const expires = getExpirationTime("email_verification");

    // Save code to database
    await db.execute(
      'INSERT INTO email_verifications (email, code, expires_at) VALUES (?, ?, ?)',
      [email, code, expires]
    );

    // Send verification email
    await mailer.sendVerificationEmail(email, code, 1);

    return new Response(JSON.stringify({ message: 'Code sent successfully', expire_min: 60 }), { status: 200 });

  } catch (error) {
    console.error('Error sending verification code:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
