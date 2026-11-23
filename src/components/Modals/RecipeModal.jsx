import { X } from "lucide-react";

export default function RecipeModal({
  isOpen,
  onClose,
  editingRecipe,
  recipeForm,
  setRecipeForm,
  onSave
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={onSave}>
        <div className="modal-heading">
          <div>
            <span className="eyebrow">RECIPE STUDIO</span>
            <h2>{editingRecipe ? "Edit Recipe" : "Create New Recipe"}</h2>
          </div>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </div>

        <label>
          Recipe Title
          <input
            required
            value={recipeForm.title}
            onChange={(e) => setRecipeForm({ ...recipeForm, title: e.target.value })}
            placeholder="e.g. Mediterranean Lemon Salmon"
          />
        </label>

        <div className="form-row">
          <label>
            Category
            <select
              value={recipeForm.category}
              onChange={(e) => setRecipeForm({ ...recipeForm, category: e.target.value })}
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
            </select>
          </label>

          <label>
            Cooking Time (minutes)
            <input
              type="number"
              min="1"
              value={recipeForm.time}
              onChange={(e) => setRecipeForm({ ...recipeForm, time: e.target.value })}
              placeholder="20"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Calories (kcal)
            <input
              type="number"
              min="0"
              value={recipeForm.calories}
              onChange={(e) => setRecipeForm({ ...recipeForm, calories: e.target.value })}
              placeholder="450"
            />
          </label>

          <label>
            Servings
            <input
              type="number"
              min="1"
              value={recipeForm.servings}
              onChange={(e) => setRecipeForm({ ...recipeForm, servings: e.target.value })}
              placeholder="2"
            />
          </label>
        </div>

        <label>
          Image URL
          <input
            type="url"
            value={recipeForm.image}
            onChange={(e) => setRecipeForm({ ...recipeForm, image: e.target.value })}
            placeholder="https://images.unsplash.com/photo-..."
          />
        </label>

        <label>
          Short Description
          <input
            value={recipeForm.description}
            onChange={(e) => setRecipeForm({ ...recipeForm, description: e.target.value })}
            placeholder="A vibrant, fresh dish perfect for weekday dinners."
          />
        </label>

        <label>
          Ingredients (one per line)
          <textarea
            value={Array.isArray(recipeForm.ingredients) ? recipeForm.ingredients.join("\n") : recipeForm.ingredients}
            onChange={(e) => setRecipeForm({ ...recipeForm, ingredients: e.target.value })}
            placeholder={"2 salmon fillets\n1 lemon\n2 cups fresh spinach\n1 tbsp olive oil"}
          />
        </label>

        <label>
          Instructions (one step per line)
          <textarea
            value={Array.isArray(recipeForm.instructions) ? recipeForm.instructions.join("\n") : recipeForm.instructions}
            onChange={(e) => setRecipeForm({ ...recipeForm, instructions: e.target.value })}
            placeholder={"Season the salmon with lemon juice and salt.\nHeat skillet and sear salmon for 4 minutes each side.\nServe over sautéed spinach."}
          />
        </label>

        <button className="btn btn-green modal-submit" type="submit">
          {editingRecipe ? "Update Recipe" : "Save Recipe"}
        </button>
      </form>
    </div>
  );
}
