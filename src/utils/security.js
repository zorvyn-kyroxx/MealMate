/**
 * Security & Input Sanitization Utilities for MealMate
 * Protects against XSS, script injection, and corrupt storage state
 */

/**
 * Sanitizes plain text inputs by escaping dangerous HTML entities
 */
export function sanitizeText(input) {
  if (typeof input !== "string") return input;
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
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
