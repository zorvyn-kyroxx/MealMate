import { Leaf, ArrowUpRight, Sparkles, CalendarCheck, Check, CalendarDays, ChefHat, CircleDollarSign } from "lucide-react";
import heroImg from "../assets/hero.png";

export default function LandingPage({ onStart, onOpenLegal }) {
  return (
    <main className="landing">
      <nav className="landing-nav">
        <div className="brand">
          <span className="brand-icon"><Leaf /></span>
          <span>MealMate</span>
        </div>
        <div className="landing-nav-right">
          <span className="landing-nav-note">Eat better. Live brighter.</span>
          <button className="btn btn-dark" onClick={onStart}>
            Open app <ArrowUpRight size={17} />
          </button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>YOUR SMARTER FOOD ROUTINE</span>
          </div>
          <h1>
            Eat better.<br />
            <em>Live brighter.</em>
          </h1>
          <p>
            Plan delicious meals, discover curated recipes, organise your grocery checklist, and master your food budget — all in one modern, distraction-free space.
          </p>
          <div className="hero-actions">
            <button className="btn btn-green hero-btn" onClick={onStart}>
              Start planning <ArrowUpRight size={18} />
            </button>
            <div className="hero-caption">
              <Sparkles size={16} />
              <span>No credit card required. Free tier available.</span>
            </div>
          </div>
          <div className="hero-social-proof">
            <div className="avatar-stack">
              <span>✦</span>
              <span>★</span>
              <span>♥</span>
            </div>
            <div>
              <strong>Loved by food lovers & busy professionals</strong>
              <div>Streamlining weekly meal routines with ease</div>
            </div>
          </div>
        </div>

        <div className="hero-showcase">
          <div className="hero-orbit" />
          <div className="hero-photo">
            <img src={heroImg} alt="Delicious and healthy fresh meal prep" />
          </div>
          <div className="hero-float-card hero-float-top">
            <div className="float-icon"><CalendarCheck size={18} /></div>
            <div>
              <strong>Weekly plan ready</strong>
              <small>7 meals organized</small>
            </div>
          </div>
          <div className="hero-float-card hero-float-bottom">
            <div className="float-check"><Check size={14} /></div>
            <div>
              <strong>Smart grocery list</strong>
              <small>Auto-synced ingredients</small>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-benefits">
        <div className="benefit-intro">
          <div className="eyebrow"><span className="eyebrow-dot" /> PURPOSE-BUILT SYSTEM</div>
          <h2>Everything you need for effortless nutrition.</h2>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon"><CalendarDays /></div>
          <h3>Weekly Meal Planner</h3>
          <p>Schedule breakfast, lunch, and dinner with precise calorie targets and effortless week-to-week navigation.</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon"><ChefHat /></div>
          <h3>Curated Recipe Library</h3>
          <p>Explore chef-crafted recipes, manage your personal collection, and push ingredients straight to groceries.</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon"><CircleDollarSign /></div>
          <h3>Intelligent Food Budget</h3>
          <p>Monitor your grocery spend in real time, avoid overspending, and stay on track with clear financial insights.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <span>© 2026 MealMate · Eat better. Live brighter.</span>
        <div style={{ display: "flex", gap: 14 }}>
          <button
            type="button"
            style={{ border: 0, background: "none", color: "inherit", cursor: "pointer", fontSize: 10, textDecoration: "underline", padding: 0 }}
            onClick={() => onOpenLegal("terms")}
          >
            Terms of Service
          </button>
          <span>·</span>
          <button
            type="button"
            style={{ border: 0, background: "none", color: "inherit", cursor: "pointer", fontSize: 10, textDecoration: "underline", padding: 0 }}
            onClick={() => onOpenLegal("privacy")}
          >
            Privacy Policy
          </button>
        </div>
      </footer>
    </main>
  );
}
