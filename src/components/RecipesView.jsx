import { Plus, Search, X, Eye, Heart, Clock3, Flame, BookOpen, Dumbbell } from "lucide-react";
import { recipeCollections } from "../constants/nutritionData";
import RecipeImage from "./RecipeImage";
import { getRecipeNutrition } from "../utils/nutrition";
import AdSlot from "./AdSlot";

const collectionIcons = {
  Breakfast: "☀",
  Lunch: "🥗",
  Dinner: "🍲",
  "High-Protein Meals": "💪",
  "Protein-Rich Vegetarian Meals": "🌱",
  "Protein-Rich Non-Vegetarian Meals": "🍗",
  Snacks: "🥜",
  "Protein Snacks": "⚡",
  Smoothies: "🍓",
  "Protein Shakes": "🥤",
  Beverages: "💧",
  "Traditional Indian Drinks": "🫖",
  Salads: "🥬",
  "Quick Meals": "⏱",
  "Budget-Friendly Meals": "🪙",
  Vegetarian: "🌱",
  "Non-vegetarian": "🍗",
  Desserts: "🍮"
};

export default function RecipesView({
  search,
  setSearch,
  category,
  setCategory,
  filteredRecipes,
  favorites,
  customFoods,
  onToggleFavorite,
  onOpenNewRecipe,
  onOpenRecipeDetails,
  onAddRecipeToPlan
}) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>A WORLD OF FLAVOUR</span>
          </div>
          <h1>Recipe Library</h1>
          <p>Discover wholesome recipes, create your custom favourites, and push ingredients to your grocery checklist.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-green" onClick={onOpenNewRecipe}>
            <Plus size={17} /> Create recipe
          </button>
        </div>
      </div>

      <div className="recipe-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="search"
            aria-label="Search recipes by title, description, or ingredients"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, description, or ingredients..."
          />
          {search && (
            <button
              type="button"
              aria-label="Clear recipe search"
              style={{ border: 0, background: "none", cursor: "pointer", color: "#8d9990" }}
              onClick={() => setSearch("")}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button type="button" className={`recipe-collection-filter all ${category === "All" ? "active" : ""}`} onClick={() => setCategory("All")} aria-pressed={category === "All"}>
          <span>✦</span> All recipes
        </button>
      </div>

      <section className="recipe-collections" aria-label="Recipe collections">
        {recipeCollections.map((collection, index) => {
          return (
            <button
              type="button"
              key={collection}
              className={`recipe-collection-filter collection-${index % 6} ${category === collection ? "active" : ""}`}
              onClick={() => setCategory(category === collection ? "All" : collection)}
              aria-pressed={category === collection}
            >
              <span className="collection-visual">{collectionIcons[collection]}</span>
              <span>{collection}</span>
            </button>
          );
        })}
      </section>
      <p className="recipe-nutrition-disclaimer">Nutrition is shown only when ingredient data or a recorded source is available. Home recipes and portion sizes vary.</p>
      <AdSlot placement="recipes" />

      {/* Recipe Cards Grid */}
      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => {
          const isFav = favorites.includes(recipe.id);
          const nutrition = getRecipeNutrition(recipe, customFoods);
          return (
            <article className="recipe-card" key={recipe.id}>
              <button
                type="button"
                className="recipe-image-button"
                onClick={() => onOpenRecipeDetails(recipe)}
                aria-label={`View recipe details for ${recipe.title}`}
              >
                <RecipeImage src={recipe.image} alt={recipe.title} />
                <span className="recipe-category">
                  {(recipe.categories?.length ? recipe.categories : [recipe.category]).join(" · ")}
                </span>
                <span className="recipe-view">
                  <Eye size={12} /> View
                </span>
              </button>
              {recipe.imageCredit && recipe.imageCreditUrl && (
                <a
                  className="recipe-image-credit"
                  href={recipe.imageCreditUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={recipe.imageCredit}
                  onClick={(event) => event.stopPropagation()}
                >
                  {recipe.imageCredit}
                </a>
              )}

              <button
                type="button"
                className={`favorite-button ${isFav ? "is-favorite" : ""}`}
                title={isFav ? "Remove favorite" : "Add to favorites"}
                aria-label={isFav ? `Remove ${recipe.title} from favorites` : `Add ${recipe.title} to favorites`}
                aria-pressed={isFav}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(recipe.id);
                }}
              >
                <Heart size={16} fill={isFav ? "currentColor" : "none"} />
              </button>

              <div className="recipe-body">
                <div className="recipe-title-row">
                  <h3>{recipe.title}</h3>
                  <span>{recipe.servings} {recipe.servings === 1 ? "serving" : "servings"}</span>
                </div>
                <p>{recipe.description}</p>
                <div className="recipe-meta">
                  <span><Clock3 size={13} /> {recipe.time} min</span>
                  <span><Flame size={13} /> {nutrition.calories === null ? "—" : Math.round(nutrition.calories)} kcal</span>
                  <span className="recipe-protein-meta"><Dumbbell size={13} /> {nutrition.protein === null ? "—" : `~${Math.round(nutrition.protein)}g`} protein</span>
                </div>
                <button
                  type="button"
                  className="recipe-add"
                  onClick={() => onAddRecipeToPlan(recipe)}
                >
                  <Plus size={14} /> Add to meal plan
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="empty-state">
          <BookOpen size={36} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
          <p>No recipes match your criteria. Try adjusting the search or category.</p>
          <button
            className="btn btn-green"
            onClick={() => { setSearch(""); setCategory("All"); }}
            style={{ marginTop: 10 }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
