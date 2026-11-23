import { Menu, ChevronRight, Bell, Moon, Sun, User as UserIcon } from "lucide-react";
import { prettyDate } from "../utils/dateUtils";

export default function Topbar({
  page,
  today,
  theme,
  setTheme,
  user,
  onOpenAuth,
  mobileMenu,
  setMobileMenu,
  showNotification
}) {
  return (
    <header className="topbar">
      <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)}>
        <Menu size={20} />
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
          className="icon-button"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          className="icon-button"
          title="Quick notification"
          onClick={() => showNotification("Your food schedule is in sync!")}
        >
          <Bell size={18} />
        </button>
        <button
          type="button"
          className="avatar top-avatar"
          style={{ cursor: "pointer", border: 0 }}
          title={user ? `${user.name} (${user.email})` : "Click to sign in"}
          onClick={onOpenAuth}
        >
          {user ? (user.name ? user.name[0].toUpperCase() : "M") : <UserIcon size={14} />}
        </button>
      </div>
    </header>
  );
}
