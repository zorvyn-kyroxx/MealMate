import { X } from "lucide-react";
import { expenseCategories } from "../../constants/initialData";

export default function ExpenseModal({
  isOpen,
  onClose,
  editingExpense,
  expenseForm,
  setExpenseForm,
  onSave
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={onSave}>
        <div className="modal-heading">
          <div>
            <span className="eyebrow">BUDGET LOG</span>
            <h2>{editingExpense ? "Edit Expense Entry" : "Record Food Expense"}</h2>
          </div>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </div>

        <label>
          Expense Title / Store
          <input
            required
            value={expenseForm.title}
            onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
            placeholder="e.g. Nature Basket Organic Groceries"
          />
        </label>

        <div className="form-row">
          <label>
            Amount (₹)
            <input
              required
              type="number"
              min="1"
              step="1"
              value={expenseForm.amount}
              onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
              placeholder="650"
            />
          </label>

          <label>
            Category
            <select
              value={expenseForm.category}
              onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
            >
              {expenseCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Date
          <input
            type="date"
            value={expenseForm.date || ""}
            onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
          />
        </label>

        <button className="btn btn-green modal-submit" type="submit">
          {editingExpense ? "Update Expense" : "Save Expense Entry"}
        </button>
      </form>
    </div>
  );
}
