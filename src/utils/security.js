/**
 * Security & Input Sanitization Utilities for MealMate
 * Protects against XSS, script injection, and corrupt storage state
 */

/**
 * Sanitizes plain text inputs for state storage and rendering.
 * React escapes rendered text; this must not turn valid text into HTML entities.
 */
export function sanitizeText(input) {
  if (typeof input !== "string") return input;
  return Array.from(input)
    .filter((character) => {
      const code = character.charCodeAt(0);
      return code > 31 && code !== 127;
    })
    .join("")
    .trim();
}

/**
 * Validates an email format using standard regex
 */
export function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Safely parses JSON with fallback
 */
export function safeJsonParse(jsonString, fallback) {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch {
    return fallback;
  }
}
