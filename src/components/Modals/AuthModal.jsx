import { useState } from "react";
import { X, Lock, Mail, User, Shield, Cloud } from "lucide-react";
import { isSupabaseConfigured, signInWithEmail, signUpWithEmail } from "../../services/supabaseClient";

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  showNotification,
  accountCreationEnabled = false,
  accountAccessEnabled = false
}) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!accountAccessEnabled) {
      setErrorMessage("Account access and cloud sync are disabled during the public beta.");
      return;
    }

    if (isRegister && !accountCreationEnabled) {
      setErrorMessage("Account creation is paused during the beta while privacy and parental-consent safeguards are being prepared.");
      return;
    }

    if (!isSupabaseConfigured) {
      setErrorMessage("Sign-in is unavailable until Supabase authentication is configured.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        const { data, error } = await signUpWithEmail(email, password, name);
        if (error) {
          setErrorMessage(error.message);
        } else {
          const userObj = data.user;
          onLoginSuccess({
            id: userObj.id,
            email: userObj.email,
            name: userObj.user_metadata?.full_name || name || email.split("@")[0],
            plan: "FREE"
          });
          showNotification("Account created successfully!");
          onClose();
        }
      } else {
        const { data, error } = await signInWithEmail(email, password);
        if (error) {
          setErrorMessage(error.message);
        } else {
          const userObj = data.user;
          onLoginSuccess({
            id: userObj.id,
            email: userObj.email,
            name: userObj.user_metadata?.full_name || email.split("@")[0],
            plan: "FREE"
          });
          showNotification("Signed in successfully!");
          onClose();
        }
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
        <div className="modal-heading" style={{ marginBottom: 16 }}>
          <div>
            <span className="eyebrow">
              <Shield size={13} style={{ marginRight: 4 }} /> USER AUTHENTICATION
            </span>
            <h2>{isRegister ? "Create MealMate Account" : "Welcome Back"}</h2>
          </div>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Cloud Connection Badge */}
        <div style={{
          padding: "8px 12px",
          borderRadius: "8px",
          background: accountAccessEnabled && isSupabaseConfigured ? "var(--green-soft)" : "#fff8e6",
          border: `1px solid ${accountAccessEnabled && isSupabaseConfigured ? "#c8dec7" : "#fae09c"}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
          fontSize: 10,
          fontWeight: 700,
          color: accountAccessEnabled && isSupabaseConfigured ? "#385940" : "#8c6b12"
        }}>
          <Cloud size={14} />
          <span>
            {accountAccessEnabled && isSupabaseConfigured
              ? "Cloud Database Synced (Supabase Active)"
              : "Account access and cloud sync are disabled during beta"}
          </span>
        </div>
        {!accountAccessEnabled && (
          <p role="status" style={{ margin: "0 0 16px", fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>
            MealMate works without an account. Your workspace stays in this browser; clearing its storage can erase saved data.
          </p>
        )}

        {/* Tab Selector */}
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
              background: !isRegister ? "var(--surface)" : "transparent",
              color: !isRegister ? "var(--text)" : "var(--muted)",
              boxShadow: !isRegister ? "0 2px 8px rgba(0,0,0,0.06)" : "none"
            }}
            onClick={() => { setIsRegister(false); setErrorMessage(""); }}
          >
            Sign In
          </button>
          {accountCreationEnabled && <button
            type="button"
            style={{
              flex: 1,
              padding: "8px 0",
              border: 0,
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              background: isRegister ? "var(--surface)" : "transparent",
              color: isRegister ? "var(--text)" : "var(--muted)",
              boxShadow: isRegister ? "0 2px 8px rgba(0,0,0,0.06)" : "none"
            }}
            onClick={() => { setIsRegister(true); setErrorMessage(""); }}
          >
            Register
          </button>}
        </div>

        {!accountCreationEnabled && (
          <p role="status" style={{ margin: "0 0 16px", fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>
            {accountAccessEnabled
              ? "New account creation is paused while privacy and parental-consent safeguards are prepared."
              : "Account access and new registrations are paused while privacy and parental-consent safeguards are prepared."}
          </p>
        )}

        {errorMessage && (
          <div style={{
            padding: "9px 13px",
            borderRadius: 8,
            background: "#fff1f1",
            border: "1px solid #ffd4d4",
            color: "#b03a3a",
            fontSize: 11,
            fontWeight: 600,
            marginBottom: 14
          }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Your Full Name
              <div style={{ position: "relative" }}>
                <input
                  required
                  type="text"
                  disabled={!accountAccessEnabled || !isSupabaseConfigured}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  style={{ paddingLeft: 34 }}
                />
                <User size={15} style={{ position: "absolute", left: 11, top: 13, color: "var(--muted)" }} />
              </div>
            </label>
          )}

          <label>
            Email Address
            <div style={{ position: "relative" }}>
              <input
                required
                type="email"
                disabled={!accountAccessEnabled || !isSupabaseConfigured}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                style={{ paddingLeft: 34 }}
              />
              <Mail size={15} style={{ position: "absolute", left: 11, top: 13, color: "var(--muted)" }} />
            </div>
          </label>

          <label>
            Password (minimum 6 characters)
            <div style={{ position: "relative" }}>
              <input
                required
                type="password"
                disabled={!accountAccessEnabled || !isSupabaseConfigured}
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingLeft: 34 }}
              />
              <Lock size={15} style={{ position: "absolute", left: 11, top: 13, color: "var(--muted)" }} />
            </div>
          </label>

          <button
            className="btn btn-green modal-submit"
            type="submit"
            disabled={loading || !accountAccessEnabled || !isSupabaseConfigured}
            style={{ marginTop: 10, width: "100%" }}
          >
            {loading ? "Processing..." : isRegister ? "Create Account" : "Sign In to Workspace"}
          </button>
        </form>

          {accountCreationEnabled && (
            <p style={{ margin: "16px 0 0", textAlign: "center", fontSize: 10, color: "var(--muted)" }}>
              {isRegister ? "Already registered?" : "Don't have an account yet?"}{" "}
              <button
                type="button"
                style={{ border: 0, background: "none", color: "var(--green)", fontWeight: 700, cursor: "pointer", padding: 0 }}
                onClick={() => { setIsRegister(!isRegister); setErrorMessage(""); }}
              >
                {isRegister ? "Sign in instead" : "Create one now"}
              </button>
            </p>
          )}
      </div>
    </div>
  );
}
