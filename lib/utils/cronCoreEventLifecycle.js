// lib/utils/cronCoreEventLifecycle.js
import 'dotenv/config';
import cron from 'node-cron';
import db from '../db.js';
import axios from 'axios';

console.log('Core Event Lifecycle Cron loaded...');

// --- Load channels from DB (sms, whatsapp, email) ---
async function getNotificationChannels() {
  const [rows] = await db.query('SELECT * FROM notification_channels');
  const channels = {};
  rows.forEach(ch => {
    channels[ch.name] = { ...ch, properties: JSON.parse(ch.properties) };
  });
  return channels;
}

// --- Send via SMS (Vonage) ---
async function sendSMS(channel, to, text) {
  try {
    await axios.post('https://rest.nexmo.com/sms/json', {
      api_key: channel.properties.api_key,
      api_secret: channel.properties.api_secret,
      from: channel.properties.from,
      to,
      text
    });
    console.log(`✅ SMS sent to ${to}`);
  } catch (err) {
    console.error(`❌ SMS failed to ${to}`, err.message);
  }
}

// --- Send via WhatsApp (Vonage Sandbox) ---
async function sendWhatsApp(channel, to, text) {
  try {
    await axios.post('https://messages-sandbox.nexmo.com/v0.1/messages', {
      from: { type: "whatsapp", number: channel.properties.from },
      to: { type: "whatsapp", number: to },
      message: {
        content: {
          type: "text",
          text
        }
      }
    }, {
      auth: {
        username: channel.properties.api_key,
        password: channel.properties.api_secret
      }
    });
    console.log(`✅ WhatsApp sent to ${to}`);
  } catch (err) {
    console.error(`❌ WhatsApp failed to ${to}`, err.message);
  }
}

// --- Send via Email (SendGrid) ---
async function sendEmail(channel, to, subject, html) {
  try {
    await axios.post('https://api.sendgrid.com/v3/mail/send', {
      personalizations: [{ to: [{ email: to }] }],
      from: { email: channel.properties.from },
      subject,
      content: [{ type: 'text/html', value: html }]
    }, {
      headers: { Authorization: `Bearer ${channel.properties.api_key}` }
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Email failed to ${to}`, err.message);
  }
}

// --- Main lifecycle processor ---
async function processEvent(event, channels) {
  // 1. Get members to notify
  const [members] = await db.query(
    event.zone_id === null
      ? 'SELECT * FROM users'
      : 'SELECT * FROM users WHERE zone_id = ?',
    event.scope === null ? [] : [event.zone_id]
  );

  // 2. Define messages based on state
  let subject, message;
  switch (event.state) {
    case 'scheduled':
      subject = `🎉 New Event: ${event.title}`;
      message = `A new event "${event.title}" is scheduled for ${event.date}. Location: ${event.location}`;
      break;
    case 'cancelled':
      subject = `⚠️ Event Cancelled: ${event.title}`;
      message = `We regret to inform you that the event "${event.title}" has been cancelled.`;
      break;
    case 'completed':
      subject = `✅ Event Completed: ${event.title}`;
      message = `Thank you for attending "${event.title}"! Stay tuned for more events.`;
      break;
    default:
      return; // Ignore other states
  }

  // 3. Send notifications per member preference
  for (const m of members) {
    if (m.pref_sms && channels.sms) {
      await sendSMS(channels.sms, m.phone, message);
    }
    if (m.pref_whatsapp && channels.whatsapp) {
      await sendWhatsApp(channels.whatsapp, m.phone, message);
    }
    if (m.pref_email && channels.email) {
      await sendEmail(channels.email, m.email, subject, `<p>${message}</p>`);
    }
  }
}

// --- Cron job to run every minute ---
export function startCoreEventLifecycleCron() {
  console.log('Core Event Lifecycle Cron started');

  cron.schedule("* * * * *", async () => {
    console.log("🔄 Checking events...");

    try {
      const channels = await getNotificationChannels();

      // Get events that are scheduled, cancelled, or completed
      const [events] = await db.query(
        "SELECT * FROM events WHERE state IN ('scheduled', 'cancelled', 'completed')"
      );

      for (const event of events) {
        await processEvent(event, channels);
      }
    } catch (err) {
      console.error("❌ Cron error:", err.message);
    }
  });
}

startCoreEventLifecycleCron();
