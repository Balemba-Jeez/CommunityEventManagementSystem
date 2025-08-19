import db from '@/lib/db';
import { isAuthenticated, isAuthenticatedV2, isAuthorized, isAuthorizedV2 } from '@/lib/security/auth';
import { NextResponse } from 'next/server';
import { getEventStatus } from '@/lib/utils/events';


// --- JOIN / REJOIN ---
export async function POST(req, { params }) {
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

    // Event status
    const status = await getEventStatus(eventId);
    if (!status) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    if (status === 'past') {
      return NextResponse.json({ message: 'Cannot join past event' }, { status: 400 });
    }

    // Transition
    const participationStatus = status === 'future' ? 'confirmed' : 'attended';

    // Upsert participation
    await db.execute(
      `INSERT INTO participations (user_id, event_id, status)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE status = VALUES(status)`,
      [user.id, eventId, participationStatus]
    );

    return NextResponse.json(
      { message: `Participation ${participationStatus}` },
      { status: 201 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// --- CANCEL / LEAVE ---
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

    // Event status
    const status = await getEventStatus(eventId);
    if (!status) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    if (status === 'past') {
      return NextResponse.json({ message: 'Cannot cancel past event' }, { status: 400 });
    }

    // Transition
    const participationStatus = status === 'future' ? 'cancelled' : 'left';

    const [result] = await db.execute(
      `UPDATE participations 
       SET status=? 
       WHERE user_id=? AND event_id=?`,
      [participationStatus, user.id, eventId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Participation not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: `Participation ${participationStatus}` },
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}