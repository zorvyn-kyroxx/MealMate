import { useState } from "react";
import { Check, Sparkles, Crown, Zap, HelpCircle } from "lucide-react";

export default function PricingView({
  userPlan,
  planExpiresAt,
  paymentsEnabled = false
}) {
  const [isAnnual, setIsAnnual] = useState(true);

  const freeFeatures = [
    "Weekly meal planning",
    "Starter recipe library",
    "Grocery checklist",
    "Food expense tracking",
    "Nutrition tools using recorded data",
    "Browser-based workspace storage"
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
            <span>{paymentsEnabled ? "TRANSPARENT PLANS" : "MEALMATE PUBLIC BETA"}</span>
          </div>
          <h1>{paymentsEnabled ? "Choose Your MealMate Plan" : "MealMate is free during beta"}</h1>
          <p>
            {paymentsEnabled
              ? "Compare the available MealMate plans and their terms."
              : "Explore meal planning, recipes, groceries, budgeting, and nutrition tools. No subscriptions or donations are being accepted."}
          </p>
        </div>
      </div>
      <div className="pricing-temporary-free">
        <Sparkles size={16} />
        <span>
          <strong>{paymentsEnabled ? "Payment options are enabled." : "Free beta."}</strong>
          {" "}No advertising is currently shown.
        </span>
      </div>

      {/* Billing Cycle Switcher */}
      {paymentsEnabled && (
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
      )}

      {/* Pricing Cards Grid */}
      <div className="pricing-grid">
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
              Core food planning and organization tools for this browser.
            </p>

            <div style={{ margin: "24px 0" }}>
              <strong style={{ fontSize: 30, fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>
                {paymentsEnabled ? "₹0" : "Free beta"}
              </strong>
              {paymentsEnabled && <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 6 }}>/ month</span>}
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
              <button className="btn btn-outline" style={{ width: "100%" }} disabled>
                {planExpiresAt
                  ? `Pro active until ${new Date(planExpiresAt).toLocaleDateString()}`
                  : "Pro subscription active"}
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
          {paymentsEnabled && <>
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
          </>}

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="eyebrow" style={{ color: "var(--green)" }}>
                {paymentsEnabled ? "PREMIUM PLAN" : "FUTURE PLAN"}
              </span>
              {userPlan === "PRO" && (
                <span className="brand-plan" style={{ background: "var(--green)", color: "#fff", fontSize: 9 }}>
                  ACTIVE PRO
                </span>
              )}
            </div>
            <h3 style={{ margin: "10px 0 6px", fontSize: 24, color: "var(--text)" }}>MealMate Pro</h3>
            <p style={{ margin: 0, fontSize: 11, color: "var(--muted)" }}>
              {paymentsEnabled
                ? "Additional features for subscribers, described below."
                : "Subscriptions are not available during the public beta."}
            </p>

            <div style={{ margin: "24px 0" }}>
              <strong style={{ fontSize: 20, fontFamily: "Manrope, sans-serif", color: "var(--text)" }}>
                {paymentsEnabled ? (isAnnual ? "₹167" : "₹249") : "Not available during beta"}
              </strong>
              {paymentsEnabled ? (
                <span style={{ display: "block", fontSize: 10, color: "var(--muted)", marginTop: 4 }}>
                  Per month{isAnnual ? " · billed annually" : ""}
                </span>
              ) : (
                <span style={{ display: "block", fontSize: 10, color: "var(--muted)", marginTop: 4 }}>
                  Pricing is a preview only. No subscription or payment is collected.
                </span>
              )}
            </div>

            {paymentsEnabled && <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {proFeatures.map((feat, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 11, fontWeight: 600, color: "var(--text)" }}>
                  <Sparkles size={14} color="var(--green)" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>}
          </div>

          <div style={{ marginTop: 30 }}>
            {!paymentsEnabled ? (
              <button className="btn btn-outline" style={{ width: "100%" }} disabled>
                Not available during beta
              </button>
            ) : userPlan === "PRO" ? (
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
                disabled
              >
                <Zap size={16} /> Payments disabled
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

        <div className="faq-grid">
          <div>
            <strong style={{ fontSize: 12, color: "var(--text)", display: "block" }}>
              Are subscriptions or donations available?
            </strong>
            <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>
              No. Checkout, subscriptions, donations, and ad scripts are disabled during this beta.
            </p>
          </div>
          <div>
            <strong style={{ fontSize: 12, color: "var(--text)", display: "block" }}>
              Where is my workspace saved?
            </strong>
            <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>
              By default, MealMate saves your workspace in this browser. Clearing this browser's storage can erase it; use the in-app backup tools to keep a copy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
