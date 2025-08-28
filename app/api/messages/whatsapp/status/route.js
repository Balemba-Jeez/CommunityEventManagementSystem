// Handles delivery reports: delivered, failed, read...
export async function POST(req) {
  const body = await req.json();
  console.log("📦 Message status update:", body);

  // Handle message status updates (log, save to DB, etc.)
  return new Response("Status update received", { status: 200 });
}
