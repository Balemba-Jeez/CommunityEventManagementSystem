import db from '@/lib/db';
import { formatToE164 } from '@/lib/utils/number';

export async function POST(req) {
  try {
    const { number, code } = await req.json();

    if (!number || !code) return new Response(JSON.stringify({ error: 'Number and code required' }), { status: 400 });


    const [rows] = await db.execute(
      `SELECT id, code, expires_at, used FROM whatsapp_verifications WHERE number = ? ORDER BY expires_at DESC LIMIT 1`,
      [number]
    );

    if (!rows.length) return new Response(JSON.stringify({ error: 'No verification request found' }), { status: 404 });

    const verification = rows[0];

    if (verification.used) return new Response(JSON.stringify({ error: 'Code already used' }), { status: 400 });

    const now = new Date();
    if (verification.code !== code) return new Response(JSON.stringify({ error: 'Invalid code' }), { status: 400 });
    if (now > new Date(verification.expires_at)) return new Response(JSON.stringify({ error: 'Code expired' }), { status: 400 });

    // Mark as used
    await db.execute(`UPDATE whatsapp_verifications SET used = 1 WHERE id = ?`, [verification.id]);

    number = formatToE164(number);
    // Update user_notification_channel to verified if it exists
    await db.execute(
      `UPDATE user_notification_channels SET verification_status='verified', is_active=1 WHERE address=? AND channel_id=(SELECT id FROM notification_channels WHERE name='whatsapp')`,
      [number]
    );

    return new Response(JSON.stringify({ message: 'WhatsApp verified successfully' }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Verification failed' }), { status: 500 });
  }
}
