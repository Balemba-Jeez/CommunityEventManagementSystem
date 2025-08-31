// /api/users/verify-phone-code/route.js
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userId, phone, code } = await req.json();

    if (!userId || !phone || !code) {
      return NextResponse.json({ error: 'userId, phone, and code are required' }, { status: 400 });
    }

    const [rows] = await db.execute(
      `SELECT id, code, expires_at FROM phone_verifications WHERE user_id = ? AND phone = ? AND used = 0 ORDER BY expires_at DESC LIMIT 1`,
      [userId, phone]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'No active verification request found' }, { status: 404 });
    }

    const verification = rows[0];
    const now = new Date();

    if (verification.code !== code) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    if (now > new Date(verification.expires_at)) {
      return NextResponse.json({ error: 'Verification code expired' }, { status: 400 });
    }

    // Mark code as used
    await db.execute(`UPDATE phone_verifications SET used = 1 WHERE id = ?`, [verification.id]);

    // Checks if user opted in for SMS
    const [channel] = await db.execute(
      `SELECT id FROM user_notification_channels WHERE user_id = ? AND channel_id = (SELECT id FROM channels WHERE name = 'sms')`,
      [userId]
    );

    // if (channel.length === 0) {
    //   return NextResponse.json({ message: 'Phone verified successfully' }, { status: 200 });
    // }


    // // Mark user SMS channel as verified
    // await db.execute(`UPDATE user_notification_channels SET verification_status = 'verified', is_active = 1 WHERE user_id = ? AND channel_id = (SELECT id FROM channels WHERE name = 'sms')`, [userId]);


    // Update user_notification_channel to verified if it exists
    await db.execute(
      `UPDATE user_notification_channels SET verification_status='verified', is_active=1 WHERE address = ? AND user_id = ? AND channel_id=(SELECT id FROM channels WHERE name='sms')`,
      [number, userId]
    );
    
    return NextResponse.json({ message: 'Phone verified successfully' }, { status: 200 });

  } catch (err) {
    console.error('Phone verification error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
