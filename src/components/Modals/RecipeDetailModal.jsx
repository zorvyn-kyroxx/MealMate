import { X, Clock3, Flame, ChefHat, Plus, Trash2, Dumbbell, Heart } from "lucide-react";
import { getRecipeNutrition } from "../../utils/nutrition";
import RecipeImage from "../RecipeImage";

export default function RecipeDetailModal({
  isOpen,
  onClose,
  selectedRecipe,
  isFavorite,
  onToggleFavorite,
  onAddIngredientsToGroceries,
  onAddRecipeToPlan,
  onDeleteRecipe,
  customFoods
}) {
  if (!isOpen || !selectedRecipe) return null;
  const nutrition = getRecipeNutrition(selectedRecipe, customFoods);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="recipe-detail-modal" onClick={(e) => e.stopPropagation()}>
        <RecipeImage src={selectedRecipe.image} alt={selectedRecipe.title} className="recipe-detail-image" loading="eager" />
        {selectedRecipe.imageCredit && selectedRecipe.imageCreditUrl && (
          <a
            className="detail-image-credit"
            href={selectedRecipe.imageCreditUrl}
            target="_blank"
            rel="noreferrer"
          >
            {selectedRecipe.imageCredit}
          </a>
        )}
        <button className="detail-close" onClick={onClose} title="Close">
          <X size={18} />
        </button>

        <div className="detail-content">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>
              {(selectedRecipe.categories?.length ? selectedRecipe.categories : [selectedRecipe.category])
                .join(" · ")
                .toUpperCase()} RECIPE
            </span>
          </div>
          <h2>{selectedRecipe.title}</h2>
          <p>{selectedRecipe.description}</p>
          <button
            type="button"
            className={`btn-outline recipe-detail-favorite ${isFavorite ? "is-favorite" : ""}`}
            onClick={() => onToggleFavorite(selectedRecipe.id)}
          >
            <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
            {isFavorite ? "Saved to favourites" : "Save as favourite"}
          </button>

          <div className="detail-stats">
            <span><Clock3 size={15} /> {selectedRecipe.time} minutes</span>
            <span><Flame size={15} /> {nutrition.calories === null ? "Calories not provided" : `${Math.round(nutrition.calories)} kcal`}</span>
            <span><Dumbbell size={15} /> {nutrition.protein === null ? "Protein not provided" : `~${Math.round(nutrition.protein)} g protein`}</span>
            <span>Carbs: {nutrition.carbohydrates === null ? "not provided" : `${Math.round(nutrition.carbohydrates * 10) / 10} g`}</span>
            <span>Fat: {nutrition.fat === null ? "not provided" : `${Math.round(nutrition.fat * 10) / 10} g`}</span>
            <span><ChefHat size={15} /> {selectedRecipe.servings} {selectedRecipe.servings === 1 ? "serving" : "servings"}</span>
          </div>
          <p className="recipe-detail-nutrition-note">{nutrition.source}. Values are estimates per serving and can vary with ingredients, brands and portions.</p>

          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 14 }}>Ingredients</h3>
              <button
                type="button"
                className="btn btn-dark"
                style={{ minHeight: 32, padding: "0 12px", fontSize: 11 }}
                onClick={() => onAddIngredientsToGroceries(selectedRecipe)}
              >
                <Plus size={14} /> Add all to groceries
              </button>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "#54665a", fontSize: 12, lineHeight: 1.8 }}>
              {selectedRecipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 20 }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 14 }}>Preparation Steps</h3>
            <ol style={{ margin: 0, paddingLeft: 18, color: "#54665a", fontSize: 12, lineHeight: 1.8 }}>
              {selectedRecipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button
              className="btn btn-green"
              style={{ flex: 1 }}
              onClick={() => {
                onClose();
                onAddRecipeToPlan(selectedRecipe);
              }}
            >
              <Plus size={16} /> Add to Meal Planner
            </button>
            <button
              className="btn btn-dark"
              onClick={() => {
                onDeleteRecipe(selectedRecipe.id);
                onClose();
              }}
            >
              <Trash2 size={16} /> Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
