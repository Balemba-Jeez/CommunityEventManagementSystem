import { Vonage } from '@vonage/server-sdk';
import db from '@/lib/db';
import generateCode from '@/lib/security/generateCode';
import getExpirationTime from '@/lib/security/generateCodeTimeFrame';

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
});

export async function POST(req) {
  try {
    const { number } = await req.json();

    if (!number) {
      return new Response(JSON.stringify({ error: 'Number is required' }), { status: 400 });
    }

    // Generate verification code
    const code = generateCode('whatsapp_verification');
    const expires = getExpirationTime('whatsapp_verification');

    // Save code to DB
    await db.execute(
      `INSERT INTO whatsapp_verifications (number, code, expires_at) VALUES (?, ?, ?)`,
      [number, code, expires]
    );

    // Send code via WhatsApp
    await vonage.messages.send({
      to: number.replace(/^\+/, ''), // E.164 without +
      from: process.env.VONAGE_WHATSAPP_SANDBOX,
      channel: 'whatsapp',
      message: {
        content: {
          type: 'text',
          text: `Your verification code is: ${code}. It expires in 5 minutes.`
        }
      }
    });

    return new Response(JSON.stringify({ message: 'Verification code sent' }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to send WhatsApp verification code' }), { status: 500 });
  }
}
