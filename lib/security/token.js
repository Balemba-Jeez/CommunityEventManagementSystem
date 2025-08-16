import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';  // To generate unique jwtid
import db from '@/lib/db';
/**
 * @deprecated Use SECRETS instead
 * This constant uses a single secret for all tokens, which is less secure.
 * Use separate secrets per token type; this will be removed in future releases.
 */
const SECRET = process.env.JWT_SECRET;

const SECRETS = {
  login: process.env.JWT_LOGIN_SECRET,
  password_reset: process.env.JWT_RESET_SECRET,
  email_verification: process.env.JWT_EMAIL_VERIFICATION_SECRET,
};

const EXPIRATIONS = {
  login: '2h',              // 1 hour for login session
  password_reset: '15m',    // 15 minutes for reset token
  email_verification: '24h' // 24 hours for email verification
};


/**
 * @deprecated Use generateTokenV2(type, payload) instead with purpose-specific secrets.
 * This function uses a single shared secret, which is less secure and will be removed.
 */
export function generateToken(payload, expiresIn) {
  return jwt.sign(payload, SECRET, { expiresIn }); //"15m", "1h", "7d"
}


/**
 * @deprecated Use verifyTokenV2(token, type) instead with purpose-specific secrets.
 * This function uses a single shared secret, which is less secure and will be removed.
 */
export function verifyToken(token) {
  try {
    
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

export async function generateTokenV2(type, payload) {
  const secret = SECRETS[type];
  const expiresIn = EXPIRATIONS[type];

  if (!secret || !expiresIn) {
    throw new Error(`Invalid token type: ${type}`);
  }

const jwtid = uuidv4();  // unique ID for this token

  // Sign token with jwtid included
  const token = jwt.sign(payload, secret, { expiresIn, jwtid });



  if (type === 'login') {
    await db.execute(
      `DELETE FROM tokens WHERE user_id = ? AND type = ?`,
      [payload.userId, type]
    );
  }

  await db.execute(
    `INSERT INTO tokens (jwtid, type, user_id, used, created_at) VALUES (?, ?, ?, ?, NOW())`,
    [jwtid, type, payload.userId, false]
  );

  console.log('token',token);

  return token;
}

export async function verifyTokenV2(type, token) {

  const secret = SECRETS[type];
  if (!secret) {
    throw new Error(`Invalid token type: ${type}`);
  }

 try {
    const decoded = jwt.verify(token, secret);

    // Check token validity in DB
    const [rows] = await db.execute(
      `SELECT * FROM tokens WHERE jwtid = ? AND type = ? AND user_id = ?`,
      [decoded.jti || decoded.jwtid, type, decoded.userId || decoded.id]
    );

    if (rows.length === 0) return null; // Token not found

    const tokenRecord = rows[0];

    // Check if token is an unused token (for password_reset)
    if (type === 'password_reset' && tokenRecord.used) return null;

    return decoded;

  } catch {

    return null;

  }

}

// Mark token as used when password reset is done
export async function markTokenUsed(jwtid) {

  if (!jwtid) throw new Error("Cannot mark token used: jwtid is undefined");
  
  await db.execute(`UPDATE tokens SET used = true WHERE jwtid = ?`, [jwtid]);
}