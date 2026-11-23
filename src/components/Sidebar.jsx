import { Leaf, Sparkles, ArrowUpRight, MoreHorizontal } from "lucide-react";

export default function Sidebar({
  page,
  setPage,
  navigation,
  mobileMenu,
  setMobileMenu
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
          <span className="brand-plan">FREE</span>
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
          <strong>Daily Nutrition Tip</strong>
          <p>Meal planning reduces weekly food waste by up to 30% and keeps your budget intact.</p>
          <button onClick={() => { setPage("Meal Planner"); setMobileMenu(false); }}>
            Review planner <ArrowUpRight size={13} />
          </button>
        </div>

        <div className="profile">
          <div className="avatar">M</div>
          <div className="profile-copy">
            <strong>MealMate User</strong>
            <span>Personal Workspace</span>
          </div>
          <MoreHorizontal size={16} className="profile-more" />
        </div>
      </aside>
    </>
  );
}
