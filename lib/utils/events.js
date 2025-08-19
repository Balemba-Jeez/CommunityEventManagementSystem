
// export function getEventStatus(start, end) {
//   const now = new Date();
//   if (now < new Date(start)) return 'future';
//   if (now >= new Date(start) && now <= new Date(end)) return 'ongoing';
//   return 'past';
// }

// get event status
async function getEventStatus(eventId) {
  const [rows] = await db.execute(
    `SELECT start_time, end_time 
     FROM events 
     WHERE id = ?`,
    [eventId]
  );
  if (rows.length === 0) return null;

  const event = rows[0];
  const now = new Date();

  if (now < new Date(event.start_time)) return 'future';
  if (now >= new Date(event.start_time) && now <= new Date(event.end_time)) return 'ongoing';
  return 'past';
}