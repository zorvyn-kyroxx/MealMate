import { Leaf, Sparkles, ArrowUpRight, LogOut, User, Crown } from "lucide-react";

export default function Sidebar({
  page,
  setPage,
  navigation,
  mobileMenu,
  setMobileMenu,
  user,
  userPlan,
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

      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand">
            <span className="brand-icon"><Leaf /></span>
            <span>MealMate</span>
          </div>
          <button
            type="button"
            className="brand-plan"
            style={{
              cursor: "pointer",
              border: 0,
              background: userPlan === "PRO" ? "var(--green)" : undefined,
              color: userPlan === "PRO" ? "#fff" : undefined,
              display: "flex",
              alignItems: "center",
              gap: 3
            }}
            onClick={onOpenUpgrade}
            title="Click to view plan details"
          >
            {userPlan === "PRO" && <Crown size={11} />}
            <span>{userPlan}</span>
          </button>
        </div>

        <div className="nav-group">
          <div className="side-label">WORKSPACE</div>
          <nav className="side-nav">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = page === item.name;
              return (
                <button
                  key={item.name}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setPage(item.name);
                    setMobileMenu(false);
                  }}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="nav-count">{item.count}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-spacer" />

        <div className="sidebar-promo">
          <div className="promo-spark"><Sparkles size={16} /></div>
          <strong>{userPlan === "PRO" ? "Pro Cloud Synchronized" : "MealMate Pro Feature"}</strong>
          <p>
            {userPlan === "PRO"
              ? "All your recipes, meal schedules, and grocery lists are active on your personal cloud."
              : "Upgrade to sync your nutrition schedules across all your devices in real-time."}
          </p>
          <button onClick={onOpenUpgrade}>
            {userPlan === "PRO" ? "Manage Plan" : "Explore Pro"} <ArrowUpRight size={13} />
          </button>
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
              title="Sign in or register"
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
