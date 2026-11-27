import { foodCompositionData } from "./foodCompositionData.js";

export const recipeCollections = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "High-Protein Meals",
  "Protein-Rich Vegetarian Meals",
  "Protein-Rich Non-Vegetarian Meals",
  "Snacks",
  "Protein Snacks",
  "Smoothies",
  "Protein Shakes",
  "Beverages",
  "Traditional Indian Drinks",
  "Salads",
  "Quick Meals",
  "Budget-Friendly Meals",
  "Vegetarian",
  "Non-vegetarian",
  "Desserts"
];

const nonVegetarianPattern = /\b(chicken|fish|egg|eggs|prawn|shrimp|mutton|lamb|beef|pork|turkey|tuna|salmon)\b/i;
const traditionalDrinkPattern = /\b(chaas|lassi|sattu|aam panna|jaljeera|sharbat|thandai|chai|filter coffee|badam milk|haldi doodh)\b/i;
const budgetFriendlyPattern = /\b(dal|chana|chickpea|rajma|beans|khichdi|poha|upma|chilla|cheela|rice|sabzi|murmura|sprouts|oats)\b/i;

export const getRecipeProtein = (recipe) => {
  const source = typeof recipe?.nutritionSource === "string" ? recipe.nutritionSource : "";
  if (!source.includes("USDA") || /user-entered/i.test(source)) return null;

  const protein = recipe?.protein;
  return protein !== null && protein !== undefined && protein !== ""
    && Number.isFinite(Number(protein)) && Number(protein) >= 0
    ? Number(protein)
    : null;
};

export const getRecipeCollections = (recipe) => {
  const collections = new Set(Array.isArray(recipe?.collections) ? recipe.collections : []);
  const mealCategories = Array.isArray(recipe?.categories) && recipe.categories.length
    ? recipe.categories
    : [recipe?.category].filter(Boolean);
  const ingredients = Array.isArray(recipe?.ingredients) ? recipe.ingredients : [];
  const text = `${recipe?.title || ""} ${recipe?.description || ""} ${ingredients.join(" ")}`;
  const protein = getRecipeProtein(recipe);
  const isNonVegetarian = nonVegetarianPattern.test(text);
  const isSnack = mealCategories.includes("Snack");
  const isBeverage = mealCategories.includes("Beverage");
  const isDessert = mealCategories.includes("Dessert");

  mealCategories.forEach((mealCategory) => {
    if (mealCategory === "Dessert") {
      collections.add("Desserts");
    } else if (["Breakfast", "Lunch", "Dinner"].includes(mealCategory)) {
      collections.add(mealCategory);
    }
  });

  if (ingredients.length > 0) {
    collections.add(isNonVegetarian ? "Non-vegetarian" : "Vegetarian");
  }
  if (!isSnack && !isBeverage && !isDessert && protein !== null && protein >= 15) {
    collections.add("High-Protein Meals");
    collections.add(isNonVegetarian
      ? "Protein-Rich Non-Vegetarian Meals"
      : "Protein-Rich Vegetarian Meals");
  }
  if (isSnack) collections.add("Snacks");
  if (isSnack && protein !== null && protein >= 8) collections.add("Protein Snacks");
  if (/\bsmooth(?:ie|ies)\b/i.test(text)) collections.add("Smoothies");
  if (/\b(?:protein\s+)?shake\b/i.test(text)) collections.add("Protein Shakes");
  if (isBeverage) collections.add("Beverages");
  if (isBeverage && traditionalDrinkPattern.test(text)) collections.add("Traditional Indian Drinks");
  if (/\bsalads?\b/i.test(text)) collections.add("Salads");
  if (Number(recipe?.time) > 0 && Number(recipe.time) <= 30) collections.add("Quick Meals");
  if (!isNonVegetarian && budgetFriendlyPattern.test(text)) collections.add("Budget-Friendly Meals");

  return [...collections].filter((collection) => recipeCollections.includes(collection));
};

const proteinFoodServingSpecs = [
  { foodId: "usda-171477", grams: 100, preference: "Non-vegetarian" },
  { foodId: "usda-173799", grams: 150, preference: "Vegetarian" },
  { foodId: "usda-175242", grams: 150, preference: "Vegetarian" },
  { foodId: "usda-173424", grams: 100, preference: "Non-vegetarian" }
];

export const proteinFoodSuggestions = proteinFoodServingSpecs.flatMap(({ foodId, grams, preference }) => {
  const food = foodCompositionData.find((item) => item.id === foodId);
  if (!food) return [];

  const servingFactor = grams / 100;
  return [{
    ...food,
    grams,
    serving: `${grams} g (${food.state})`,
    calories: Math.round(food.caloriesPer100g * servingFactor),
    protein: Math.round(food.proteinPer100g * servingFactor * 10) / 10,
    preference
  }];
});
