import assert from "node:assert/strict";
import test from "node:test";
import { getSignUpOutcome } from "../src/utils/auth.js";

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
