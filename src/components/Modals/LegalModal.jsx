import { useState } from "react";
import { X, Shield, FileText, Lock, CheckCircle2 } from "lucide-react";

const legalTabs = [
  ["about", "About"],
  ["contact", "Contact"],
  ["privacy", "Privacy"],
  ["terms", "Terms"],
  ["nutrition", "Nutrition"],
  ["advertising", "Advertising"],
  ["grievance", "Grievance"]
];

export default function LegalModal({ isOpen, onClose, initialTab = "terms" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-center-title"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(100%, 760px)", maxWidth: 760, maxHeight: "85vh" }}
      >
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
              <span className="eyebrow">DRAFT — OWNER REVIEW REQUIRED</span>
              <h2 id="legal-center-title" style={{ margin: "2px 0 0", fontSize: 18 }}>MealMate Information Center</h2>
            </div>
          </div>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </div>

        <nav className="legal-tabs" aria-label="MealMate information">
          {legalTabs.map(([tab, label]) => (
            <button
              type="button"
              key={tab}
              aria-pressed={activeTab === tab}
              className={activeTab === tab ? "is-active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "terms" && <FileText size={14} aria-hidden="true" />}
              {tab === "privacy" && <Lock size={14} aria-hidden="true" />}
              {label}
            </button>
          ))}
        </nav>

        {/* Legal Text Content (Scrollable) */}
        <div style={{
          maxHeight: "50vh",
          overflowY: "auto",
          paddingRight: 8,
          fontSize: 13,
          color: "var(--text)",
          lineHeight: 1.7
        }}>
          {activeTab === "about" ? (
            <div>
              <h3>About MealMate</h3>
              <p>MealMate brings meal planning, recipe discovery, food logging, grocery organization, and food budgeting into one browser-based workspace. The public beta is free and does not require an account.</p>
            </div>
          ) : activeTab === "contact" ? (
            <div>
              <h3>Contact</h3>
              <p>Operator contact details have not yet been provided for this release. The product owner must publish a monitored support email and responsible operator name before inviting the public or collecting personal information.</p>
            </div>
          ) : activeTab === "grievance" ? (
            <div>
              <h3>Grievance information</h3>
              <p>A grievance contact and response process have not yet been configured. The operator must provide a monitored contact channel, responsible person, and handling process before public launch; this draft page is not a request-submission service.</p>
            </div>
          ) : activeTab === "nutrition" ? (
            <div>
              <h3>Nutrition disclaimer</h3>
              <p>MealMate provides general food and nutrition information, not medical advice, diagnosis, or treatment. Calorie and protein figures are estimates only when supported by recorded ingredients or an identified source; recipe brands, preparation, and serving sizes can change actual values.</p>
              <p>The adult Mifflin-St Jeor estimate is not applied to users under 18. The app does not prescribe calorie deficits or aggressive bulking for minors. Children, teenagers, and people with medical or special nutrition needs should consult a qualified health professional and, where appropriate, a parent or guardian.</p>
            </div>
          ) : activeTab === "advertising" ? (
            <div>
              <h3>Advertising disclosure</h3>
              <p>Advertising is disabled in this beta. The app includes only a labelled placeholder; it does not load advertising or analytics scripts. Nutrition profiles, body measurements, food logs, dietary restrictions, and other nutrition data are not sent to advertising providers.</p>
              <p>Any future advertising must be disclosed and reviewed for privacy, age-appropriate safeguards, and applicable law before activation.</p>
            </div>
          ) : activeTab === "terms" ? (
            <div>
              <p><strong>Draft:</strong> These terms are a product summary, not a finalized legal agreement. The owner must add the legal operator's name, contact details, governing law, and effective date and obtain jurisdiction-specific review before public launch.</p>
              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>Service</h4>
              <p>MealMate is a beta meal-planning and food-organization application. Features may change or be unavailable. Nutrition information is shown only when supported by recorded ingredient data or a stated source; it is for general information, not medical advice or a substitute for professional care. The calculator does not provide adult calorie targets or weight-change prescriptions to minors.</p>
              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>Accounts, data, and payments</h4>
              <p>In the default beta configuration, cloud accounts, new registrations, subscriptions, donations, and advertising are disabled. The workspace is stored in this browser and may be lost if its storage is cleared. These controls can be changed by the operator; account, payment, renewal, cancellation, refund, tax, and support terms must be reviewed and published before those services are enabled.</p>
              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>User content and acceptable use</h4>
              <p>Users are responsible for the content and data they enter and for maintaining their own exports. The operator must add a complete, locally reviewed acceptable-use, intellectual-property, liability, and dispute-resolution policy before launch.</p>
            </div>
          ) : (
            <div>
              <p><strong>Draft — not a complete privacy notice:</strong> The operator must replace this with an accurate notice naming the responsible person or entity, contact details, purposes, lawful basis, retention, rights-request process, processors, and effective date. Do not treat this draft as evidence of legal compliance.</p>
              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>Launch country</h4>
              <p>The operator has indicated that the initial intended launch country is India. If other countries are added, the operator must review and update the privacy, age, advertising, consumer, and tax disclosures before offering the service there.</p>
              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>Data handled by the current app</h4>
              <p>Meal, grocery, budget, recipe, and preference data is stored in this browser. Nutrition profiles, food logs, custom foods, theme, and feedback are also stored in browser local storage. In the default beta build, cloud accounts and sync are off. If the operator later enables both Supabase and the cloud-account setting, core workspace data—including meal and recipe records, expenses, budget, favourites, calorie target, and serving size—may be synced to the configured project. Nutrition profiles, food logs, and custom foods are not included in that sync. Browser storage can be lost if browser data is cleared and is not a cloud backup.</p>
              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>Third-party services</h4>
              <p>The site is hosted by its deployment provider and loads recipe photographs from external image hosts and fonts from Google Fonts; those providers receive ordinary browser requests. No advertising or analytics scripts are included in the app. Supabase requests occur only if cloud accounts are enabled; Razorpay checkout is loaded only if the operator enables a payment flow. The operator must verify provider terms, request logs, locations, retention, and all production network requests before publishing this notice.</p>
              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>Requests and retention</h4>
              <p>The app provides a browser-data export, but does not provide a complete in-app deletion or privacy-rights request workflow. Clearing this browser's site data removes its local workspace. The operator must implement and test account deletion, request handling, retention, and any required consent controls before enabling accounts or claiming these rights are operational.</p>
              <h4 style={{ margin: "14px 0 6px", fontSize: 13, color: "var(--text)" }}>India — DPDP commencement</h4>
              <p>The Digital Personal Data Protection Act, 2023 and the 2025 Rules have phased commencement; obligations must be checked against the applicable Gazette notifications and the actual launch date. Do not assume every provision is already in force or has the same effective date. <a href="https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDoxUjMtQWa" target="_blank" rel="noreferrer">Open the Ministry of Electronics and Information Technology's Rules page</a>. Obtain current Indian legal advice before launch.</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 20, paddingTop: 14, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, color: "var(--muted)", display: "flex", alignItems: "center", gap: 5 }}>
            <CheckCircle2 size={13} color="var(--green)" /> Draft only — legal review required before launch
          </span>
          <button type="button" className="btn btn-green" onClick={onClose} style={{ minHeight: 36, padding: "0 18px" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
