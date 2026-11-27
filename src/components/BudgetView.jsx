import { useState, useMemo } from "react";
import { Plus, CircleDollarSign, Wallet, Utensils, Trash2, Sparkles, Pencil } from "lucide-react";
import { prettyDate } from "../utils/dateUtils";
import { expenseCategories } from "../constants/initialData";

const categoryColors = {
  Groceries: "#52785c",
  Produce: "#7aa67f",
  "Dining Out": "#c27c51",
  Bakery: "#d4a373",
  Beverages: "#638ca6",
  Other: "#9382ab"
};

export default function BudgetView({
  budget,
  setBudget,
  totalSpent,
  remainingBudget,
  budgetPercent,
  expenses,
  onDeleteExpense,
  onOpenExpenseModal,
  onOpenEditExpense
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Category breakdown calculation
  const categoryBreakdown = useMemo(() => {
    if (totalSpent === 0) return [];
    const map = {};
    expenses.forEach((e) => {
      const cat = e.category || "Other";
      map[cat] = (map[cat] || 0) + Number(e.amount);
    });

    return Object.entries(map).map(([name, amount]) => ({
      name,
      amount,
      percent: Math.round((amount / totalSpent) * 100),
      color: categoryColors[name] || "#8e9a90"
    })).sort((a, b) => b.amount - a.amount);
  }, [expenses, totalSpent]);

  // Analytics
  const avgExpense = expenses.length > 0 ? Math.round(totalSpent / expenses.length) : 0;
  const maxExpense = expenses.length > 0 ? Math.max(...expenses.map((e) => Number(e.amount) || 0)) : 0;

  // Filtered expense list
  const filteredExpenses = expenses.filter((e) => {
    if (selectedCategory === "All") return true;
    return e.category === selectedCategory;
  });

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>YOUR MONEY, ORGANISED</span>
          </div>
          <h1>Food Budget Tracker</h1>
          <p>Track food spending against a monthly target. Older transactions remain in your backup.</p>
        </div>
        <button className="btn btn-green" onClick={onOpenExpenseModal}>
          <Plus size={17} /> Add expense
        </button>
      </div>

      {/* Budget Overview Card */}
      <div className="budget-overview">
        <div className="budget-primary">
          <span className="eyebrow">MONTHLY FOOD BUDGET</span>
          <h2>₹{Number(budget).toLocaleString("en-IN")}</h2>
          <p>Adjust your target monthly food allowance anytime.</p>
          <div className="budget-edit">
            <span>Change target (₹):</span>
            <input
              type="number"
              min="0"
              step="500"
              value={budget}
              onChange={(e) => setBudget(Math.max(0, Number(e.target.value) || 0))}
            />
          </div>
        </div>

        <div className="budget-secondary">
          <div className="budget-stat">
            <div className="budget-stat-icon peach"><CircleDollarSign size={18} /></div>
            <div>
              <small>SPEND THIS MONTH</small>
              <strong>₹{totalSpent.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div className="budget-stat">
            <div className="budget-stat-icon sage"><Wallet size={18} /></div>
            <div>
              <small>REMAINING BUDGET</small>
              <strong>₹{remainingBudget.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div className="budget-usage">
            <div>
              <span>Budget Utilization</span>
              <strong>{budgetPercent}%</strong>
            </div>
            <div className="progress-track">
              <div
                style={{
                  width: `${Math.min(100, budgetPercent)}%`,
                  background: totalSpent > budget ? "#c56f70" : undefined
                }}
              />
            </div>
            {totalSpent > budget ? (
              <small style={{ color: "#c56f70", fontWeight: 700 }}>
                Caution: You have exceeded your monthly food budget!
              </small>
            ) : (
              <small>You are within your comfortable food budget.</small>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Mini Stats */}
      <div className="budget-stats-row">
        <div className="budget-stat-mini">
          <span>AVERAGE ENTRY</span>
          <strong>₹{avgExpense.toLocaleString("en-IN")}</strong>
        </div>
        <div className="budget-stat-mini">
          <span>HIGHEST EXPENSE</span>
          <strong>₹{maxExpense.toLocaleString("en-IN")}</strong>
        </div>
        <div className="budget-stat-mini">
          <span>RECORDED TRANSACTIONS</span>
          <strong>{expenses.length} entries</strong>
        </div>
      </div>

      {/* Category Breakdown Visual Chart */}
      {categoryBreakdown.length > 0 && (
        <div className="chart-card">
          <div className="chart-header">
            <h3>Spending by Category</h3>
            <span>{categoryBreakdown.length} active spending categories</span>
          </div>

          {/* Multi-segmented bar */}
          <div className="chart-bar-container">
            {categoryBreakdown.map((cat) => (
              <div
                key={cat.name}
                className="chart-bar-segment"
                style={{
                  width: `${cat.percent}%`,
                  background: cat.color
                }}
                title={`${cat.name}: ₹${cat.amount} (${cat.percent}%)`}
              />
            ))}
          </div>

          {/* Legend chips */}
          <div className="chart-legend">
            {categoryBreakdown.map((cat) => (
              <div className="chart-legend-item" key={cat.name}>
                <span className="chart-dot" style={{ background: cat.color }} />
                <div className="chart-legend-copy">
                  <strong>{cat.name} ({cat.percent}%)</strong>
                  <span>₹{cat.amount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expenses List & Filter Chips */}
      <div className="budget-lower">
        <div className="surface-card expense-panel">
          <div className="section-heading">
            <div>
              <h3>Recent Food Expenses</h3>
              <p>Logged grocery and food expenditures</p>
            </div>
            <CircleDollarSign size={18} className="sparkle-mark" />
          </div>

          {/* Filter Chips */}
          <div className="chip-group">
            <button
              className={`chip ${selectedCategory === "All" ? "active" : ""}`}
              onClick={() => setSelectedCategory("All")}
            >
              All Categories <span className="chip-count">{expenses.length}</span>
            </button>
            {expenseCategories.map((cat) => {
              const count = expenses.filter((e) => e.category === cat).length;
              if (count === 0 && selectedCategory !== cat) return null;
              return (
                <button
                  key={cat}
                  className={`chip ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat} <span className="chip-count">{count}</span>
                </button>
              );
            })}
          </div>

          {filteredExpenses.length === 0 ? (
            <div className="empty-state">
              <Wallet size={36} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
              <p>
                {expenses.length === 0
                ? "No expenses recorded this month. Log your first expenditure."
                  : `No expenses logged under "${selectedCategory}".`}
              </p>
              <button className="btn btn-green" onClick={onOpenExpenseModal} style={{ marginTop: 10 }}>
                <Plus size={15} /> Add first expense
              </button>
            </div>
          ) : (
            <div>
              {filteredExpenses.map((expense) => (
                <div className="expense-row" key={expense.id}>
                  <div
                    className="expense-icon"
                    style={{
                      background: `${categoryColors[expense.category] || "#6d896f"}18`,
                      color: categoryColors[expense.category] || "#6d896f"
                    }}
                  >
                    <Utensils size={16} />
                  </div>
                  <div className="expense-copy">
                    <strong>{expense.title}</strong>
                    <span>{expense.category} · {expense.date ? prettyDate(new Date(expense.date)) : "Recent"}</span>
                  </div>
                  <strong className="expense-amount">
                    ₹{Number(expense.amount).toLocaleString("en-IN")}
                  </strong>
                  <div className="grocery-actions">
                    <button
                      className="row-action-btn"
                      onClick={() => onOpenEditExpense(expense)}
                      title="Edit expense"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      className="row-action-btn delete-btn"
                      onClick={() => onDeleteExpense(expense.id)}
                      title="Delete expense"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="budget-note">
          <div className="note-icon"><Sparkles size={18} /></div>
          <h3>Smart Budgeting Tip</h3>
          <p>
            Planning meals ahead can help you make a grocery list before shopping. Track receipts to compare your actual spending with your monthly target.
          </p>
        </div>
      </div>
    </>
  );
}
