export function getSignUpOutcome(data) {
  if (!data?.user) {
    throw new Error("Supabase did not return a user after sign-up.");
  }

  if (Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    return "duplicate";
  }

  return data.session ? "authenticated" : "confirmation-required";
}
