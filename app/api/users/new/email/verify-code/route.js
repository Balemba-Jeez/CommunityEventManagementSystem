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

    // Look up verification record
    const [rows] = await db.query(
      `SELECT * FROM email_verifications
       WHERE email = ? AND code = ? AND used = 0
       ORDER BY created_at DESC LIMIT 1`,
      [email, code]
    );

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired code' }),
        { status: 400 }
      );
    }

    const verification = rows[0];

    // Mark verification as used
    await db.query(
      `UPDATE email_verifications SET used = 1 WHERE id = ?`,
      [verification.id]
    );

    // Update user table (email verified)
    await db.query(
      `UPDATE users SET is_verified = 1 WHERE email = ?`,
      [email]
    );

    // // Checks if user opted in for email
    // const [channel] = await db.execute(
    //   `SELECT id FROM user_notification_channels WHERE user_id = ? AND channel_id = (SELECT id FROM channels WHERE name = 'email')`,
    //   [userId]
    // );

    // if (channel.length === 0) {
    //   return NextResponse.json({ error: 'User has not opted in for Email' }, { status: 400 });
    // }


    // Inherit verification for notification channel (email)
    // await db.query(
    //   `UPDATE user_notification_channels
    //    SET is_verified = 1
    //    WHERE channel_type = 'email'
    //      AND channel_value = ?
    //      AND user_id = (SELECT id FROM users WHERE email = ?)`,
    //   [email, email]
    // );


    // Update user_notification_channel to verified if it exists
    await db.execute(
      `UPDATE user_notification_channels SET verification_status='verified', is_active=1 WHERE address=? AND channel_id=(SELECT id FROM notification_channels WHERE name='email')`,
      [email]
    );

    return new Response(
      JSON.stringify({ success: true, message: 'Email verified successfully' }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Verification error:', error);
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500 }
    );
  }
}
