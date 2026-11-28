import { Leaf, Sparkles, ArrowUpRight, LogOut, User, Crown } from "lucide-react";

export default function Sidebar({
  page,
  setPage,
  navigation,
  mobileMenu,
  setMobileMenu,
  user,
  userPlan,
  accountAccessEnabled = false,
  paymentsEnabled = false,
  onOpenAuth,
  onOpenUpgrade,
  onSignOut
}) {
  return (
    <>
      {mobileMenu && (
        <button
          className="mobile-scrim"
          aria-label="Close menu"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside
        id="workspace-navigation"
        className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}
        aria-label="MealMate workspace"
      >
        <div className="sidebar-brand">
          <div className="brand">
            <span className="brand-icon"><Leaf /></span>
            <span>MealMate</span>
          </div>
          <button
            type="button"
            className="brand-plan"
            style={{
              cursor: paymentsEnabled ? "pointer" : "not-allowed",
              border: 0,
              background: userPlan === "PRO" ? "var(--green)" : undefined,
              color: userPlan === "PRO" ? "#fff" : undefined,
              display: "flex",
              alignItems: "center",
              gap: 3,
              opacity: paymentsEnabled ? 1 : 0.75
            }}
            disabled={!paymentsEnabled}
            onClick={onOpenUpgrade}
            title={paymentsEnabled ? "View plan details" : "Paid plans are unavailable during beta"}
          >
            {userPlan === "PRO" && <Crown size={11} />}
            <span>{userPlan}</span>
          </button>
        </div>

        <div className="nav-group">
          <div className="side-label">WORKSPACE</div>
          <nav className="side-nav" aria-label="Workspace pages">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = page === item.name;
              return (
                <button
                  key={item.name}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    setPage(item.name);
                    setMobileMenu(false);
                  }}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.name}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="nav-count" aria-label={`${item.count} items left to buy`}>{item.count}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-spacer" />

        <div className="sidebar-promo">
          {!paymentsEnabled && userPlan !== "PRO" ? (
            <>
              <div className="promo-spark"><Sparkles size={16} /></div>
              <strong>Public beta</strong>
              <p>Sign-in and cloud sync require Supabase configuration. Payments and advertising are disabled.</p>
            </>
          ) : (
            <>
              <div className="promo-spark"><Sparkles size={16} /></div>
              <strong>{userPlan === "PRO" ? "Pro Cloud Synchronized" : "MealMate Pro Feature"}</strong>
              <p>
                {userPlan === "PRO"
                  ? "Your account has access to cloud-synced workspace features."
                  : "Explore additional MealMate features and plan details."}
              </p>
              <button onClick={onOpenUpgrade}>
                {userPlan === "PRO" ? "Manage Plan" : "Explore Pro"} <ArrowUpRight size={13} />
              </button>
            </>
          )}
        </div>

        {/* User Profile / Auth Area */}
        <div className="profile">
          <div className="avatar">{user ? (user.name ? user.name[0].toUpperCase() : "M") : "G"}</div>
          <div className="profile-copy">
            {user ? (
              <>
                <strong>{user.name || "MealMate Member"}</strong>
                <span title={user.email}>{user.email || "Personal Workspace"}</span>
              </>
            ) : (
              <>
                <button
                  type="button"
                  style={{ border: 0, background: "none", color: "var(--green)", fontWeight: 700, padding: 0, cursor: "pointer", fontSize: 11, textAlign: "left" }}
                  onClick={onOpenAuth}
                  title={accountAccessEnabled ? "Sign in or register" : "Configure Supabase to enable account access"}
                >
                  Sign In / Register
                </button>
                <span>Local Workspace</span>
              </>
            )}
          </div>
          {user ? (
            <button
              type="button"
              className="row-action-btn"
              title="Sign Out"
              onClick={onSignOut}
              style={{ width: 28, height: 28 }}
            >
              <LogOut size={13} />
            </button>
          ) : (
            <button
              type="button"
              className="row-action-btn"
              title={accountAccessEnabled ? "Sign in or register" : "Configure Supabase to enable account access"}
              aria-label="Sign in or register"
              onClick={onOpenAuth}
              style={{ width: 28, height: 28 }}
            >
              <User size={13} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
