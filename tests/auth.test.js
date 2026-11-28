import assert from "node:assert/strict";
import test from "node:test";
import { getSignUpOutcome } from "../src/utils/auth.js";
import { normalizeSupabaseUrl } from "../src/utils/supabaseUrl.js";

test("signup without a session requires email confirmation", () => {
  assert.equal(
    getSignUpOutcome({ user: { identities: [{ id: "identity-1" }] }, session: null }),
    "confirmation-required"
  );
});

test("signup with a session is authenticated when confirmation is disabled", () => {
  assert.equal(
    getSignUpOutcome({ user: { identities: [{ id: "identity-1" }] }, session: { access_token: "token" } }),
    "authenticated"
  );
});

test("signup response with no identities is handled as a neutral duplicate", () => {
  assert.equal(
    getSignUpOutcome({ user: { identities: [] }, session: null }),
    "duplicate"
  );
});

test("Supabase project URLs with known API suffixes normalize to the project base", () => {
  assert.equal(
    normalizeSupabaseUrl("https://example.supabase.co/auth/v1/"),
    "https://example.supabase.co"
  );
  assert.equal(
    normalizeSupabaseUrl("https://example.supabase.co/rest/v1"),
    "https://example.supabase.co"
  );
});

test("the normalized base URL creates a single Auth API path", () => {
  const projectUrl = normalizeSupabaseUrl("https://example.supabase.co/auth/v1");
  assert.equal(new URL("auth/v1", `${projectUrl}/`).pathname, "/auth/v1");
});

test("malformed nested Supabase API paths are rejected", () => {
  assert.equal(
    normalizeSupabaseUrl("https://example.supabase.co/auth/v1/signup"),
    null
  );
  assert.equal(
    normalizeSupabaseUrl("https://example.supabase.co/?project=test"),
    null
  );
});
