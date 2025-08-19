import db from '@/lib/db';
import { isAuthenticated, isAuthenticatedV2, isAuthorized, isAuthorizedV2 } from '@/lib/security/auth';
import { NextResponse } from 'next/server';
import { getEventStatus } from '@/lib/utils/events';


// Create particpation (Join event) 
export async function POST(req, { params }) {
  try {
    const { eventId } = params;
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const auth = await isAuthenticatedV2(token);
    if (!auth.ok) return auth.response;
    const user = auth.user;

    if (!isAuthorizedV2(user, ['member'])) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Fetch event
    const [rows] = await db.execute(
      'SELECT id, start_time, end_time FROM events WHERE id = ?',
      [eventId]
    );
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    const event = rows[0];
    const eventStatus = getEventStatus(event.start_time, event.end_time);

    let newStatus;
    if (eventStatus === 'future') newStatus = 'confirmed';
    else if (eventStatus === 'ongoing') newStatus = 'attended';
    else return NextResponse.json({ message: 'Cannot join past event' }, { status: 400 });

    await db.execute(
      `INSERT INTO participations (user_id, event_id, status) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE status=?`,
      [user.id, eventId, newStatus, newStatus]
    );

    return NextResponse.json({ message: `Participation ${newStatus}` }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


// Cancel participation (Leave event)
export async function DELETE(req, { params }) {
  try {
    const { eventId } = params;

    // Authentication
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const auth = await isAuthenticatedV2(token);
    if (!auth.ok) return auth.response;
    const user = auth.user;

    // Authorization
    if (!isAuthorizedV2(user, ['member'])) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Fetch event
    const [rows] = await db.execute(
      'SELECT id, start_time, end_time FROM events WHERE id = ?',
      [eventId]
    );
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    const event = rows[0];
    const eventStatus = getEventStatus(event.start_time, event.end_time);

    let newStatus;
    if (eventStatus === 'future') newStatus = 'cancelled';
    else if (eventStatus === 'ongoing') newStatus = 'left';
    else return NextResponse.json({ message: 'Cannot cancel past event' }, { status: 400 });

    // Update participation
    const [result] = await db.execute(
      `UPDATE participations SET status=? WHERE user_id=? AND event_id=?`,
      [newStatus, user.id, eventId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Participation not found' }, { status: 404 });
    }

    return NextResponse.json({ message: `Participation ${newStatus}` }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


