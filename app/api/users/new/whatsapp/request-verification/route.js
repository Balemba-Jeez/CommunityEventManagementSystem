import { Vonage } from '@vonage/server-sdk';
import db from '@/lib/db';
import generateCode from '@/lib/security/generateCode';
import getExpirationTime from '@/lib/security/generateCodeTimeFrame';
import axios from "axios";
import { formatToE164 } from '@/lib/utils/number';

export async function POST(req) {
  try {
    const { number } = await req.json();

    if (!number) {
      return new Response(JSON.stringify({ error: 'Number is required' }), { status: 400 });
    }

    number = formatToE164(number);

    // Generate verification code
    const code = generateCode('whatsapp_verification');
    const expires = getExpirationTime('whatsapp_verification');

    // Save code to DB
    await db.execute(
      `INSERT INTO whatsapp_verifications (number, code, expires_at) VALUES (?, ?, ?)`,
      [number, code, expires]
    );

    // Send code via WhatsApp
    const response = await axios.post(
      "https://messages-sandbox.nexmo.com/v1/messages",
      {
        from: process.env.VONAGE_FROM_WHATSAPP, // e.g. "14157386102"
        to: number, // WhatsApp recipient, e.g. "237691734590" (without +)
        channel: "whatsapp",
        message_type: "text",
        text: `Your verification code is: ${code}. It expires in 5 minutes.`
      },
      {
        auth: {
          username: process.env.VONAGE_API_KEY,   // ea9f9b39
          password: process.env.VONAGE_API_SECRET // API secret
        },
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
    );

    return new Response(JSON.stringify({ message: 'Verification code sent' }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to send WhatsApp verification code' }), { status: 500 });
  }
}
