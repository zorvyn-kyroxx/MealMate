import { useState } from "react";
import { X, Lock, Mail, User, Shield, Cloud } from "lucide-react";
import {
  isSupabaseConfigured,
  resendSignupConfirmation,
  signInWithEmail,
  signUpWithEmail
} from "../../services/supabaseClient";
import { getSignUpOutcome } from "../../utils/auth";

const confirmationRequiredMessage = "Your account has been created successfully! Please check your email inbox (Gmail) and click the verification link to activate your MealMate account. If the email isn't visible, check your Spam/Junk folder.";

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  showNotification
}) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [pendingConfirmationEmail, setPendingConfirmationEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErrorMessage("");
    setStatusMessage("");

    if (!isSupabaseConfigured) {
      setErrorMessage("Supabase authentication is not configured. Set VITE_SUPABASE_URL and either VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_KEY in the deployment environment.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
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
        const { data, error } = await signUpWithEmail(normalizedEmail, password, name.trim());
        if (error) {
          throw error;
        }
        const signupOutcome = getSignUpOutcome(data);
        if (signupOutcome === "duplicate") {
          setPendingConfirmationEmail(normalizedEmail);
          setEmail(normalizedEmail);
          setIsRegister(false);
          setStatusMessage("We couldn't complete signup for this address. If you recently signed up, request a confirmation email below. If you already have an account, sign in instead.");
          return;
        }
        if (signupOutcome === "confirmation-required") {
          setPendingConfirmationEmail(normalizedEmail);
          setEmail(normalizedEmail);
          setPassword("");
          setIsRegister(false);
          setStatusMessage(confirmationRequiredMessage);
          return;
        }

        setPendingConfirmationEmail("");
        const userObj = data.user;
        await onLoginSuccess({
          id: userObj.id,
          email: userObj.email,
          name: userObj.user_metadata?.full_name || name.trim() || normalizedEmail.split("@")[0]
        });
        showNotification("Account created successfully. Email confirmation is not required, and you're signed in.");
        onClose();
      } else {
        const { data, error } = await signInWithEmail(normalizedEmail, password);
        if (error) {
          throw error;
        }
        if (!data?.user) throw new Error("Supabase did not return a user after sign-in.");
        setPendingConfirmationEmail("");
        const userObj = data.user;
        await onLoginSuccess({
          id: userObj.id,
          email: userObj.email,
          name: userObj.user_metadata?.full_name || normalizedEmail.split("@")[0]
        });
        showNotification("Signed in successfully!");
        onClose();
      }
    } catch (error) {
      const code = error?.code || "";
      const message = error?.message || "";
      if (code === "email_not_confirmed") {
        setPendingConfirmationEmail(normalizedEmail);
        setEmail(normalizedEmail);
        setIsRegister(false);
        setStatusMessage("This email address hasn't been confirmed yet. Check your inbox (Gmail) and click the verification link. If it isn't visible, check your Spam/Junk folder.");
      } else if (code === "invalid_credentials" || /invalid login credentials/i.test(message)) {
        setErrorMessage("Email or password is incorrect. Check your details and try again.");
      } else if (isRegister && (["email_exists", "user_already_exists"].includes(code) || /already registered|already exists/i.test(message))) {
        setPendingConfirmationEmail(normalizedEmail);
        setEmail(normalizedEmail);
        setIsRegister(false);
        setStatusMessage("We couldn't complete signup for this address. If you recently signed up, request a confirmation email below. If you already have an account, sign in instead.");
      } else if (error?.name === "AuthRetryableFetchError" || /network|fetch failed|failed to fetch/i.test(message)) {
        setErrorMessage("Could not reach Supabase. Check your connection and try again.");
      } else {
        setErrorMessage(message || "Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (loading || !pendingConfirmationEmail) return;
    setErrorMessage("");
    setStatusMessage("");
    setLoading(true);

    try {
      const { error } = await resendSignupConfirmation(pendingConfirmationEmail);
      if (error) throw error;
      setStatusMessage("If this address has a pending signup, a confirmation email should arrive shortly. Check your Gmail inbox and Spam/Junk folder.");
    } catch (error) {
      const code = error?.code || "";
      const message = error?.message || "";
      if (code === "over_email_send_rate_limit" || error?.status === 429) {
        setErrorMessage("Too many email requests. Please wait a few minutes before trying again.");
      } else if (error?.name === "AuthRetryableFetchError" || /network|fetch failed|failed to fetch/i.test(message)) {
        setErrorMessage("Could not reach Supabase. Check your connection and try again.");
      } else {
        setErrorMessage("We couldn't request a confirmation email right now. Please try again later.");
      }
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
          background: isSupabaseConfigured ? "var(--green-soft)" : "#fff8e6",
          border: `1px solid ${isSupabaseConfigured ? "#c8dec7" : "#fae09c"}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
          fontSize: 10,
          fontWeight: 700,
          color: isSupabaseConfigured ? "#385940" : "#8c6b12"
        }}>
          <Cloud size={14} />
          <span>
            {isSupabaseConfigured
              ? "Supabase authentication is available"
              : "Supabase authentication is not configured"}
          </span>
        </div>
        {!isSupabaseConfigured && (
          <p role="status" style={{ margin: "0 0 16px", fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>
            Add the Supabase project URL and an anon or publishable key to enable sign-in and account creation. The key must never be a service-role key.
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
            disabled={loading}
            onClick={() => { setIsRegister(false); setErrorMessage(""); setStatusMessage(""); }}
          >
            Sign In
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
              background: isRegister ? "var(--surface)" : "transparent",
              color: isRegister ? "var(--text)" : "var(--muted)",
              boxShadow: isRegister ? "0 2px 8px rgba(0,0,0,0.06)" : "none"
            }}
            disabled={loading}
            onClick={() => { setIsRegister(true); setErrorMessage(""); setStatusMessage(""); }}
          >
            Register
          </button>
        </div>

        {errorMessage && (
          <div role="alert" style={{
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
        {statusMessage && (
          <div role="status" style={{
            padding: "9px 13px",
            borderRadius: 8,
            background: "var(--green-soft)",
            border: "1px solid #c8dec7",
            color: "var(--green-dark)",
            fontSize: 11,
            fontWeight: 600,
            marginBottom: 14
          }}>
            {statusMessage}
          </div>
        )}
        {pendingConfirmationEmail && (
          <div style={{ marginBottom: 14 }}>
            <button
              className="btn btn-outline"
              type="button"
              disabled={loading}
              onClick={handleResendConfirmation}
              style={{ width: "100%" }}
            >
              {loading ? "Sending confirmation email..." : "Resend confirmation email"}
            </button>
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
                  disabled={loading}
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
                disabled={loading}
                value={email}
                onChange={(e) => {
                  const nextEmail = e.target.value;
                  setEmail(nextEmail);
                  if (pendingConfirmationEmail && nextEmail.trim().toLowerCase() !== pendingConfirmationEmail) {
                    setPendingConfirmationEmail("");
                    setStatusMessage("");
                  }
                }}
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
                disabled={loading}
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
            disabled={loading}
            style={{ marginTop: 10, width: "100%" }}
          >
            {loading ? "Processing..." : isRegister ? "Create Account" : "Sign In to Workspace"}
          </button>
        </form>

            <p style={{ margin: "16px 0 0", textAlign: "center", fontSize: 10, color: "var(--muted)" }}>
              {isRegister ? "Already registered?" : "Don't have an account yet?"}{" "}
              <button
                type="button"
                style={{ border: 0, background: "none", color: "var(--green)", fontWeight: 700, cursor: "pointer", padding: 0 }}
                disabled={loading}
                onClick={() => { setIsRegister(!isRegister); setErrorMessage(""); setStatusMessage(""); }}
              >
                {isRegister ? "Sign in instead" : "Create one now"}
              </button>
            </p>
      </div>
    </div>
  );
}
