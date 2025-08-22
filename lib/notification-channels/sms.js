// lib/sms.js
import { Vonage } from '@vonage/server-sdk';

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
});

export function sendSMS(to, text) {
  return new Promise((resolve, reject) => {
    vonage.sms.send({ to, from: "EventSys", text }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}
