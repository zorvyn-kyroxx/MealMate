import { X } from "lucide-react";
import { mealTypes } from "../../constants/initialData";

export default function MealModal({
  isOpen,
  onClose,
  editingMeal,
  recipes,
  todayKey,
  mealForm,
  setMealForm,
  onSelectRecipe,
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

        <label>
          Link a recipe (optional)
          <select
            value={mealForm.recipeId}
            onChange={(event) => onSelectRecipe(event.target.value)}
          >
            <option value="">Custom meal</option>
            {recipes.map((recipe) => (
              <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
            ))}
          </select>
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
            Calories per serving (kcal)
            <input
              type="number"
              min="0"
              step="1"
              value={mealForm.calories}
              onChange={(e) => setMealForm({ ...mealForm, calories: e.target.value })}
              placeholder="350"
            />
          </label>
          <label>
            Protein per serving (g)
            <input
              type="number"
              min="0"
              step="0.1"
              value={mealForm.protein}
              onChange={(e) => setMealForm({ ...mealForm, protein: e.target.value })}
              placeholder="Optional"
            />
          </label>
        </div>

        <label>
          Planned servings
          <input
            type="number"
            min="0.1"
            max="50"
            step="0.1"
            value={mealForm.servings}
            onChange={(e) => setMealForm({ ...mealForm, servings: e.target.value })}
          />
        </label>

        <label className="meal-eaten-checkbox">
          <input
            type="checkbox"
            checked={Boolean(mealForm.eaten) && mealForm.date <= todayKey}
            disabled={mealForm.date > todayKey}
            onChange={(e) => setMealForm({ ...mealForm, eaten: e.target.checked })}
          />
          <span>
            Mark as eaten
            {mealForm.date > todayKey && <small>Future planned meals cannot be logged as eaten yet.</small>}
          </span>
        </label>

        <button className="btn btn-green modal-submit" type="submit">
          {editingMeal ? "Update Meal" : "Add to Schedule"}
        </button>
      </form>
    </div>
  );
}
