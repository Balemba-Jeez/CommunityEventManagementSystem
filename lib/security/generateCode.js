import crypto from "crypto";
import db from "@/lib/db";

export default function generateCode(purpose) {
  switch (purpose) {
    case "password_reset":
      // 6-digit numeric
      return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");

    case "email_verification":
      // 8-character uppercase alphanumeric
      return Array.from({ length: 8 }, () =>
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)]
      ).join("");

    case "2fa":
      // 6-digit numeric
      return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");

    case "account_recovery":
      // 10-character mixed-case alphanumeric
      return Array.from({ length: 10 }, () =>
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 62)]
      ).join("");
    
    case "phone_verification":
    case "whatsapp_verification":
      // 6-digit numeric code for phone/WhatsApp verification
      return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");

    default:
      throw new Error("Unknown purpose for code generation");
  }
}

export async function markResetCodeUsed(id) {
  const sql = `
    UPDATE password_resets
    SET used_at = NOW()
    WHERE id = ?
  `;
  await db.query(sql, [id]);
}
