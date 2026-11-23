import { X } from "lucide-react";
import { mealTypes } from "../../constants/initialData";

export default function MealModal({
  isOpen,
  onClose,
  editingMeal,
  mealForm,
  setMealForm,
  onSave
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={onSave}>
        <div className="modal-heading">
          <div>
            <span className="eyebrow">SCHEDULE A DISH</span>
            <h2>{editingMeal ? "Edit Meal" : "Add to Planner"}</h2>
          </div>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </div>

        <label>
          Meal Title
          <input
            required
            value={mealForm.title}
            onChange={(e) => setMealForm({ ...mealForm, title: e.target.value })}
            placeholder="e.g. Avocado Toast with Poached Egg"
          />
        </label>

        <div className="form-row">
          <label>
            Date
            <input
              type="date"
              required
              value={mealForm.date}
              onChange={(e) => setMealForm({ ...mealForm, date: e.target.value })}
            />
          </label>

          <label>
            Meal Type
            <select
              value={mealForm.type}
              onChange={(e) => setMealForm({ ...mealForm, type: e.target.value })}
            >
              {mealTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Time
            <input
              type="time"
              value={mealForm.time}
              onChange={(e) => setMealForm({ ...mealForm, time: e.target.value })}
            />
          </label>

          <label>
            Estimated Calories (kcal)
            <input
              type="number"
              min="0"
              value={mealForm.calories}
              onChange={(e) => setMealForm({ ...mealForm, calories: e.target.value })}
              placeholder="350"
            />
          </label>
        </div>

        <button className="btn btn-green modal-submit" type="submit">
          {editingMeal ? "Update Meal" : "Add to Schedule"}
        </button>
      </form>
    </div>
  );
}
