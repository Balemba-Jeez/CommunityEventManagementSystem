// lib/whatsapp.js (using Twilio)
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export function sendWhatsApp(to, message) {
  return client.messages.create({
    from: 'whatsapp:+14155238886', // Twilio sandbox number
    to: `whatsapp:${to}`,
    body: message
  });
}
