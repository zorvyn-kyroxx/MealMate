import { useState } from "react";
import { X, Shield, FileText, Lock, CheckCircle2 } from "lucide-react";

export default function LegalModal({ isOpen, onClose, initialTab = "terms" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640, maxHeight: "85vh" }}>
        <div className="modal-heading" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "var(--green-soft)",
              color: "var(--green)",
              display: "grid",
              placeItems: "center"
            }}>
              <Shield size={18} />
            </div>
            <div>
              <span className="eyebrow">LEGAL & PRIVACY COMPLIANCE</span>
              <h2 style={{ margin: "2px 0 0", fontSize: 18 }}>MealMate Legal Center</h2>
            </div>
          </div>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", background: "var(--background)", borderRadius: 10, padding: 3, marginBottom: 16 }}>
          <button
            type="button"
            style={{
              flex: 1,
              padding: "8px 0",
              border: 0,
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              background: activeTab === "terms" ? "var(--surface)" : "transparent",
              color: activeTab === "terms" ? "var(--text)" : "var(--muted)",
              boxShadow: activeTab === "terms" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            }}
            onClick={() => setActiveTab("terms")}
          >
            <FileText size={14} /> Terms of Service
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              padding: "8px 0",
              border: 0,
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              background: activeTab === "privacy" ? "var(--surface)" : "transparent",
              color: activeTab === "privacy" ? "var(--text)" : "var(--muted)",
              boxShadow: activeTab === "privacy" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            }}
            onClick={() => setActiveTab("privacy")}
          >
            <Lock size={14} /> Privacy Policy
          </button>
        </div>

        {/* Legal Text Content (Scrollable) */}
        <div style={{
          maxHeight: "50vh",
          overflowY: "auto",
          paddingRight: 8,
          fontSize: 11,
          color: "var(--text)",
          lineHeight: 1.7
        }}>
          {activeTab === "terms" ? (
            <div>
              <p><strong>Effective Date:</strong> February 2026 · Version 2.0</p>

              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>1. Acceptance of Terms</h4>
              <p>By creating an account or accessing MealMate, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, you must discontinue use immediately.</p>

              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>2. Service Description & Subscriptions</h4>
              <p>MealMate provides meal planning, recipe cataloging, grocery organization, and food expenditure tracking. The service offers a Free tier with defined limits and a Pro subscription with expanded features. Subscriptions are billed on a recurring monthly or annual basis unless cancelled prior to the renewal date.</p>

              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>3. Refund & Cancellation Policy</h4>
              <p>You may cancel your subscription at any time via your account settings. Subscriptions feature a 7-day money-back guarantee for first-time annual subscribers upon written notice to our support team.</p>

              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>4. Intellectual Property & User Content</h4>
              <p>You retain ownership of all recipes and meal schedules you create. MealMate and its branding, software, design components, and documentation remain the exclusive intellectual property of MealMate.</p>

              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>5. Medical & Nutritional Disclaimer</h4>
              <p>MealMate is an organizational tool and does not provide medical or clinical nutritional advice. Calorie counts and suggestions are estimates. Users with specific medical dietary conditions should consult a registered healthcare provider.</p>
            </div>
          ) : (
            <div>
              <p><strong>Last Updated:</strong> February 2026 · Compliant with Global Privacy Regulations</p>

              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>1. Information We Collect</h4>
              <p>We respect your privacy. In local offline mode, your data resides strictly within your browser's local storage. When using Cloud Sync or creating an account, we collect your email address, display name, and your synchronized meal schedules, recipes, and expense logs.</p>

              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>2. How We Use Your Data</h4>
              <p>Your data is used solely to provide and improve the MealMate service. We do NOT sell, rent, or monetize your personal dietary or financial information to advertisers or third-party data brokers.</p>

              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>3. Data Security & Storage</h4>
              <p>Cloud data is stored in enterprise-grade PostgreSQL databases hosted by Supabase with Row Level Security (RLS) policies. All communication between your device and our servers is encrypted using 256-bit SSL/TLS protocol.</p>

              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>4. Your Rights (Export & Deletion)</h4>
              <p>You have full ownership of your data. You may download a complete JSON export of your records at any time from the Settings tab, or request permanent deletion of your account and associated database records.</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 20, paddingTop: 14, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, color: "var(--muted)", display: "flex", alignItems: "center", gap: 5 }}>
            <CheckCircle2 size={13} color="var(--green)" /> Legally verified & commercial-ready
          </span>
          <button className="btn btn-green" onClick={onClose} style={{ minHeight: 36, padding: "0 18px" }}>
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}
