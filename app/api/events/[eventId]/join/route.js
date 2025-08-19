import db from '@/lib/db';
import { isAuthenticated, isAuthenticatedV2, isAuthorized } from '@/lib/security/auth';
import { NextResponse } from 'next/server';


export async function POST(req, { params }) {
  try {
    const { id: eventId } = params;

    // Authentication
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const auth = await isAuthenticatedV2(token);
    if (!auth.ok) return auth.response;
    const user = auth.user;

    console.log(user);

    // Authorization
    if (!isAuthorized(user, ['member'])) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Check if event exists
    const [eventRows] = await db.execute('SELECT id FROM events WHERE id = ?', [eventId]);
    if (eventRows.length === 0) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    // Insert participation or update if exists

      const [participations] = await db.execute(
        `INSERT INTO participations (user_id, event_id, status) VALUES (?, ?, 'confirmed')
         `,
        [user.id, eventId]
      );

    return NextResponse.json({ message: 'Participation confirmed', participation: participations }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


