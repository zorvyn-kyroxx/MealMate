import { X, Crown, Check, Zap } from "lucide-react";

export default function UpgradeModal({
  isOpen,
  onClose,
  onUpgradeToPro,
  onNavigateToPricing,
  showNotification
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 440, padding: 28 }}>
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

        <p style={{ margin: "0 0 18px", fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>
          Take complete control of your nutrition with cloud synchronization across all your devices and multi-category financial intelligence.
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
            onClick={() => {
              onUpgradeToPro();
              onClose();
              showNotification("🎉 Upgraded to MealMate Pro!");
            }}
          >
            <Zap size={16} /> Upgrade to Pro
          </button>
          <button
            className="btn-outline"
            onClick={() => {
              onClose();
              onNavigateToPricing();
            }}
          >
            View Plans
          </button>
        </div>
      </div>
    </div>
  );
}
