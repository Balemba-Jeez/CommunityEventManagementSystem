
export async function DELETE(req, { params }) {
  try {
    const { id: eventId } = params;

    // Authentication
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const auth = isAuthenticated(token);
    if (!auth.ok) return auth.response;
    const user = auth.user;

    // Authorization
    if (!isAuthorized(user, ['zone_event_manager', 'general_event_manager'])) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Update participation status to 'cancelled'
    const [result] = await db.execute(
      `UPDATE participations 
       SET status='cancelled', updated_at=CURRENT_TIMESTAMP 
       WHERE user_id=? AND event_id=?`,
      [user.id, eventId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Participation not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Participation cancelled' }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}