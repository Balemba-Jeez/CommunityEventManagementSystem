// lib/utils/cron.js
import 'dotenv/config';
import cron from 'node-cron';
import db from '../db.js';
import { createLivepeerStreamForEvent } from '../video/livepeer.js';

console.log('Cron job runner loaded...');

let minute = 0;
export function startEventCron() {

    console.log('Cron job started');
  // Runs every minute
  cron.schedule("* * * * *", async () => {
    console.log(`Cron executing for the ${++minute}' minute`);
    console.log('[cron] tick - checking events to start...');

    const now = new Date();

    try {
            // Find events supposed to start
            const [rows] = await db.execute(
            `SELECT id, title, status, live_provider, live_stream_id
                FROM events
                WHERE start_time <= ? AND status = 'scheduled'`,
            [now]
            );

            for (const ev of rows) {
            try {
                if (ev.live_provider === 'livepeer') {
                // Create a stream if not already created
                if (!ev.live_stream_id) {
                    const info = await createLivepeerStreamForEvent(ev.id, ev.title || `event-${ev.id}`);
                    console.log(`[cron] Livepeer stream ready for event ${ev.id}`, info);
                }
                }

                // Mark event active (participants can join/view)
                await db.execute(
                `UPDATE events SET status = 'active', live_status = 'active', updated_at = NOW() WHERE id = ?`,
                [ev.id]
                );

                console.log(`[cron] Event ${ev.id} set to ACTIVE`);
            } catch (innerErr) {
                console.error(`[cron] Error starting event ${ev.id}:`, innerErr);
                await db.execute(
                `UPDATE events SET live_status = 'error', updated_at = NOW() WHERE id = ?`,
                [ev.id]
                );
            }
            }
        } catch (err) {
            console.error('[cron] Outer error:', err);
        }
        });

        console.log('Cron scheduled: every minute');
}

startEventCron();