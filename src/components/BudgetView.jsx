import { Plus, CircleDollarSign, Wallet, Utensils, Trash2, Sparkles } from "lucide-react";
import { prettyDate } from "../utils/dateUtils";

export default function BudgetView({
  budget,
  setBudget,
  totalSpent,
  remainingBudget,
  budgetPercent,
  expenses,
  onDeleteExpense,
  onOpenExpenseModal
}) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>YOUR MONEY, ORGANISED</span>
          </div>
          <h1>Food Budget Tracker</h1>
          <p>Monitor your weekly and monthly food spending to eat well without breaking the bank.</p>
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
              <small>TOTAL RECORDED SPEND</small>
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
                  width: `${budgetPercent}%`,
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

      {/* Expenses List & Notes */}
      <div className="budget-lower">
        <div className="surface-card expense-panel">
          <div className="section-heading">
            <div>
              <h3>Recent Food Expenses</h3>
              <p>Logged grocery and food expenditures</p>
            </div>
            <CircleDollarSign size={18} className="sparkle-mark" />
          </div>

          {expenses.length === 0 ? (
            <div className="empty-state">
              <Wallet size={36} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
              <p>No expenses recorded yet. Log your first expenditure.</p>
              <button className="btn btn-green" onClick={onOpenExpenseModal} style={{ marginTop: 10 }}>
                <Plus size={15} /> Add first expense
              </button>
            </div>
          ) : (
            <div>
              {expenses.map((expense) => (
                <div className="expense-row" key={expense.id}>
                  <div className="expense-icon">
                    <Utensils size={16} />
                  </div>
                  <div className="expense-copy">
                    <strong>{expense.title}</strong>
                    <span>{expense.category} · {expense.date ? prettyDate(new Date(expense.date)) : "Recent"}</span>
                  </div>
                  <strong className="expense-amount">
                    ₹{Number(expense.amount).toLocaleString("en-IN")}
                  </strong>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    title="Delete expense"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="budget-note">
          <div className="note-icon"><Sparkles size={18} /></div>
          <h3>Smart Budgeting Tip</h3>
          <p>
            Planning meals 3–4 days in advance directly lowers last-minute food delivery orders, which on average account for 40% of unnecessary food expenses.
          </p>
        </div>
      </div>
    </>
  );
}
