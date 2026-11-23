import { X, Clock3, Flame, ChefHat, Plus, Trash2 } from "lucide-react";

export default function RecipeDetailModal({
  isOpen,
  onClose,
  selectedRecipe,
  onAddIngredientsToGroceries,
  onAddRecipeToPlan,
  onDeleteRecipe
}) {
  if (!isOpen || !selectedRecipe) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="recipe-detail-modal" onClick={(e) => e.stopPropagation()}>
        <img src={selectedRecipe.image} alt={selectedRecipe.title} />
        <button className="detail-close" onClick={onClose} title="Close">
          <X size={18} />
        </button>

        <div className="detail-content">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>{selectedRecipe.category.toUpperCase()} RECIPE</span>
          </div>
          <h2>{selectedRecipe.title}</h2>
          <p>{selectedRecipe.description}</p>

          <div className="detail-stats">
            <span><Clock3 size={15} /> {selectedRecipe.time} minutes</span>
            <span><Flame size={15} /> {selectedRecipe.calories} kcal</span>
            <span><ChefHat size={15} /> {selectedRecipe.servings} {selectedRecipe.servings === 1 ? "serving" : "servings"}</span>
          </div>

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
