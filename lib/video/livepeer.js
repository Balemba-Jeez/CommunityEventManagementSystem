// lib/video/livepeer.js
import 'dotenv/config'; // for cron runs
import db from '../db.js';

// Uses Node 18+ global fetch
const LIVEPEER_API = 'https://livepeer.studio/api';

export async function createLivepeerStreamForEvent(eventId, name = '') {
  const res = await fetch(`${LIVEPEER_API}/stream`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${process.env.LIVEPEER_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name: name || `event-${eventId}-${Date.now()}`,
      // optional: custom transcoding profiles
      profiles: [
        { name: '720p', bitrate: 2000000, fps: 30, width: 1280, height: 720 },
        { name: '480p', bitrate: 1000000, fps: 30, width: 854, height: 480 },
        { name: '360p', bitrate: 600000, fps: 30, width: 640, height: 360 },
      ],
      record: false, // set true if you want VOD recording
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Livepeer create stream failed: ${res.status} ${t}`);
  }

  const data = await res.json();
  // Typical fields: id, streamKey, playbackId
  const playbackUrl = `https://livepeercdn.com/hls/${data.playbackId}/index.m3u8`;

  // Persist on the event
  await db.execute(
    `UPDATE events
       SET live_provider = 'livepeer',
           live_stream_id = ?,
           live_stream_key = ?,
           live_playback_id = ?,
           live_playback_url = ?,
           live_status = 'ready'
     WHERE id = ?`,
    [data.id, data.streamKey, data.playbackId, playbackUrl, eventId]
  );

  return {
    streamId: data.id,
    streamKey: data.streamKey,
    playbackId: data.playbackId,
    playbackUrl,
  };
}
