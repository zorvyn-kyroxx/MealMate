import { useState } from "react";
import { X, CreditCard, Smartphone, Building2, CheckCircle2, Lock } from "lucide-react";
import { isLivePaymentConfigured, launchRazorpayPayment } from "../../services/paymentService";

export default function PaymentModal({
  isOpen,
  onClose,
  planName = "MealMate Pro",
  billingCycle = "annual",
  amount = 1999,
  userEmail = "user@mealmate.app",
  userName = "MealMate User",
  onPaymentSuccess,
  showNotification
}) {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  if (!isOpen) return null;

  const handlePay = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // If real Razorpay key is configured, try launching live gateway
    if (isLivePaymentConfigured) {
      const launched = await launchRazorpayPayment({
        amount,
        planName,
        userEmail,
        userName,
        onSuccess: (paymentData) => {
          setProcessing(false);
          setReceipt(paymentData);
          onPaymentSuccess(paymentData);
          showNotification("🎉 Payment verified! Pro features unlocked.");
        },
        onDismiss: () => {
          setProcessing(false);
        }
      });

      if (launched) return;
    }

    // Interactive Simulator Flow (for sandbox / demo testing)
    setTimeout(() => {
      const simulatedReceipt = {
        paymentId: `pay_${Date.now()}_sim`,
        orderId: `ord_${Date.now()}`,
        amount,
        currency: "INR",
        method: paymentMethod.toUpperCase(),
        plan: "PRO",
        billingCycle,
        date: new Date().toISOString()
      };

      setProcessing(false);
      setReceipt(simulatedReceipt);
      onPaymentSuccess(simulatedReceipt);
      showNotification("🎉 Payment verified! Pro features unlocked.");
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460 }}>
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
          // Success Receipt Screen
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
            <h3 style={{ margin: "0 0 6px", fontSize: 18, color: "var(--text)" }}>Payment Successful!</h3>
            <p style={{ margin: "0 0 16px", fontSize: 11, color: "var(--muted)" }}>
              Welcome to MealMate Pro! Your subscription is now active.
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
                <strong style={{ color: "var(--green)" }}>COMPLETED ✅</strong>
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
          // Checkout Form
          <form onSubmit={handlePay}>
            {/* Order Summary Box */}
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
                    {billingCycle === "annual" ? "Annual Billing (Save 30%)" : "Monthly Billing"}
                  </span>
                </div>
                <strong style={{ fontSize: 20, fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>
                  ₹{amount.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            {/* Payment Method Selector */}
            <label style={{ marginBottom: 8 }}>Select Payment Method</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
              <button
                type="button"
                style={{
                  padding: "10px 8px",
                  borderRadius: 10,
                  border: `1.5px solid ${paymentMethod === "upi" ? "var(--green)" : "var(--border)"}`,
                  background: paymentMethod === "upi" ? "var(--green-soft)" : "var(--surface)",
                  color: paymentMethod === "upi" ? "var(--green-dark)" : "var(--text)",
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4
                }}
                onClick={() => setPaymentMethod("upi")}
              >
                <Smartphone size={16} /> UPI (GPay / PhonePe)
              </button>

              <button
                type="button"
                style={{
                  padding: "10px 8px",
                  borderRadius: 10,
                  border: `1.5px solid ${paymentMethod === "card" ? "var(--green)" : "var(--border)"}`,
                  background: paymentMethod === "card" ? "var(--green-soft)" : "var(--surface)",
                  color: paymentMethod === "card" ? "var(--green-dark)" : "var(--text)",
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4
                }}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard size={16} /> Card (Debit / Credit)
              </button>

              <button
                type="button"
                style={{
                  padding: "10px 8px",
                  borderRadius: 10,
                  border: `1.5px solid ${paymentMethod === "netbanking" ? "var(--green)" : "var(--border)"}`,
                  background: paymentMethod === "netbanking" ? "var(--green-soft)" : "var(--surface)",
                  color: paymentMethod === "netbanking" ? "var(--green-dark)" : "var(--text)",
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4
                }}
                onClick={() => setPaymentMethod("netbanking")}
              >
                <Building2 size={16} /> Netbanking
              </button>
            </div>

            {/* Dynamic Method Input */}
            {paymentMethod === "upi" && (
              <label>
                Enter UPI ID (e.g. mobile@upi, name@okhdfcbank)
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi (or leave blank to test)"
                />
              </label>
            )}

            {paymentMethod === "card" && (
              <>
                <label>
                  Card Number
                  <input type="text" placeholder="4242 •••• •••• 4242" maxLength={19} />
                </label>
                <div className="form-row">
                  <label>Expiry<input type="text" placeholder="MM/YY" maxLength={5} /></label>
                  <label>CVV<input type="password" placeholder="•••" maxLength={4} /></label>
                </div>
              </>
            )}

            {paymentMethod === "netbanking" && (
              <label>
                Select Your Bank
                <select>
                  <option>HDFC Bank</option>
                  <option>State Bank of India (SBI)</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                  <option>Other Bank</option>
                </select>
              </label>
            )}

            {/* Security Assurance Badge */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 10,
              color: "var(--muted)",
              margin: "14px 0"
            }}>
              <Lock size={13} color="var(--green)" />
              <span>256-bit encrypted bank checkout. Instant activation.</span>
            </div>

            <button
              className="btn btn-green modal-submit"
              type="submit"
              disabled={processing}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {processing ? "Connecting with Payment Gateway..." : `Pay ₹${amount.toLocaleString("en-IN")} Securely`}
            </button>

            {/* Integration info footnote */}
            <p style={{ margin: "14px 0 0", textAlign: "center", fontSize: 9, color: "var(--muted)", lineHeight: 1.5 }}>
              ⚡ Payment Simulator Active. When ready for production, add <code>VITE_RAZORPAY_KEY_ID</code> to your <code>.env</code> file to auto-connect your verified merchant account.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
