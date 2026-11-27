import { useState } from "react";
import { X } from "lucide-react";
import { categories } from "../../constants/initialData";
import { getFoodCompositionOptions, getFoodComposition } from "../../constants/foodCompositionData";
import { calculateRecipeIngredientNutrition } from "../../utils/nutritionCalculator";

export default function RecipeModal({
  isOpen,
  onClose,
  editingRecipe,
  recipeForm,
  setRecipeForm,
  customFoods,
  onSave
}) {
  const [selectedFoodId, setSelectedFoodId] = useState("");
  const [ingredientGrams, setIngredientGrams] = useState("");
  if (!isOpen) return null;
  const nutritionIngredients = Array.isArray(recipeForm.nutritionIngredients)
    ? recipeForm.nutritionIngredients
    : [];
  const foods = getFoodCompositionOptions(customFoods);
  const calculatedNutrition = calculateRecipeIngredientNutrition(
    nutritionIngredients,
    Number(recipeForm.servings),
    customFoods
  );
  const addNutritionIngredient = () => {
    const grams = Number(ingredientGrams);
    if (!selectedFoodId || !Number.isFinite(grams) || grams <= 0 || grams > 10000) return;
    setRecipeForm({
      ...recipeForm,
      nutritionIngredients: [...nutritionIngredients, { foodId: selectedFoodId, grams }]
    });
    setSelectedFoodId("");
    setIngredientGrams("");
  };

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

        <fieldset className="recipe-category-field">
          <legend>Meal categories</legend>
          <p>Choose every meal where you would serve this recipe.</p>
          <div className="recipe-category-options">
            {categories.filter((category) => category !== "All").map((category) => {
              const selectedCategories = Array.isArray(recipeForm.categories)
                ? recipeForm.categories
                : [recipeForm.category].filter(Boolean);
              const checked = selectedCategories.includes(category);

              return (
                <label className={checked ? "selected" : ""} key={category}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      const nextCategories = event.target.checked
                        ? [...selectedCategories, category]
                        : selectedCategories.filter((item) => item !== category);
                      setRecipeForm({
                        ...recipeForm,
                        categories: nextCategories,
                        category: nextCategories[0] || ""
                      });
                    }}
                  />
                  <span>{category}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="recipe-category-field">
          <legend>Dietary tags (optional)</legend>
          <p>Only choose tags verified for every ingredient in this recipe.</p>
          <div className="recipe-category-options">
            {["vegetarian", "vegan", "non-vegetarian"].map((tag) => {
              const selectedTags = Array.isArray(recipeForm.dietaryTags) ? recipeForm.dietaryTags : [];
              const checked = selectedTags.includes(tag);
              return (
                <label className={checked ? "selected" : ""} key={tag}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      const dietaryTags = event.target.checked
                        ? [...selectedTags, tag]
                        : selectedTags.filter((item) => item !== tag);
                      setRecipeForm({ ...recipeForm, dietaryTags });
                    }}
                  />
                  <span>{tag === "non-vegetarian" ? "Non-vegetarian" : tag[0].toUpperCase() + tag.slice(1)}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="form-row">
          <label>
            Calories per serving (kcal)
            <input
              type="number"
              min="0"
              value={recipeForm.calories}
              onChange={(e) => setRecipeForm({ ...recipeForm, calories: e.target.value })}
              placeholder="Only if known"
            />
          </label>

          <label>
            Protein per serving (g)
            <input
              type="number"
              min="0"
              step="0.1"
              value={recipeForm.protein ?? ""}
              onChange={(event) => setRecipeForm({ ...recipeForm, protein: event.target.value })}
              placeholder="Only if known"
            />
          </label>

          <label>
            Total servings
            <input
              type="number"
              min="1"
              value={recipeForm.servings}
              onChange={(e) => setRecipeForm({ ...recipeForm, servings: e.target.value })}
              placeholder="2"
            />
          </label>
        </div>
        <p className="nutrition-field-note">Manual nutrition is an estimate. Adding measured ingredients below calculates values per serving and takes precedence.</p>

        <fieldset className="recipe-nutrition-field">
          <legend>Calculate nutrition from ingredients</legend>
          <p>Use cooked or raw ingredient records exactly as labeled. Amounts are edible grams; USDA and your saved food records are estimates.</p>
          <div className="recipe-nutrition-add">
            <label>
              Ingredient
              <select value={selectedFoodId} onChange={(event) => setSelectedFoodId(event.target.value)}>
                <option value="">Choose a food</option>
                {foods.map((food) => (
                  <option value={food.id} key={food.id}>{food.name}</option>
                ))}
              </select>
            </label>
            <label>
              Amount (g)
              <input
                type="number"
                min="1"
                max="10000"
                step="1"
                value={ingredientGrams}
                onChange={(event) => setIngredientGrams(event.target.value)}
                placeholder="e.g. 150"
              />
            </label>
            <button type="button" className="btn-outline" onClick={addNutritionIngredient}>Add ingredient</button>
          </div>
          {nutritionIngredients.length > 0 && (
            <div className="recipe-nutrition-list">
              {nutritionIngredients.map((ingredient, index) => {
                const food = getFoodComposition(ingredient.foodId, customFoods);
                return (
                  <div key={`${ingredient.foodId}-${index}`}>
                    <span><strong>{food?.name || "Unknown food"}</strong><small>{ingredient.grams} g · {food?.state}</small></span>
                    <button
                      type="button"
                      className="quiet-link"
                      aria-label={`Remove ${food?.name || "ingredient"}`}
                      onClick={() => setRecipeForm({
                        ...recipeForm,
                        nutritionIngredients: nutritionIngredients.filter((_, itemIndex) => itemIndex !== index)
                      })}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {calculatedNutrition ? (
            <div className="recipe-nutrition-result">
              <strong>{Math.round(calculatedNutrition.caloriesPerServing)} kcal</strong>
              <strong>{Math.round(calculatedNutrition.proteinPerServing)} g protein</strong>
              <span>per serving · based on {calculatedNutrition.ingredientCount} listed ingredients</span>
            </div>
          ) : (
            <small className="nutrition-field-note">Nutrition appears once each ingredient has a recognized food record and gram amount.</small>
          )}
        </fieldset>

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
