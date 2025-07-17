import db from '@/lib/db';
import { NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req) {
  const body = await req.json();
  const { phoneNumber } = body;

  if (!phoneNumber) {
    return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  const expiresAt = new Date(Date.now() + 4 * 60 * 1000); // expires in 4 minutes

  try {
    // Save code to DB
    await db.execute(
      `INSERT INTO phone_verifications (phone_number, code, expires_at)
       VALUES (?, ?, ?)`,
      [phoneNumber, code, expiresAt]
    );

    // Send SMS
    await client.messages.create({
      body: `Your verification code is ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    return NextResponse.json({ message: 'Verification code sent', expire_min: '4'  });
  } catch (error) {
    console.error('SMS Error:', error);
    return NextResponse.json({ message: 'Failed to send code'}, { status: 500 });
  }
}
