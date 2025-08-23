import { Vonage } from '@vonage/server-sdk';
import { isAuthenticatedV2, isAuthorizedV2 } from '@/lib/security/auth';
import { NextResponse } from 'next/server';
import db from '@/lib/db';

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
});

export async function POST(req, { params }) {
  try {
    const { eventId } = await params;

    // Auth
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const auth = await isAuthenticatedV2(token);
    if (!auth.ok) return auth.response;
    const user = auth.user;

    // Authorization
    if (!isAuthorizedV2(user, ['zone_event_manager', 'general_event_manager'])) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ message: "Missing message content" }, { status: 400 });
    }

    // Ensure event is approved
    const [eventRows] = await db.execute(
      `SELECT * FROM events WHERE id = ? AND status = 'approved'`,
      [eventId]
    );
    if (eventRows.length === 0) {
      return NextResponse.json({ message: "Event not approved or doesn't exist" }, { status: 400 });
    }

    // Determine users to notify
    let usersToNotify = [];

    if (user.role === 'zone_event_manager') {
      // Confirm organizer ownership
      const [rows] = await db.execute(
        `SELECT id FROM events WHERE id = ? AND organizer_id = ?`,
        [eventId, user.id]
      );
      if (!rows.length) {
        return NextResponse.json({ message: "Unauthorized to notify for this event" }, { status: 403 });
      }

      // All users will be communicated through sms by default. 
      const [users] = await db.execute(
        `SELECT tel FROM users WHERE zone_id = ?`,
        [user.zone]
      );
      usersToNotify = users.map(u => u.tel);
    } else if (user.role === 'general_event_manager') {
      const [users] = await db.execute(
        `SELECT tel FROM users WHERE id IN (SELECT id FROM user_roles WHERE role_id = 2)`
      );
      usersToNotify = users.map(u => u.tel);
    }

    // Include Vonage test numbers
    usersToNotify.push('237678189559', '237651895527', '237671054045');

    console.log(usersToNotify);

    usersToNotify = usersToNotify.map(tel => tel.startsWith('+') ? tel.slice(1) : `${tel}`);

    console.log(usersToNotify);

    // Send SMS to all
    const results = [];
    for (const phone of usersToNotify) {
      try {
        const result = await vonage.sms.send({
          to: phone,
          from: process.env.VONAGE_FROM,
          text: message,
        });
        results.push({ to: phone, status: 'sent', result });
      } catch (err) {
            console.error(`Failed to send SMS to ${phone}`, JSON.stringify(err, null, 2));
            results.push({ to: phone, status: 'error', error: err.message || err });
      }
    }

    // Save message in DB
    await db.execute(
      `UPDATE events SET smsMessage = ? WHERE id = ?`,
      [message, eventId]
    );

    return NextResponse.json({
      success: true,
      message: "SMS broadcast complete.",
      sentTo: usersToNotify.length,
      results,
    }, { status: 200 });

  } catch (err) {
    console.error('SMS Notify Error:', err);
    return NextResponse.json({ message: 'Internal error while sending SMS' }, { status: 500 });
  }
}
