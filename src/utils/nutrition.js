import { getRecipeProtein } from "../constants/nutritionData.js";
import { calculateRecipeIngredientNutrition } from "./nutritionCalculator.js";

const numericValue = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

const servingsFor = (item) => Math.max(0.1, numericValue(item.servings) || 1);

export const getRecipeNutrition = (recipe, customFoods = []) => {
  if (!recipe) return { calories: null, protein: null, source: "Nutrition not provided", estimated: true };
  const ingredientNutrition = calculateRecipeIngredientNutrition(
    recipe.nutritionIngredients,
    recipe.servings,
    customFoods
  );
  if (ingredientNutrition) {
    return {
      calories: ingredientNutrition.caloriesPerServing,
      protein: ingredientNutrition.proteinPerServing,
      source: ingredientNutrition.hasUserEnteredFood
        ? "USDA data and user-entered values for listed ingredients"
        : "USDA food composition data for listed ingredients",
      estimated: true,
      ingredientCount: ingredientNutrition.ingredientCount
    };
  }
  const source = typeof recipe.nutritionSource === "string" ? recipe.nutritionSource : "";
  const hasRecordedSource = /USDA|user-entered/i.test(source);
  return {
    calories: hasRecordedSource ? numericValue(recipe.calories) : null,
    protein: hasRecordedSource ? numericValue(getRecipeProtein(recipe) ?? (/user-entered/i.test(source) ? recipe.protein : null)) : null,
    source: hasRecordedSource ? source : "Nutrition not provided (no recorded source)",
    estimated: true
  };
};

export const getMealMacros = (meal, recipes, customFoods = []) => {
  const recipe = recipes.find((item) => String(item.id) === String(meal.recipeId));
  const recipeNutrition = getRecipeNutrition(recipe, customFoods);
  const calories = numericValue(meal.caloriesPerServing ?? meal.calories ?? recipeNutrition.calories);
  const protein = numericValue(meal.proteinPerServing ?? meal.protein ?? recipeNutrition.protein);
  const servings = servingsFor(meal);

  return {
    calories: calories === null ? null : calories * servings,
    protein: protein === null ? null : protein * servings
  };
};

export const getFoodEntryMacros = (entry) => {
  const servings = servingsFor(entry);
  const calories = numericValue(entry.calories);
  const protein = numericValue(entry.protein);

  return {
    calories: calories === null ? null : calories * servings,
    protein: protein === null ? null : protein * servings
  };
};

export const getDailyNutrition = ({ date, today, meals, nutritionEntries, recipes, customFoods = [] }) => {
  if (date > today) {
    return { entries: [], calories: 0, protein: 0, hasUnknownProtein: false, hasUnknownCalories: false };
  }

  const loggedMeals = meals
    .filter((meal) => meal.date === date && meal.eaten === true && meal.date <= today)
    .map((meal) => ({
      id: `meal-${meal.id}`,
      sourceId: meal.id,
      source: "meal",
      title: meal.title,
      mealType: meal.type,
      servings: servingsFor(meal),
      ...getMealMacros(meal, recipes, customFoods)
    }));

  const loggedFoods = nutritionEntries
    .filter((entry) => entry.date === date && entry.date <= today)
    .map((entry) => ({
      id: `food-${entry.id}`,
      sourceId: entry.id,
      source: "food",
      title: entry.name,
      mealType: entry.mealType,
      servings: servingsFor(entry),
      servingDescription: entry.servingDescription || "",
      ...getFoodEntryMacros(entry)
    }));

  const entries = [...loggedMeals, ...loggedFoods];
  return entries.reduce(
    (totals, entry) => ({
      entries,
      calories: totals.calories + (entry.calories || 0),
      protein: totals.protein + (entry.protein || 0),
      hasUnknownProtein: totals.hasUnknownProtein || entry.protein === null,
      hasUnknownCalories: totals.hasUnknownCalories || entry.calories === null
    }),
    { entries, calories: 0, protein: 0, hasUnknownProtein: false, hasUnknownCalories: false }
  );
};
