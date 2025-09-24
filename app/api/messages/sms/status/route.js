export async function POST(req) {
  const formData = await req.formData();
  const body = Object.fromEntries(formData); // convert FormData to plain object

  console.log("📦 SMS status update:", body);

  // Example: save to DB or log
  // body.status could be "delivered", "failed", "accepted" etc.
  // body.messageId identifies the SMS
  // body['network-code'] gives carrier info

  return new Response("OK");
}
