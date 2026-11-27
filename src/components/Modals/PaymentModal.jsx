import { useState } from "react";
import { X, CreditCard, Smartphone, Building2, CheckCircle2, Lock } from "lucide-react";
import { launchRazorpayPayment } from "../../services/paymentService";

export default function PaymentModal({
  isOpen,
  onClose,
  planName = "MealMate Pro",
  billingCycle = "annual",
  amount = 1999,
  order,
  userEmail = "user@mealmate.app",
  userName = "MealMate User",
  onPaymentSuccess,
  showNotification
}) {
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [pendingPayment, setPendingPayment] = useState(null);
  const [paymentError, setPaymentError] = useState("");

  if (!isOpen) return null;

  const confirmPayment = async (paymentData) => {
    setProcessing(true);
    setPaymentError("");
    try {
      await onPaymentSuccess(paymentData);
      setReceipt(paymentData);
      setPendingPayment(null);
    } catch (error) {
      setPendingPayment(paymentData);
      setPaymentError(error.message || "Payment confirmation is pending. Retry verification.");
    } finally {
      setProcessing(false);
    }
  };

  const handlePay = async (event) => {
    event.preventDefault();
    if (pendingPayment) {
      await confirmPayment(pendingPayment);
      return;
    }
    if (!order) {
      showNotification("Secure checkout order is unavailable. Please try again.");
      return;
    }

    setProcessing(true);
    const launched = await launchRazorpayPayment({
      order,
      planName,
      userEmail,
      userName,
      onSuccess: (paymentData) => {
        setPendingPayment(paymentData);
        void confirmPayment(paymentData);
      },
      onFailure: () => {
        setProcessing(false);
        setPaymentError("Razorpay did not return verifiable payment details. Contact support before trying again.");
      },
      onDismiss: () => setProcessing(false)
    });

    if (!launched) {
      setProcessing(false);
      showNotification("Unable to load Razorpay checkout. Please check your connection and try again.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()} style={{ maxWidth: 460 }}>
        <div className="modal-heading" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--green-soft)",
              color: "var(--green)",
              display: "grid",
              placeItems: "center"
            }}>
              <CreditCard size={18} />
            </div>
            <div>
              <span className="eyebrow" style={{ color: "var(--green)" }}>SECURE CHECKOUT</span>
              <h2 style={{ margin: "2px 0 0", fontSize: 18 }}>Complete Your Order</h2>
            </div>
          </div>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </div>

        {receipt ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "var(--green-soft)",
              color: "var(--green)",
              display: "grid",
              placeItems: "center",
              margin: "0 auto 14px"
            }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ margin: "0 0 6px", fontSize: 18, color: "var(--text)" }}>Payment Verified</h3>
            <p style={{ margin: "0 0 16px", fontSize: 11, color: "var(--muted)" }}>
              MealMate Pro is active for your account.
            </p>
            <div style={{
              background: "var(--background)",
              borderRadius: 12,
              padding: 16,
              textAlign: "left",
              border: "1px solid var(--border)",
              fontSize: 11,
              marginBottom: 20
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "var(--muted)" }}>Transaction ID:</span>
                <strong style={{ fontFamily: "monospace", color: "var(--text)" }}>{receipt.paymentId}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "var(--muted)" }}>Plan:</span>
                <strong>{planName} ({billingCycle})</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "var(--muted)" }}>Amount Paid:</span>
                <strong style={{ color: "var(--green)" }}>₹{amount.toLocaleString("en-IN")}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--muted)" }}>Status:</span>
                <strong style={{ color: "var(--green)" }}>VERIFIED</strong>
              </div>
            </div>
            <button
              className="btn btn-green"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={onClose}
            >
              Continue to Workspace
            </button>
          </div>
        ) : (
          <form onSubmit={handlePay}>
            <div style={{
              background: "var(--background)",
              borderRadius: 12,
              padding: "14px 16px",
              border: "1px solid var(--border)",
              marginBottom: 16
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: 13, color: "var(--text)", display: "block" }}>{planName}</strong>
                  <span style={{ fontSize: 10, color: "var(--muted)" }}>
                    {billingCycle === "annual" ? "Annual Billing" : "Monthly Billing"}
                  </span>
                </div>
                <strong style={{ fontSize: 20, fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>
                  ₹{amount.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            <label style={{ marginBottom: 8 }}>Accepted Payment Methods via Razorpay</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
              <div style={{
                padding: "10px 8px", borderRadius: 10, border: "1px solid var(--border)",
                background: "var(--background)", color: "var(--text)", fontSize: 10, fontWeight: 700,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textAlign: "center"
              }}>
                <Smartphone size={16} color="var(--green)" /> UPI (GPay / PhonePe)
              </div>
              <div style={{
                padding: "10px 8px", borderRadius: 10, border: "1px solid var(--border)",
                background: "var(--background)", color: "var(--text)", fontSize: 10, fontWeight: 700,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textAlign: "center"
              }}>
                <CreditCard size={16} color="var(--green)" /> Card (Debit / Credit)
              </div>
              <div style={{
                padding: "10px 8px", borderRadius: 10, border: "1px solid var(--border)",
                background: "var(--background)", color: "var(--text)", fontSize: 10, fontWeight: 700,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textAlign: "center"
              }}>
                <Building2 size={16} color="var(--green)" /> Netbanking
              </div>
            </div>

            {paymentError && (
              <div role="alert" style={{
                padding: "10px 12px", borderRadius: 10, background: "#fff8e6", border: "1px solid #fae09c",
                color: "#8c6b12", fontSize: 10, fontWeight: 600, lineHeight: 1.5, marginBottom: 14
              }}>
                {paymentError}
              </div>
            )}

            <div style={{
              display: "flex", alignItems: "center", gap: 8, fontSize: 10, color: "var(--muted)", margin: "14px 0"
            }}>
              <Lock size={13} color="var(--green)" />
              <span>Payment is verified by MealMate's server before Pro activation.</span>
            </div>

            <button
              className="btn btn-green modal-submit"
              type="submit"
              disabled={processing || !order}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {processing
                ? pendingPayment ? "Verifying payment..." : "Connecting with Razorpay..."
                : pendingPayment
                  ? "Retry payment verification"
                  : order
                    ? `Pay ₹${amount.toLocaleString("en-IN")} Securely`
                    : "Secure checkout unavailable"}
            </button>
            <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 9, color: "var(--muted)", lineHeight: 1.5 }}>
              Secured by Razorpay Checkout.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
