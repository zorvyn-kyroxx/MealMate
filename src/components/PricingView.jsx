import { useState } from "react";
import { Check, Sparkles, Crown, Zap, HelpCircle } from "lucide-react";

export default function PricingView({
  userPlan,
  onUpgradeToPro,
  onDowngradeToFree,
  onOpenPayment,
  showNotification
}) {
  const [isAnnual, setIsAnnual] = useState(true);

  const freeFeatures = [
    "Up to 15 active scheduled meals",
    "6 curated chef-crafted recipes",
    "Standard grocery checklist",
    "Basic food budget tracker",
    "Client-side browser storage",
    "Standard light & dark themes"
  ];

  const proFeatures = [
    "Unlimited meal planning across all weeks",
    "Unlimited custom recipe studio with photos",
    "Supermarket aisle sorting & 1-click list sharing",
    "Visual category spending bar charts & stats",
    "Cross-device cloud database sync (Supabase)",
    "Exportable JSON backups & instant restore",
    "Custom daily calorie and serving targets",
    "Priority support & early access to new tools"
  ];

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>TRANSPARENT PLANS FOR EVERY LIFESTYLE</span>
          </div>
          <h1>Upgrade Your Food Experience</h1>
          <p>Choose the plan that suits your personal food routine. Upgrade or downgrade anytime with zero lock-in.</p>
        </div>
      </div>

      {/* Billing Cycle Switcher */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "5px 7px",
          borderRadius: 30,
          background: "var(--surface)",
          border: "1px solid var(--border)"
        }}>
          <button
            type="button"
            style={{
              padding: "7px 16px",
              borderRadius: 20,
              border: 0,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              background: !isAnnual ? "var(--green)" : "transparent",
              color: !isAnnual ? "#fff" : "var(--muted)"
            }}
            onClick={() => setIsAnnual(false)}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            style={{
              padding: "7px 16px",
              borderRadius: 20,
              border: 0,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              background: isAnnual ? "var(--green)" : "transparent",
              color: isAnnual ? "#fff" : "var(--muted)",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
            onClick={() => setIsAnnual(true)}
          >
            <span>Annual Billing</span>
            <span style={{
              background: isAnnual ? "rgba(255,255,255,0.25)" : "var(--green-soft)",
              color: isAnnual ? "#fff" : "var(--green-dark)",
              padding: "2px 7px",
              borderRadius: 10,
              fontSize: 9,
              fontWeight: 800
            }}>
              SAVE 30%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 24,
        maxWidth: 950,
        margin: "0 auto 40px"
      }}>
        {/* FREE TIER */}
        <div className="surface-card" style={{
          padding: 32,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="eyebrow">ESSENTIALS</span>
              {userPlan === "FREE" && (
                <span className="brand-plan" style={{ fontSize: 9 }}>CURRENT PLAN</span>
              )}
            </div>
            <h3 style={{ margin: "10px 0 6px", fontSize: 24, color: "var(--text)" }}>Starter</h3>
            <p style={{ margin: 0, fontSize: 11, color: "var(--muted)" }}>
              Ideal for beginners establishing a healthy food habit.
            </p>

            <div style={{ margin: "24px 0" }}>
              <strong style={{ fontSize: 36, fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>₹0</strong>
              <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 6 }}>/ forever</span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {freeFeatures.map((feat, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 11, color: "var(--text)" }}>
                  <Check size={15} color="var(--green)" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 30 }}>
            {userPlan === "FREE" ? (
              <button className="btn btn-outline" style={{ width: "100%" }} disabled>
                Active Plan
              </button>
            ) : (
              <button
                className="btn btn-outline"
                style={{ width: "100%" }}
                onClick={() => {
                  onDowngradeToFree();
                  showNotification("Switched to Free tier.");
                }}
              >
                Switch to Starter Plan
              </button>
            )}
          </div>
        </div>

        {/* PRO TIER */}
        <div className="surface-card" style={{
          padding: 32,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderColor: "var(--green)",
          boxShadow: "0 14px 40px rgba(82, 120, 92, 0.16)",
          background: "linear-gradient(180deg, var(--surface) 0%, var(--green-soft) 100%)"
        }}>
          {/* Top highlight badge */}
          <div style={{
            position: "absolute",
            top: -12,
            right: 24,
            background: "var(--green)",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 4
          }}>
            <Crown size={12} /> MOST POPULAR
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="eyebrow" style={{ color: "var(--green)" }}>PREMIUM SaaS</span>
              {userPlan === "PRO" && (
                <span className="brand-plan" style={{ background: "var(--green)", color: "#fff", fontSize: 9 }}>
                  ACTIVE PRO
                </span>
              )}
            </div>
            <h3 style={{ margin: "10px 0 6px", fontSize: 24, color: "var(--text)" }}>MealMate Pro</h3>
            <p style={{ margin: 0, fontSize: 11, color: "var(--muted)" }}>
              The complete food management suite for effortless nutrition.
            </p>

            <div style={{ margin: "24px 0" }}>
              <strong style={{ fontSize: 36, fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>
                {isAnnual ? "₹199" : "₹249"}
              </strong>
              <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 6 }}>
                / month {isAnnual ? "(billed ₹2,388/yr)" : ""}
              </span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {proFeatures.map((feat, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 11, fontWeight: 600, color: "var(--text)" }}>
                  <Sparkles size={14} color="var(--green)" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 30 }}>
            {userPlan === "PRO" ? (
              <button
                className="btn btn-green"
                style={{ width: "100%", justifyContent: "center" }}
                disabled
              >
                <Crown size={16} /> Active Pro Member
              </button>
            ) : (
              <button
                className="btn btn-green hero-btn"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => {
                  if (onOpenPayment) {
                    onOpenPayment({
                      amount: isAnnual ? 1999 : 249,
                      billingCycle: isAnnual ? "annual" : "monthly",
                      planName: "MealMate Pro"
                    });
                  } else {
                    onUpgradeToPro();
                    showNotification("🎉 Welcome to MealMate Pro!");
                  }
                }}
              >
                <Zap size={16} /> Upgrade to MealMate Pro
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FAQ & Integration Note */}
      <div className="surface-card" style={{ maxWidth: 950, margin: "0 auto", padding: 28 }}>
        <div className="section-heading" style={{ marginBottom: 16 }}>
          <div>
            <h3>Frequently Asked Questions</h3>
            <p>Everything you need to know about MealMate plans & security</p>
          </div>
          <HelpCircle size={18} className="sparkle-mark" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <strong style={{ fontSize: 12, color: "var(--text)", display: "block" }}>
              Can I switch plans anytime?
            </strong>
            <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>
              Yes! You can test Pro features anytime, and you can switch back to the Starter plan whenever you like without losing your recipes.
            </p>
          </div>
          <div>
            <strong style={{ fontSize: 12, color: "var(--text)", display: "block" }}>
              How does Cloud Sync work?
            </strong>
            <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>
              MealMate integrates with Supabase PostgreSQL to sync your meal schedules, recipes, and shopping lists across your phone, tablet, and computer.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
