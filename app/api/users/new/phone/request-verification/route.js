// /api/users/request-phone-verification/route.js
import { Vonage } from '@vonage/server-sdk';
import db from '@/lib/db';
import generateCode from '@/lib/security/generateCode'; // your 6-digit code generator
import { NextResponse } from 'next/server';

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

export async function POST(req) {
  try {
    const { userId, phone } = await req.json();

    if (!phone || !userId) {
      return NextResponse.json({ error: 'Phone and userId are required' }, { status: 400 });
    }

    const code = generateCode('phone_verification'); // e.g., 6-digit code
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    // Save code in DB
    await db.execute(
      `INSERT INTO phone_verifications (user_id, phone, code, expires_at) VALUES (?, ?, ?, ?)`,
      [userId, phone, code, expiresAt]
    );

    // Send SMS
    await vonage.sms.send({
      to: phone,
      from: process.env.VONAGE_FROM,
      text: `Your verification code is: ${code}. It expires in 5 minutes.`,
    });

    return NextResponse.json({ message: 'Verification code sent' }, { status: 200 });

  } catch (err) {
    console.error('Phone verification request error:', err);
    return NextResponse.json({ error: 'Failed to send verification code' }, { status: 500 });
  }
}
