/**
 * Payment Gateway Integration Service
 * Uses a server-created Razorpay order for secure checkout
 */

// Payments remain intentionally disabled until order creation and signature
// verification are implemented through a server-side endpoint.
export const isLivePaymentConfigured = false;
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
  order,
  planName = "MealMate Pro",
  userEmail = "user@mealmate.app",
  userName = "MealMate User",
  onSuccess,
  onFailure,
  onDismiss
}) {
  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay || !order?.keyId || !order?.orderId || !Number.isInteger(order.amountPaise)) {
    return false;
  }

  const options = {
    key: order.keyId,
    amount: order.amountPaise,
    currency: order.currency,
    order_id: order.orderId,
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
      if (response.razorpay_payment_id && response.razorpay_order_id && response.razorpay_signature) {
        onSuccess({
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature
        });
      } else {
        onFailure?.();
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
