// lib/codeGenerator.js
import crypto from "crypto";

export default function generateCode(length = 6) {
  return crypto.randomInt(0, 10 ** length).toString().padStart(length, "0");
}
