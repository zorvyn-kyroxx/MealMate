import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { mealTypes } from "../../constants/initialData";
import { getFoodCompositionOptions } from "../../constants/foodCompositionData";
import { getRecipeNutrition } from "../../utils/nutrition";

const emptyForm = (todayKey) => ({
  mode: "recipe",
  recipeId: "",
  foodId: "",
  name: "",
  date: todayKey,
  mealType: "Breakfast",
  servings: "1",
  grams: "100",
  servingDescription: "",
  calories: "",
  protein: ""
});

export default function FoodLogModal({
  isOpen,
  onClose,
  recipes,
  customFoods,
  onSaveCustomFood,
  entryToEdit,
  initialFood,
  todayKey,
  initialDate,
  onSave
}) {
  if (!isOpen) return null;
  const formKey = entryToEdit
    ? `edit-${entryToEdit.id}`
    : initialFood
      ? `suggested-${initialFood.name}-${initialDate || todayKey}`
      : `new-${initialDate || todayKey}`;
  return <FoodLogForm key={formKey} {...{ onClose, recipes, customFoods, onSaveCustomFood, entryToEdit, initialFood, todayKey, initialDate, onSave }} />;
}

function FoodLogForm({ onClose, recipes, customFoods = [], onSaveCustomFood, entryToEdit, initialFood, todayKey, initialDate, onSave }) {
  const foods = useMemo(() => getFoodCompositionOptions(customFoods), [customFoods]);
  const [form, setForm] = useState(() => {
    const initial = emptyForm(initialDate || todayKey);
    if (entryToEdit) {
      return {
        ...initial,
        mode: entryToEdit.foodId ? "database" : "manual",
        foodId: entryToEdit.foodId || "",
        name: entryToEdit.name || "",
        date: entryToEdit.date || todayKey,
        mealType: entryToEdit.mealType || "Snack",
        servings: String(entryToEdit.servings || 1),
        grams: String(entryToEdit.grams || 100),
        servingDescription: entryToEdit.servingDescription || "",
        calories: String(entryToEdit.calories ?? ""),
        protein: String(entryToEdit.protein ?? "")
      };
    }
    if (initialFood) {
      return {
        ...initial,
        mode: "database",
        foodId: initialFood.id,
        grams: String(initialFood.grams),
        mealType: "Snack",
        servingDescription: initialFood.serving
      };
    }
    return initial;
  });
  const [saveReusable, setSaveReusable] = useState(false);
  const [customFoodState, setCustomFoodState] = useState("");
  const [reusableCalories, setReusableCalories] = useState("");
  const [reusableProtein, setReusableProtein] = useState("");

  const selectedRecipe = recipes.find((recipe) => String(recipe.id) === String(form.recipeId));
  const selectedFood = foods.find((food) => String(food.id) === String(form.foodId));
  const grams = Number(form.grams);
  const foodCalories = selectedFood && Number.isFinite(grams) && grams > 0
    ? Math.round(selectedFood.caloriesPer100g * grams / 100)
    : null;
  const foodProtein = selectedFood && Number.isFinite(grams) && grams > 0
    ? Math.round(selectedFood.proteinPer100g * grams / 100 * 10) / 10
    : null;
  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const servings = Number(form.servings);
    if (!Number.isFinite(servings) || servings <= 0 || servings > 50) return;

    if (form.mode === "recipe") {
      if (!selectedRecipe) return;
      onSave({
        kind: "recipe",
        recipeId: selectedRecipe.id,
        date: form.date,
        mealType: form.mealType,
        servings
      });
      return;
    }

    if (form.mode === "database") {
      if (!selectedFood || foodCalories === null || foodProtein === null) return;
      onSave({
        kind: "custom",
        id: entryToEdit?.id,
        foodId: selectedFood.id,
        name: selectedFood.name,
        date: form.date,
        mealType: form.mealType,
        servings,
        grams,
        servingDescription: `${grams} g (${selectedFood.state})`,
        calories: foodCalories,
        protein: foodProtein,
        nutritionSource: selectedFood.source
      });
      return;
    }

    const name = form.name.trim();
    const calories = form.calories === "" ? null : Number(form.calories);
    const protein = form.protein === "" ? null : Number(form.protein);
    if (!name || (calories !== null && (!Number.isFinite(calories) || calories < 0))) return;
    if (protein !== null && (!Number.isFinite(protein) || protein < 0)) return;

    let savedForReuse = false;
    if (saveReusable) {
      const caloriesPer100g = Number(reusableCalories);
      const proteinPer100g = Number(reusableProtein);
      if (!Number.isFinite(caloriesPer100g) || caloriesPer100g < 0
        || !Number.isFinite(proteinPer100g) || proteinPer100g < 0) return;
      savedForReuse = onSaveCustomFood?.({
        name,
        state: customFoodState.trim() || "User-entered serving basis",
        caloriesPer100g,
        proteinPer100g
      }) === true;
    }
    onSave({
      kind: "custom",
      id: entryToEdit?.id,
      name,
      date: form.date,
      mealType: form.mealType,
      servings,
      servingDescription: form.servingDescription.trim(),
      calories,
      protein,
      savedForReuse,
      reuseSaveFailed: saveReusable && !savedForReuse,
      nutritionSource: "User-entered label or estimate"
    });
  };

  const selectedRecipeNutrition = getRecipeNutrition(selectedRecipe, customFoods);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal nutrition-log-modal" onClick={(event) => event.stopPropagation()} onSubmit={handleSubmit}>
        <div className="modal-heading">
          <div>
            <span className="eyebrow">FOOD DIARY</span>
            <h2>{entryToEdit ? "Edit food entry" : "Log food eaten"}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close food log"><X size={18} /></button>
        </div>

        {!entryToEdit && (
          <div className="nutrition-log-tabs" role="tablist" aria-label="Choose food type">
            <button type="button" className={form.mode === "recipe" ? "active" : ""} onClick={() => updateForm("mode", "recipe")}>Recipe</button>
            <button type="button" className={form.mode === "database" ? "active" : ""} onClick={() => updateForm("mode", "database")}>Food database</button>
            <button type="button" className={form.mode === "manual" ? "active" : ""} onClick={() => updateForm("mode", "manual")}>Manual entry</button>
          </div>
        )}

        {form.mode === "recipe" && !entryToEdit ? (
          <>
            <label>
              Recipe
              <select required value={form.recipeId} onChange={(event) => updateForm("recipeId", event.target.value)}>
                <option value="">Choose a recipe</option>
                {recipes.map((recipe) => <option key={recipe.id} value={recipe.id}>{recipe.title}</option>)}
              </select>
            </label>
            {selectedRecipe && (
              <div className="nutrition-recipe-estimate">
                <strong>{selectedRecipeNutrition.calories === null ? "—" : Math.round(selectedRecipeNutrition.calories)} kcal</strong>
                <span>per serving</span>
                <strong>{selectedRecipeNutrition.protein === null ? "—" : `${Math.round(selectedRecipeNutrition.protein)} g protein`}</strong>
                <small>{selectedRecipeNutrition.source}; recorded values are estimates.</small>
              </div>
            )}
          </>
        ) : form.mode === "database" ? (
          <>
            <label>
              Food (per 100 g)
              <select required value={form.foodId} onChange={(event) => updateForm("foodId", event.target.value)}>
                <option value="">Choose a food</option>
                {foods.map((food) => <option value={food.id} key={food.id}>{food.name} — {food.state}</option>)}
              </select>
            </label>
            {selectedFood && (
              <>
                <label>Amount eaten (g)
                  <input required type="number" min="1" max="10000" step="1" value={form.grams} onChange={(event) => updateForm("grams", event.target.value)} />
                </label>
                <div className="nutrition-recipe-estimate">
                  <strong>{foodCalories ?? "—"} kcal</strong>
                  <span>for {form.grams || "0"} g</span>
                  <strong>{foodProtein ?? "—"} g protein</strong>
                  <small>{selectedFood.source} · {selectedFood.state}. Weights are edible portions; raw and cooked foods are not interchangeable.</small>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <label>
              Food name
              <input required value={form.name} onChange={(event) => updateForm("name", event.target.value)} placeholder="e.g. homemade dal" />
            </label>
            <label>
              Serving description
              <input value={form.servingDescription} onChange={(event) => updateForm("servingDescription", event.target.value)} placeholder="e.g. 1 bowl (200 g)" />
            </label>
            <div className="form-row">
              <label>
                Calories per serving
                <input type="number" min="0" step="1" value={form.calories} onChange={(event) => updateForm("calories", event.target.value)} placeholder="Optional; estimate only" />
              </label>
              <label>
                Protein per serving (g)
                <input type="number" min="0" step="0.1" value={form.protein} onChange={(event) => updateForm("protein", event.target.value)} placeholder="Optional" />
              </label>
            </div>
            <label className="nutrition-save-custom-food">
              <input type="checkbox" checked={saveReusable} onChange={(event) => setSaveReusable(event.target.checked)} />
              <span>Save this food for future logging (nutrition values will be stored per 100 g)</span>
            </label>
            {saveReusable && (
              <>
                <p className="nutrition-field-note">Enter separate nutrition facts per 100 g; the serving values above are used only for this food log.</p>
                <div className="form-row">
                  <label>Calories per 100 g<input required type="number" min="0" step="1" value={reusableCalories} onChange={(event) => setReusableCalories(event.target.value)} /></label>
                  <label>Protein per 100 g<input required type="number" min="0" step="0.1" value={reusableProtein} onChange={(event) => setReusableProtein(event.target.value)} /></label>
                </div>
                <label>
                  Raw/cooked or serving basis (optional)
                  <input value={customFoodState} onChange={(event) => setCustomFoodState(event.target.value)} placeholder="e.g. cooked, drained" />
                </label>
              </>
            )}
            <p className="nutrition-field-note">Enter label values or your own estimate. Leave either value blank if unknown; unknown nutrients are excluded from totals. Reusable foods need separate per-100 g values.</p>
          </>
        )}

        <div className="form-row">
          <label>
            Date eaten
            <input required type="date" max={todayKey} value={form.date} onChange={(event) => updateForm("date", event.target.value)} />
          </label>
          <label>
            Meal
            <select value={form.mealType} onChange={(event) => updateForm("mealType", event.target.value)}>
              {mealTypes.map((mealType) => <option key={mealType} value={mealType}>{mealType}</option>)}
            </select>
          </label>
        </div>

        <label>
          Servings consumed
          <input required type="number" min="0.1" max="50" step="0.1" value={form.servings} onChange={(event) => updateForm("servings", event.target.value)} />
        </label>

        <button className="btn btn-green modal-submit" type="submit">
          {entryToEdit ? "Save food entry" : "Save food log"}
        </button>
      </form>
    </div>
  );
}
