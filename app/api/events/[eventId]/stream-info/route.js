// app/api/events/[eventId]/stream-info/route.js

import db from '@/lib/db';
import { isAuthenticatedV2, isAuthorizedV2 } from '@/lib/security/auth';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { eventId } = params;

    // 🔐 Extract token from Authorization header
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    // ✅ Check authentication
    const auth = await isAuthenticatedV2(token);
    if (!auth.ok) return auth.response;

    const user = auth.user;
    console.log(user);

    // ✅ Check authorization
    if (!isAuthorizedV2(user, ['zone_event_manager', 'general_event_manager'])) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    // 📦 Fetch stream data
    let query;
    let values;

    if (user.role === 'general_event_manager') {
      // General manager can access any event
      query = 'SELECT stream_key, stream_url FROM events WHERE id = ?';
      values = [eventId];
    } else {
      // Zone manager must be the event organizer
      query = 'SELECT stream_key, stream_url FROM events WHERE id = ? AND organizer_id = ?';
      values = [eventId, user.id];
    }

    const [rows] = await db.execute(query, values);


    // ✅ Return the stream info
    return NextResponse.json(rows[0], { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
