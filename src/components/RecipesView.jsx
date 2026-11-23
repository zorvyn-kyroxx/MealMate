import { Plus, Search, X, Eye, Heart, Clock3, Flame, BookOpen } from "lucide-react";
import { categories } from "../constants/initialData";

export default function RecipesView({
  search,
  setSearch,
  category,
  setCategory,
  filteredRecipes,
  favorites,
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

      {/* Recipe Toolbar */}
      <div className="recipe-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, description, or ingredients..."
          />
          {search && (
            <button
              style={{ border: 0, background: "none", cursor: "pointer", color: "#8d9990" }}
              onClick={() => setSearch("")}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="filter-box">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Recipe Cards Grid */}
      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => {
          const isFav = favorites.includes(recipe.id);
          return (
            <article className="recipe-card" key={recipe.id}>
              <button
                className="recipe-image-button"
                onClick={() => onOpenRecipeDetails(recipe)}
                title="Click to view details"
              >
                <img src={recipe.image} alt={recipe.title} />
                <span className="recipe-category">{recipe.category}</span>
                <span className="recipe-view">
                  <Eye size={12} /> View
                </span>
              </button>

              <button
                className={`favorite-button ${isFav ? "is-favorite" : ""}`}
                title={isFav ? "Remove favorite" : "Add to favorites"}
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
                  <span><Flame size={13} /> {recipe.calories} kcal</span>
                </div>
                <button
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
