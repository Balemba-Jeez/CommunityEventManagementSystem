import db from '@/lib/db';
import { isAuthenticatedV2, isAuthorizedV2 } from '@/lib/security/auth';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { eventId } = params;

    // Auth
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const auth = await isAuthenticatedV2(token);
    if (!auth.ok) return auth.response;
    const user = auth.user;

    // Only managers
    if (!isAuthorizedV2(user, ['zone_event_manager', 'general_event_manager'])) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    // Zone manager: check event ownership
    if (isAuthorizedV2(user, ['zone_event_manager'])) {
      const [eventRows] = await db.execute(
        `SELECT id FROM events WHERE id = ? AND organizer_id = ?`,
        [eventId, user.id]
      );
      if (eventRows.length === 0) {
        return NextResponse.json({ success: false, message: 'Event not found or unauthorized' }, { status: 404 });
      }
    }

    // Fetch participants
    const [participants] = await db.execute(
      `SELECT u.* 
       FROM users u 
       JOIN participations p ON u.id = p.user_id 
       WHERE p.event_id = ?`,
      [eventId]
    );

    return NextResponse.json(
      {
        success: true,
        message: participants.length > 0
          ? 'Participants retrieved successfully'
          : 'No participants found',
        participants,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}