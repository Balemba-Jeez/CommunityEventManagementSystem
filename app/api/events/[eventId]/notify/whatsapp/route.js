import { Vonage } from '@vonage/server-sdk';
import { isAuthenticatedV2, isAuthorizedV2 } from '@/lib/security/auth';
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import axios from "axios";

const jwt = process.env.VONAGE_JWT; // Already generated JWT
const from = process.env.VONAGE_FROM_WHATSAPP; // Your sandbox WhatsApp number

// const vonage = new Vonage({
//   apiKey: process.env.VONAGE_API_KEY,
//   apiSecret: process.env.VONAGE_API_SECRET
// });

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

      // Collect users who's channel = whatsapp. 
      const [users] = await db.execute(
        `SELECT tel FROM users WHERE zone_id = ? AND preferred_channel = 'email'`,
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
    usersToNotify.push('237678189559', '237670934331', '237671054045');

    console.log(usersToNotify);

    usersToNotify = usersToNotify.map(tel => tel.startsWith('+') ? tel.slice(1) : `${tel}`);

    console.log(usersToNotify);

    // Send messages to all whatsapp users
    const results = [];


    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // for (const phone of usersToNotify) {
    //   try {
    //     const response = await axios.post(
    //       "https://messages-sandbox.nexmo.com/v1/messages",
    //       {
    //         from,
    //         to: phone,
    //         channel: "whatsapp",
    //         whatsapp: {
    //           policy: "deterministic",
    //           locale: ""
    //         },
    //         message_type: "template",
    //         template: {
    //           name: "whatsapp:hsm:technology:nexmo:verify",
    //           parameters: [
    //             "pc-events notify",
    //             "123456",
    //             "10",
    //           ],
    //         },
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${jwt}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     results.push({
    //       to: phone,
    //       status: "sent",
    //       message: "WhatsApp message sent via sandbox.",
    //       data: response.data,
    //     });
    //   } catch (err) {
    //     console.error(
    //       `Failed to send WhatsApp (sandbox) message to ${phone}`,
    //       err.response?.data || err.message
    //     );

    //     results.push({
    //       to: phone,
    //       status: "error",
    //       message: "Failed to send WhatsApp (sandbox) message.",
    //       error: err.response?.data || err.message,
    //     });
    //   }

    //   // 👇 wait 1 second before sending to the next phone
    //   await delay(1000);
    // }

    for (const phone of usersToNotify) {
        try {
          const response = await axios.post(
            "https://messages-sandbox.nexmo.com/v1/messages",
            {
              from,                  // Sandbox number, e.g., 14157386102
              to: phone,             // Recipient number, country code without '+'
              channel: "whatsapp",
              message_type: "text",
              text: `Event "${eventRows.title}" (ID: ${eventRows.id}) is happening soon!`
            },
            {
              auth: {
                username: process.env.VONAGE_API_KEY,     // ea9f9b39 in your example
                password: process.env.VONAGE_API_SECRET   // your API secret
              },
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              }
            }
          );

          results.push({
            to: phone,
            status: "sent",
            message: "WhatsApp text message sent via sandbox.",
            data: response.data,
          });
        } catch (err) {
          console.error(
            `Failed to send WhatsApp (sandbox) message to ${phone}`,
            err.response?.data || err.message
          );

          results.push({
            to: phone,
            status: "error",
            message: "Failed to send WhatsApp (sandbox) message.",
            error: err.response?.data || err.message,
          });
        }

        // Wait 1 second before sending to the next phone to avoid 429 rate limit
        await delay(1000);
  }



    // Save message in DB
    await db.execute(
      `UPDATE events SET whatsappMessage = ? WHERE id = ?`,
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
