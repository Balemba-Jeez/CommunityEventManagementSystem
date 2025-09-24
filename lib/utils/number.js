/**
 * Ensure phone number is in E.164 format for Cameroon (or any defaultCountryCode)
 * Example inputs: "651515168", "0651515168", "+237651515168"
 * Output: "237651515168"
 */
export function formatToE164(number, defaultCountryCode = "237") {
  if (!number) return null;

  // Remove all non-digit characters
  let cleaned = number.replace(/\D/g, "");

  // If it starts with "00" (international format), remove it
  if (cleaned.startsWith("00")) {
    cleaned = cleaned.slice(2);
  }

  // If it starts with "0" (local format with leading zero), remove 0 and add country code
  if (cleaned.startsWith("0")) {
    cleaned = defaultCountryCode + cleaned.slice(1);
  }
  // If it starts with the local mobile prefix (6 or 2 in Cameroon) but not with country code
  else if (/^[26]\d{7,8}$/.test(cleaned)) {
    cleaned = defaultCountryCode + cleaned;
  }

  // At this point, it should already include the country code
  if (!cleaned.startsWith(defaultCountryCode)) {
    throw new Error("Invalid phone number format for given country");
  }

  // Validate length (E.164 max 15 digits, min 8)
  if (cleaned.length < 8 || cleaned.length > 15) {
    throw new Error("Invalid phone number length after formatting.");
  }

  return cleaned;
}
