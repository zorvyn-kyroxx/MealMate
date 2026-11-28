import { Menu, ChevronRight, Bell, Moon, Sun, User as UserIcon } from "lucide-react";
import { prettyDate } from "../utils/dateUtils";

export default function Topbar({
  page,
  today,
  theme,
  setTheme,
  user,
  accountAccessEnabled = false,
  onOpenAuth,
  mobileMenu,
  setMobileMenu,
  showNotification
}) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="mobile-menu-btn"
        aria-label={mobileMenu ? "Close workspace menu" : "Open workspace menu"}
        aria-expanded={mobileMenu}
        aria-controls="workspace-navigation"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <Menu size={20} aria-hidden="true" />
      </button>
      <div className="breadcrumb">
        <span>Workspace</span>
        <ChevronRight size={14} />
        <strong>{page}</strong>
      </div>
      <div className="top-actions">
        <div className="top-date">
          <span className="status-dot" />
          <span>{prettyDate(today, { weekday: "short", day: "numeric", month: "short" })}</span>
        </div>
        <button
          type="button"
          className="icon-button"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
        </button>
        <button
          type="button"
          className="icon-button"
          title="Quick notification"
          aria-label="Show beta and data storage information"
          onClick={() => showNotification("MealMate is in beta. Your workspace is stored in this browser unless you sign in.")}
        >
          <Bell size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="avatar top-avatar"
          style={{ cursor: "pointer", border: 0 }}
          title={user ? `${user.name} (${user.email})` : accountAccessEnabled ? "Sign in to MealMate" : "Configure Supabase to enable account access"}
          aria-label={user ? `Signed in as ${user.name || user.email}` : "Sign in to MealMate"}
          onClick={onOpenAuth}
        >
          {user ? (user.name ? user.name[0].toUpperCase() : "M") : <UserIcon size={14} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
