import db from '@/lib/db';

export async function POST(req) {
  try {
    const { email, code } = await req.json();

    // Validate input
    if (!email || !code) {
      return new Response(
        JSON.stringify({ error: 'Email and code are required' }),
        { status: 400 }
      );
    }

    // Look up the verification record
    const [rows] = await db.execute(
      `SELECT id, code, expires_at FROM email_verifications WHERE email = ? ORDER BY expires_at DESC LIMIT 1`,
      [email]
    );

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No verification request found for this email' }),
        { status: 404 }
      );
    }

    const verification = rows[0];

    // Check code and expiration
    const now = new Date();
    if (verification.code !== code) {
      return new Response(
        JSON.stringify({ error: 'Invalid verification code' }),
        { status: 400 }
      );
    }

    if (now > new Date(verification.expires_at)) {
      return new Response(
        JSON.stringify({ error: 'Verification code has expired' }),
        { status: 400 }
      );
    }

    // Update user status to verified
    await db.execute(
      `UPDATE users SET is_verified = TRUE' WHERE email = ?`,
      [email]
    );

    
    await db.execute(
      `DELETE FROM email_verifications WHERE id = ?`,
      [verification.id]
    );

    return new Response(
      JSON.stringify({ message: 'Account verified successfully' }),
      { status: 200 }
    );

  } catch (err) {
    console.error('Error verifying email:', err);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
