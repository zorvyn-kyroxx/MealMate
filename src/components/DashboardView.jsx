import { Plus, ArrowUpRight, CalendarDays, Flame, ShoppingBasket, CircleDollarSign, ChevronRight, Coffee, Clock3, Pencil, Sparkles, Eye, Utensils } from "lucide-react";
import heroImg from "../assets/hero.png";
import { prettyDate } from "../utils/dateUtils";

export default function DashboardView({
  today,
  todayKey,
  weekMeals,
  todayMeals,
  todayCalories,
  groceries,
  completedGroceries,
  groceryProgress,
  totalSpent,
  remainingBudget,
  starterRecipe,
  iconForMeal,
  onOpenNewMeal,
  onOpenEditMeal,
  onOpenRecipeDetails,
  onNavigate
}) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>YOUR PERSONAL OVERVIEW</span>
          </div>
          <h1>Good day! <em>🌿</em></h1>
          <p>Here is what is happening with your weekly food routine and nutrition schedule.</p>
        </div>
        <button className="btn btn-green" onClick={() => onOpenNewMeal(todayKey)}>
          <Plus size={17} /> Add a meal
        </button>
      </div>

      {/* Dashboard Banner */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <span className="hero-kicker">SMART ROUTINE</span>
          <h2>Make room for<br /><em>something delicious.</em></h2>
          <p>Your week is mapped out with nourishing dishes. Keep consistency and feel your best.</p>
          <button className="hero-text-button" onClick={() => onNavigate("Meal Planner")}>
            Inspect weekly calendar <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="dashboard-hero-image">
          <img src={heroImg} alt="Wholesome ingredients bowl" />
        </div>
        <div className="hero-stamp">
          <span>MEALMATE</span>
          <strong>FRESH</strong>
          <Sparkles size={12} />
        </div>
      </section>

      {/* Stats Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <span>Planned this week</span>
            <div className="stat-icon sage"><CalendarDays size={16} /></div>
          </div>
          <strong>{weekMeals.length}</strong>
          <small className="stat-trend">Across current 7 days</small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Today's calories</span>
            <div className="stat-icon peach"><Flame size={16} /></div>
          </div>
          <strong>{todayCalories} <span className="stat-denom">kcal</span></strong>
          <small>{todayMeals.length} meals scheduled today</small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Grocery checklist</span>
            <div className="stat-icon blue"><ShoppingBasket size={16} /></div>
          </div>
          <strong>{completedGroceries}/{groceries.length}</strong>
          <small>{groceryProgress}% items purchased</small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Food spend</span>
            <div className="stat-icon lilac"><CircleDollarSign size={16} /></div>
          </div>
          <strong>₹{totalSpent.toLocaleString("en-IN")}</strong>
          <small>₹{remainingBudget.toLocaleString("en-IN")} remaining</small>
        </div>
      </section>

      {/* Dashboard Panels */}
      <section className="dashboard-columns">
        {/* Today's Meals */}
        <div className="surface-card">
          <div className="section-heading">
            <div>
              <h3>Today's Meal Plan</h3>
              <p>{prettyDate(today, { weekday: "long", day: "numeric", month: "long" })}</p>
            </div>
            <button className="hero-text-button" onClick={() => onNavigate("Meal Planner")}>
              View Planner <ChevronRight size={14} />
            </button>
          </div>

          {todayMeals.length === 0 ? (
            <div className="empty-state">
              <Coffee size={32} style={{ margin: "0 auto 10px", opacity: 0.4 }} />
              <p>No meals scheduled for today yet.</p>
              <button className="btn btn-green" onClick={() => onOpenNewMeal(todayKey)} style={{ marginTop: 8 }}>
                <Plus size={15} /> Add today's first meal
              </button>
            </div>
          ) : (
            <div>
              {todayMeals.map((meal) => {
                const MealIcon = iconForMeal(meal.type);
                const kindClass = meal.type.toLowerCase();
                return (
                  <div className="meal-list-row" key={meal.id}>
                    <div className={`meal-kind-icon ${kindClass}`}>
                      <MealIcon size={18} />
                    </div>
                    <div className="meal-list-info">
                      <strong>{meal.title}</strong>
                      <span>
                        {meal.type} <i>·</i> {meal.calories} kcal
                      </span>
                    </div>
                    <div className="meal-list-time">
                      <Clock3 size={13} />
                      <span>{meal.time}</span>
                    </div>
                    <button
                      className="row-edit"
                      title="Edit meal"
                      onClick={() => onOpenEditMeal(meal)}
                    >
                      <Pencil size={13} />
                    </button>
                  </div>
                );
              })}
              <button className="add-row-button" onClick={() => onOpenNewMeal(todayKey)}>
                <Plus size={14} /> Add another meal for today
              </button>
            </div>
          )}
        </div>

        {/* Recipe Highlight & Quick Inspiration */}
        <div className="surface-card">
          <div className="section-heading">
            <div>
              <h3>Weekly Inspiration</h3>
              <p>Hand-picked for balanced nutrition</p>
            </div>
            <Sparkles size={18} className="sparkle-mark" />
          </div>

          {starterRecipe && (
            <div className="inspiration-card">
              <div className="inspiration-photo">
                <img src={starterRecipe.image} alt={starterRecipe.title} />
                <span className="photo-label">{starterRecipe.category.toUpperCase()}</span>
              </div>
              <h4>{starterRecipe.title}</h4>
              <p>{starterRecipe.description}</p>
              <button
                className="btn btn-green"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => onOpenRecipeDetails(starterRecipe)}
              >
                <Eye size={15} /> View recipe details
              </button>
            </div>
          )}

          <div className="bottom-insight">
            <div className="insight-icon"><Utensils size={16} /></div>
            <div>
              <strong>Need more ideas?</strong>
              <p>Browse our recipe library or create your custom dishes.</p>
            </div>
            <button onClick={() => onNavigate("Recipes")}>
              Explore <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
