export async function POST(req) {
  try {
    const { number } = await req.json();

    if (!number) return new Response(JSON.stringify({ error: 'Number is required' }), { status: 400 });

    // Same as request: generate new code & send
    const code = generateCode('whatsapp_verification');
    const expires = getExpirationTime('whatsapp_verification');

    await db.execute(
      `INSERT INTO whatsapp_verifications (number, code, expires_at) VALUES (?, ?, ?)`,
      [number, code, expires]
    );

    await vonage.messages.send({
      to: number.replace(/^\+/, ''),
      from: process.env.VONAGE_WHATSAPP_SANDBOX,
      channel: 'whatsapp',
      message: { content: { type: 'text', text: `Your new verification code is: ${code}.` } }
    });

    return new Response(JSON.stringify({ message: 'Verification code resent' }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to resend code' }), { status: 500 });
  }
}
