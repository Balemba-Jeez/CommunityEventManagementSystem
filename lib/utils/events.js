
export function getEventStatus(start, end) {
  const now = new Date();
  if (now < new Date(start)) return 'future';
  if (now >= new Date(start) && now <= new Date(end)) return 'ongoing';
  return 'past';
}
