import { X } from "lucide-react";
import { groceryCategories } from "../../constants/initialData";

export default function GroceryModal({
  isOpen,
  onClose,
  editingGrocery,
  groceryForm,
  setGroceryForm,
  onSave
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={onSave}>
        <div className="modal-heading">
          <div>
            <span className="eyebrow">SHOPPING LIST</span>
            <h2>{editingGrocery ? "Edit Grocery Item" : "Add Grocery Item"}</h2>
          </div>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </div>

        <label>
          Item Name
          <input
            required
            value={groceryForm.name}
            onChange={(e) => setGroceryForm({ ...groceryForm, name: e.target.value })}
            placeholder="e.g. Extra virgin olive oil"
          />
        </label>

        <div className="form-row">
          <label>
            Quantity / Amount
            <input
              value={groceryForm.amount}
              onChange={(e) => setGroceryForm({ ...groceryForm, amount: e.target.value })}
              placeholder="e.g. 500ml or 2 bunches"
            />
          </label>

          <label>
            Category / Aisle
            <select
              value={groceryForm.category}
              onChange={(e) => setGroceryForm({ ...groceryForm, category: e.target.value })}
            >
              {groceryCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <button className="btn btn-green modal-submit" type="submit">
          {editingGrocery ? "Update Grocery Item" : "Add to Grocery Checklist"}
        </button>
      </form>
    </div>
  );
}
