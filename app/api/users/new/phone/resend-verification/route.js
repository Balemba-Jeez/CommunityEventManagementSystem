// /api/users/resend-phone-verification/route.js
import db from '@/lib/db';
import { Vonage } from '@vonage/server-sdk';
import generateCode from '@/lib/security/generateCode';
import { NextResponse } from 'next/server';

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

export async function POST(req) {
  try {
    const { userId, phone } = await req.json();

    if (!userId || !phone) {
      return NextResponse.json({ error: 'Phone and userId are required' }, { status: 400 });
    }

    const code = generateCode('phone_verification');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Optionally mark previous codes as used or invalid
    await db.execute(`UPDATE phone_verifications SET used = 1 WHERE user_id = ? AND phone = ?`, [userId, phone]);

    // Save new code
    await db.execute(
      `INSERT INTO phone_verifications (user_id, phone, code, expires_at) VALUES (?, ?, ?, ?)`,
      [userId, phone, code, expiresAt]
    );

    // Send SMS
    await vonage.sms.send({
      to: phone,
      from: process.env.VONAGE_FROM,
      text: `Your new verification code is: ${code}. It expires in 5 minutes.`,
    });

    return NextResponse.json({ message: 'Verification code resent' }, { status: 200 });

  } catch (err) {
    console.error('Resend phone verification error:', err);
    return NextResponse.json({ error: 'Failed to resend code' }, { status: 500 });
  }
}
