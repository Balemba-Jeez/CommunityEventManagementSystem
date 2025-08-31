// Handles incoming messages (e.g. replies from users via WhatsApp)
export async function POST( req ) {
  const body = await req.json();
  console.log("📥 Inbound sms received:", body);

  // You can add your logic here: save to DB, send response, etc.
  return new Response("Inbound sms received", { status: 200 });
}
