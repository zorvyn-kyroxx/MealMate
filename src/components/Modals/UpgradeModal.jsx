import { X, Crown, Check, Zap, AlertTriangle } from "lucide-react";

export default function UpgradeModal({
  isOpen,
  onClose,
  onOpenPayment,
  onNavigateToPricing,
  upgradeReason = "",
  showNotification
}) {
  if (!isOpen) return null;

  const handlePayClick = () => {
    onClose();
    if (onOpenPayment) {
      onOpenPayment({
        planName: "MealMate Pro",
        billingCycle: "annual",
        amount: 1999
      });
    } else {
      showNotification("Secure checkout is unavailable right now.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460, padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
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
              <Crown size={20} />
            </div>
            <div>
              <span className="eyebrow" style={{ color: "var(--green)" }}>PREMIUM TIER</span>
              <h2 style={{ margin: "2px 0 0", fontSize: 20 }}>Unlock MealMate Pro</h2>
            </div>
          </div>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </div>

        {upgradeReason && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            background: "#fff9db",
            border: "1px solid #ffe066",
            borderRadius: 10,
            color: "#856404",
            fontSize: 11,
            fontWeight: 600,
            marginBottom: 16
          }}>
            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
            <span>{upgradeReason}</span>
          </div>
        )}

        <p style={{ margin: "0 0 18px", fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>
          Take complete control of your nutrition with cloud synchronization across all your devices, unlimited recipes, and multi-category financial intelligence.
        </p>

        <div style={{
          background: "var(--background)",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
          border: "1px solid var(--border)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--text)" }}>
              <Check size={14} color="var(--green)" />
              <span>Real-time cloud database backup & cross-device sync</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--text)" }}>
              <Check size={14} color="var(--green)" />
              <span>Unlimited meal schedules and custom recipe studio</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--text)" }}>
              <Check size={14} color="var(--green)" />
              <span>Advanced multi-category expenditure breakdown charts</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="btn btn-green"
            style={{ flex: 1, justifyContent: "center" }}
            onClick={handlePayClick}
          >
            <Zap size={16} /> Upgrade to Pro (₹1,999/yr)
          </button>
          <button
            className="btn-outline"
            onClick={() => {
              onClose();
              onNavigateToPricing();
            }}
          >
            Compare Plans
          </button>
        </div>
      </div>
    </div>
  );
}
