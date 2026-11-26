import { useMemo } from "react";
import { Flame, CalendarDays, ShoppingBasket, CircleDollarSign, TrendingUp, ChefHat } from "lucide-react";

export default function AnalyticsView({
  meals,
  recipes,
  groceries,
  expenses,
  budget,
  totalSpent
}) {
  // Meal distribution breakdown
  const mealDistribution = useMemo(() => {
    const counts = { Breakfast: 0, Lunch: 0, Dinner: 0, Snack: 0 };
    meals.forEach((m) => {
      if (counts[m.type] !== undefined) {
        counts[m.type]++;
      }
    });
    const total = meals.length || 1;
    return [
      { type: "Breakfast", count: counts.Breakfast, percent: Math.round((counts.Breakfast / total) * 100), color: "#d7a078" },
      { type: "Lunch", count: counts.Lunch, percent: Math.round((counts.Lunch / total) * 100), color: "#8aa77f" },
      { type: "Dinner", count: counts.Dinner, percent: Math.round((counts.Dinner / total) * 100), color: "#a596c0" },
      { type: "Snack", count: counts.Snack, percent: Math.round((counts.Snack / total) * 100), color: "#85a5b5" }
    ];
  }, [meals]);

  // Calories average
  const totalCalories = useMemo(() => meals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0), [meals]);
  const avgCaloriesPerMeal = meals.length > 0 ? Math.round(totalCalories / meals.length) : 0;

  // Grocery progress
  const completedGroceries = groceries.filter((g) => g.done).length;
  const groceryRate = groceries.length > 0 ? Math.round((completedGroceries / groceries.length) * 100) : 0;

  // Budget efficiency
  const budgetUtilization = budget > 0 ? Math.round((totalSpent / budget) * 100) : 0;
  const isUnderBudget = totalSpent <= budget;

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>SMART NUTRITION & SPENDING INSIGHTS</span>
          </div>
          <h1>Food & Habit Analytics</h1>
          <p>Gain actionable visibility into your weekly meal planning patterns, nutrition targets, and food expenditures.</p>
        </div>
      </div>

      {/* Top 3 High-Level Metric Cards */}
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-header">
            <h3>Planned Meals</h3>
            <div className="stat-icon sage"><CalendarDays size={16} /></div>
          </div>
          <strong className="big-num">{meals.length}</strong>
          <p>Total scheduled meals across your active calendar</p>
        </div>

        <div className="analytics-card">
          <div className="analytics-header">
            <h3>Avg Cal / Meal</h3>
            <div className="stat-icon peach"><Flame size={16} /></div>
          </div>
          <strong className="big-num">{avgCaloriesPerMeal} <span style={{ fontSize: 15, fontWeight: 500, color: "var(--muted)" }}>kcal</span></strong>
          <p>Average energy density per scheduled dish</p>
        </div>

        <div className="analytics-card">
          <div className="analytics-header">
            <h3>Pantry Execution</h3>
            <div className="stat-icon blue"><ShoppingBasket size={16} /></div>
          </div>
          <strong className="big-num">{groceryRate}%</strong>
          <p>{completedGroceries} of {groceries.length} ingredients checked off</p>
        </div>
      </div>

      {/* Detailed Analysis Section */}
      <div className="analytics-details-grid">
        {/* Meal Type Distribution */}
        <div className="surface-card">
          <div className="section-heading">
            <div>
              <h3>Meal Schedule Distribution</h3>
              <p>Balance between breakfast, lunch, dinner, and snacks</p>
            </div>
            <ChefHat size={18} className="sparkle-mark" />
          </div>

          <div className="metric-bar-group">
            {mealDistribution.map((item) => (
              <div className="metric-bar-item" key={item.type}>
                <div className="metric-bar-label">
                  <span>{item.type}</span>
                  <span>{item.count} meals ({item.percent}%)</span>
                </div>
                <div className="metric-bar-track">
                  <div
                    className="metric-bar-fill"
                    style={{ width: `${item.percent}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial & Habit Health */}
        <div className="surface-card">
          <div className="section-heading">
            <div>
              <h3>Financial Health & Efficiency</h3>
              <p>Budget pacing and spending projection</p>
            </div>
            <CircleDollarSign size={18} className="sparkle-mark" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="settings-item" style={{ borderTop: 0, padding: 0 }}>
              <div className="settings-item-copy">
                <strong>Budget Utilization</strong>
                <span>Percentage of monthly allowance consumed</span>
              </div>
              <strong style={{ fontSize: 16, color: isUnderBudget ? "var(--green)" : "#c56f70" }}>
                {budgetUtilization}%
              </strong>
            </div>

            <div className="settings-item" style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
              <div className="settings-item-copy">
                <strong>Curated Recipe Coverage</strong>
                <span>Available library recipes ready for planning</span>
              </div>
              <strong style={{ fontSize: 16 }}>{recipes.length} dishes</strong>
            </div>

            <div className="settings-item" style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
              <div className="settings-item-copy">
                <strong>Expenditure Entries</strong>
                <span>Logged food transactions</span>
              </div>
              <strong style={{ fontSize: 16 }}>{expenses.length} logs</strong>
            </div>

            <div style={{
              marginTop: 10,
              padding: "12px 16px",
              borderRadius: "10px",
              background: isUnderBudget ? "var(--green-soft)" : "#fff1f1",
              border: `1px solid ${isUnderBudget ? "#cde1cc" : "#ffd4d4"}`,
              display: "flex",
              alignItems: "center",
              gap: 10
            }}>
              <TrendingUp size={16} color={isUnderBudget ? "#52785c" : "#c56f70"} />
              <span style={{ fontSize: 11, fontWeight: 700, color: isUnderBudget ? "#3b5842" : "#9e3838" }}>
                {isUnderBudget
                  ? "Great job! Your spending is currently well within your monthly allocation."
                  : "Attention: You have exceeded your target budget limit this period."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
