import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  ChefHat,
  CircleDollarSign,
  ClipboardCheck,
  Flame,
  Leaf,
  ShieldCheck,
  ShoppingBasket,
  Utensils
} from "lucide-react";
import heroImg from "../assets/hero.png";
import LegalLinks from "./LegalLinks";

const features = [
  {
    icon: CalendarDays,
    title: "Smart Meal Planner",
    description: "Plan breakfast, lunch, and dinner by day. Planned meals stay separate from food you have logged as eaten."
  },
  {
    icon: ChefHat,
    title: "Recipe Library",
    description: "Find recipes, save favourites, and keep ingredients and serving information together."
  },
  {
    icon: Flame,
    title: "Calorie Calculator",
    description: "Review an adult calorie estimate with its method and limitations. It is not a medical prescription."
  },
  {
    icon: Activity,
    title: "Protein Calculator",
    description: "See a practical protein reference based on the information and activity level you provide."
  },
  {
    icon: ClipboardCheck,
    title: "Nutrition Tracker",
    description: "Log food you actually consumed and review daily totals from recorded nutrition information."
  },
  {
    icon: ShoppingBasket,
    title: "Grocery Manager",
    description: "Organize shopping items, check off purchases, and add ingredients from planned recipes."
  },
  {
    icon: CircleDollarSign,
    title: "Food Budget Tracker",
    description: "Record food expenses and see monthly spending against the budget you set."
  }
];

export default function LandingPage({ onStart, onOpenLegal, previewMeals = [] }) {
  return (
    <main className="landing">
      <nav className="landing-nav" aria-label="Main navigation">
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
            Plan meals, discover recipes, track food you actually eat, organize groceries, and review your food budget in one simple workspace.
          </p>
          <div className="hero-actions">
            <button className="btn btn-green hero-btn" onClick={onStart}>
              Start planning <ArrowUpRight size={18} />
            </button>
            <div className="hero-caption">
              <ShieldCheck size={16} />
              <span>Free beta. No account, payment, or advertising required.</span>
            </div>
          </div>
          <div className="hero-social-proof">
            <div className="avatar-stack"><ShieldCheck size={18} /></div>
            <div>
              <strong>Designed for your own food routine</strong>
              <div>Workspace data stays in this browser by default. Clearing browser data can remove it.</div>
            </div>
          </div>
        </div>

        <div className="hero-showcase">
          <div className="hero-orbit" />
          <div className="hero-photo">
            <img src={heroImg} alt="A colorful meal served with fresh ingredients" />
          </div>
          <section className="landing-planner-preview" aria-label="Sample MealMate planner interface">
            <div className="planner-preview-heading">
              <span>EXAMPLE WORKSPACE</span>
              <strong>Today&apos;s meal plan</strong>
            </div>
            <div className="planner-preview-meals">
              {previewMeals.slice(0, 3).map((meal) => (
                <div className="planner-preview-meal" key={meal.id}>
                  <span className={`planner-preview-dot ${meal.type.toLowerCase()}`} />
                  <span className="planner-preview-copy">
                    <strong>{meal.title}</strong>
                    <small>{meal.type} · {meal.time}</small>
                  </span>
                  <span className="planner-preview-nutrition">Nutrition not recorded</span>
                </div>
              ))}
            </div>
            <p>Starter demo meals · planned does not mean eaten</p>
          </section>
        </div>
      </section>

      <section className="landing-benefits" aria-labelledby="landing-features-title">
        <div className="benefit-intro">
          <div className="eyebrow"><span className="eyebrow-dot" /> PURPOSE-BUILT SYSTEM</div>
          <h2 id="landing-features-title">Food planning, nutrition, and everyday organization—together.</h2>
          <p>Use the tools you need, at your own pace. Nutrition values are shown only when supported by recorded data.</p>
        </div>
        <div className="landing-feature-grid">
          {features.map(({ icon: Icon, title, description }) => (
            <article className="benefit-card" key={title}>
              <div className="benefit-icon"><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-trust" aria-label="About MealMate">
        <div className="benefit-icon"><Utensils aria-hidden="true" /></div>
        <div>
          <h2>A calmer way to organize food for the week.</h2>
          <p>MealMate brings planning, recipes, food logging, groceries, and spending into one browser-based workspace. Nutrition estimates are for general information, not medical advice.</p>
        </div>
        <button className="btn btn-green" onClick={onStart}>
          Explore MealMate <ArrowUpRight size={16} />
        </button>
      </section>

      <footer className="landing-footer">
        <span>© 2026 MealMate · Eat better. Live brighter.</span>
        <LegalLinks onOpenLegal={onOpenLegal} className="landing-footer-links" />
      </footer>
    </main>
  );
}
