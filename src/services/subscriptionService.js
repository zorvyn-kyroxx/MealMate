import { isSupabaseConfigured, supabase } from "./supabaseClient";

const subscriptionFunction = "subscriptions";

const invokeSubscriptionFunction = async (body) => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Secure Pro checkout is not configured. Sign-in and the payment backend are required.");
  }
  const { data, error } = await supabase.functions.invoke(subscriptionFunction, { body });
  if (error) {
    throw new Error(data?.error || error.message || "Subscription service is unavailable.");
  }
  if (data?.error) throw new Error(data.error);
  return data;
};

export const createSubscriptionOrder = async (billingCycle) => {
  if (!["monthly", "annual"].includes(billingCycle)) {
    throw new Error("Choose a valid subscription period.");
  }
  const data = await invokeSubscriptionFunction({ action: "create", billingCycle });
  if (!data?.keyId || !data?.orderId || !Number.isInteger(data.amountPaise)) {
    throw new Error("Secure checkout returned an invalid order.");
  }
  return data;
};

export const fetchSubscriptionStatus = async () => {
  const data = await invokeSubscriptionFunction({ action: "status" });
  if (typeof data?.isPro !== "boolean") {
    throw new Error("Subscription status response was invalid.");
  }
  return { isPro: data.isPro, expiresAt: data.expiresAt || null };
};

export const verifySubscriptionPayment = async ({ orderId, paymentId, signature }) => {
  const data = await invokeSubscriptionFunction({
    action: "verify",
    orderId,
    paymentId,
    signature
  });
  if (data?.confirmed !== true || data?.isPro !== true) {
    throw new Error("Payment has not been verified. Pro access remains locked.");
  }
  return { isPro: true, expiresAt: data.expiresAt || null };
};
