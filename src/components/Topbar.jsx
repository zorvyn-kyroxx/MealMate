import { Menu, ChevronRight, Bell, Moon, Sun } from "lucide-react";
import { prettyDate } from "../utils/dateUtils";

export default function Topbar({
  page,
  today,
  theme,
  setTheme,
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
          onClick={() => showNotification("You are making great progress today!")}
        >
          <Bell size={18} />
        </button>
        <div className="avatar top-avatar">M</div>
      </div>
    </header>
  );
}
