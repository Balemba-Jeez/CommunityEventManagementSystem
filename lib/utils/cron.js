// lib/cron.js
import cron from "node-cron";
import db from "./db"; // your database connection

export function startEventCron() {
  // Runs every minute
  cron.schedule("* * * * *", async () => {
    console.log("Checking for events to start...");

    try {
      const now = new Date();

      // Find events that should start now
      const [eventsToStart] = await db.execute(
        "SELECT id, status FROM events WHERE start_time <= ? AND status = 'scheduled'",
        [now]
      );

      if (eventsToStart.length > 0) {
        for (const event of eventsToStart) {
          // Update event status to active
          await db.execute(
            "UPDATE events SET status = 'active' WHERE id = ?",
            [event.id]
          );
          console.log(`Event ${event.id} started!`);
        }
      }
    } catch (err) {
      console.error("Error checking events:", err);
    }
  });
}
