import { isSupabaseConfigured, supabase } from "./supabaseClient";
import { loadRazorpayScript } from "./paymentService";

const donationFunction = "donations";

const invokeDonationFunction = async (body) => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Donations are not configured yet. The payment and Supabase backend must be set up first.");
  }
  const { data, error } = await supabase.functions.invoke(donationFunction, { body });
  if (error) {
    const message = data?.error || error.message;
    throw new Error(message || "Donation service is unavailable.");
  }
  if (data?.error) throw new Error(data.error);
  return data;
};

export const fetchDonationSummary = async () => {
  if (!isSupabaseConfigured || !supabase) return null;
  const data = await invokeDonationFunction({ action: "summary" });
  if (!Number.isFinite(Number(data.totalPaise)) || !Number.isFinite(Number(data.donationCount))) {
    throw new Error("Donation summary response was invalid.");
  }
  return {
    totalPaise: Number(data.totalPaise),
    donationCount: Number(data.donationCount),
    checkoutReady: data.checkoutReady === true
  };
};

export const createDonationOrder = async (amount) => {
  const value = Number(amount);
  if (!Number.isFinite(value) || value < 1 || value > 100000) {
    throw new Error("Choose a donation between ₹1 and ₹1,00,000.");
  }
  const data = await invokeDonationFunction({ action: "create", amount: value });
  if (!data?.keyId || !data?.orderId || !Number.isInteger(data.amountPaise)) {
    throw new Error("Donation checkout returned an invalid order.");
  }
  return data;
};

export const verifyDonationPayment = async ({ orderId, paymentId, signature }) => {
  const data = await invokeDonationFunction({
    action: "verify",
    orderId,
    paymentId,
    signature
  });
  if (data?.confirmed !== true) throw new Error("Donation payment has not been confirmed.");
  return {
    totalPaise: Number(data.totalPaise),
    donationCount: Number(data.donationCount)
  };
};

export const openDonationCheckout = async ({ order, onSuccess, onDismiss }) => {
  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay) {
    throw new Error("Razorpay checkout could not load. Check your connection and try again.");
  }

  const checkout = new window.Razorpay({
    key: order.keyId,
    amount: order.amountPaise,
    currency: order.currency,
    order_id: order.orderId,
    name: "MealMate",
    description: "Voluntary donation to support the MealMate team",
    image: "/favicon.svg",
    theme: { color: "#52785c" },
    handler: (response) => onSuccess({
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      signature: response.razorpay_signature
    }),
    modal: { ondismiss: onDismiss }
  });
  checkout.open();
};
