/**
 * Payment Gateway Integration Service
 * Supports Razorpay Live/Sandbox Checkout with fallback to Interactive Simulator
 */

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

export const isLivePaymentConfigured = Boolean(
  RAZORPAY_KEY &&
  RAZORPAY_KEY !== "rzp_test_placeholder" &&
  RAZORPAY_KEY.startsWith("rzp_")
);

/**
 * Loads Razorpay checkout script dynamically
 */
export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Initiates Razorpay checkout if configured
 */
export async function launchRazorpayPayment({
  amount, // in INR
  planName = "MealMate Pro",
  userEmail = "user@mealmate.app",
  userName = "MealMate User",
  onSuccess,
  onDismiss
}) {
  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay || !isLivePaymentConfigured) {
    return false;
  }

  const options = {
    key: RAZORPAY_KEY,
    amount: amount * 100, // Razorpay takes paise
    currency: "INR",
    name: "MealMate",
    description: `Subscription: ${planName}`,
    image: "/favicon.svg",
    prefill: {
      name: userName,
      email: userEmail
    },
    theme: {
      color: "#52785c"
    },
    handler: function (response) {
      if (response.razorpay_payment_id) {
        onSuccess({
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id || `ord_${Date.now()}`,
          signature: response.razorpay_signature,
          amount,
          date: new Date().toISOString()
        });
      }
    },
    modal: {
      ondismiss: function () {
        if (onDismiss) onDismiss();
      }
    }
  };

  const paymentInstance = new window.Razorpay(options);
  paymentInstance.open();
  return true;
}
