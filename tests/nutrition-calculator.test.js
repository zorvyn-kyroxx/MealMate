import test from "node:test";
import assert from "node:assert/strict";
import { foodCompositionData } from "../src/constants/foodCompositionData.js";
import {
  activityLevels,
  calculateMifflinStJeor,
  calculateNutritionTargets,
  calculateRecipeIngredientNutrition,
  heightToCm,
  validateNutritionStep,
  weightToKg
} from "../src/utils/nutritionCalculator.js";
import { getDailyNutrition, getRecipeNutrition } from "../src/utils/nutrition.js";

const adultProfile = (overrides = {}) => ({
  age: "30",
  equationSex: "male",
  heightUnit: "cm",
  heightCm: "175",
  heightFeet: "",
  heightInches: "",
  weightUnit: "kg",
  weightKg: "70",
  weightLb: "",
  activityLevel: "moderate",
  goal: "maintain",
  workoutFrequency: "0",
  proteinFactor: "suggested",
  specialCircumstance: false,
  ...overrides
});

test("Mifflin-St Jeor returns the expected adult equation values", () => {
  assert.equal(calculateMifflinStJeor({
    age: 30, weightKg: 70, heightCm: 175, equationSex: "male"
  }), 1648.75);
  assert.equal(calculateMifflinStJeor({
    age: 30, weightKg: 70, heightCm: 175, equationSex: "female"
  }), 1482.75);
  assert.equal(calculateMifflinStJeor({
    age: 30, weightKg: 70, heightCm: 175, equationSex: "unspecified"
  }), null);
});

test("maintenance and goal estimates use the selected activity multiplier", () => {
  const result = calculateNutritionTargets(adultProfile());
  assert.equal(result.bmr, 1648.75);
  assert.equal(result.activity.factor, 1.55);
  assert.equal(result.maintenanceCalories, 2555.5625);
  assert.equal(result.suggestedCalories, 2555.5625);

  const fatLoss = calculateNutritionTargets(adultProfile({ goal: "fat-loss" }));
  const muscle = calculateNutritionTargets(adultProfile({ goal: "muscle" }));
  assert.equal(fatLoss.suggestedCalories, fatLoss.maintenanceCalories * 0.9);
  assert.equal(muscle.suggestedCalories, muscle.maintenanceCalories * 1.05);
  assert.deepEqual(activityLevels.map((level) => level.factor), [1.2, 1.375, 1.55, 1.725, 1.9]);
});

test("protein reference uses the chosen factor and defaults conservatively", () => {
  const general = calculateNutritionTargets(adultProfile());
  const muscle = calculateNutritionTargets(adultProfile({ goal: "muscle" }));
  const selected = calculateNutritionTargets(adultProfile({ proteinFactor: "1.4" }));
  assert.equal(general.proteinFactor, 1.2);
  assert.equal(general.proteinGrams, 84);
  assert.equal(muscle.proteinFactor, 1.6);
  assert.equal(muscle.proteinGrams, 112);
  assert.equal(selected.proteinFactor, 1.4);
  assert.equal(selected.proteinGrams, 98);
});

test("imperial inputs convert to canonical metric values", () => {
  assert.ok(Math.abs(weightToKg(154.3235835, "lb") - 70) < 0.000001);
  assert.ok(Math.abs(heightToCm({ feet: 5, inches: 8.8976378, unit: "ft-in" }) - 175) < 0.000001);
  const result = calculateNutritionTargets(adultProfile({
    heightUnit: "ft-in",
    heightCm: "",
    heightFeet: "5",
    heightInches: "8.9",
    weightUnit: "lb",
    weightKg: "",
    weightLb: "154.3"
  }));
  assert.equal(Math.round(result.heightCm), 175);
  assert.equal(Math.round(result.weightKg), 70);
});

test("minors and special circumstances never receive generic adult targets", () => {
  const minor = calculateNutritionTargets(adultProfile({ age: "17" }));
  const special = calculateNutritionTargets(adultProfile({ specialCircumstance: true }));
  assert.equal(minor.status, "minor");
  assert.equal("bmr" in minor, false);
  assert.equal("proteinGrams" in minor, false);
  assert.equal(special.status, "professional");
  assert.equal("bmr" in special, false);
  assert.equal("proteinGrams" in special, false);
  assert.equal(validateNutritionStep({ age: "17" }, 1), "");
  assert.equal(validateNutritionStep({ age: "17", goal: "fat-loss" }, 3).length > 0, true);
});

test("incomplete or implausible adult measurements do not produce targets", () => {
  assert.equal(calculateNutritionTargets(adultProfile({ weightKg: "0" })).status, "incomplete");
  assert.equal(calculateNutritionTargets(adultProfile({ heightCm: "260" })).status, "incomplete");
  assert.equal(calculateNutritionTargets(adultProfile({ equationSex: "unspecified" })).status, "partial");
});

test("ingredient macros scale by grams and are divided by recipe servings", () => {
  const chicken = foodCompositionData.find((food) => food.fdcId === 171477);
  const recipe = calculateRecipeIngredientNutrition([
    { foodId: chicken.id, grams: 300 }
  ], 3);
  assert.equal(recipe.totalCalories, 495);
  assert.equal(recipe.totalProtein, 93);
  assert.equal(recipe.caloriesPerServing, 165);
  assert.equal(recipe.proteinPerServing, 31);
});

test("custom food ingredients use their stated per-100 g values", () => {
  const result = calculateRecipeIngredientNutrition([
    { foodId: "custom-paneer", grams: 150 }
  ], 3, [{
    id: "custom-paneer",
    name: "Paneer",
    caloriesPer100g: 265,
    proteinPer100g: 18.3,
    source: "User-entered label or estimate"
  }]);
  assert.equal(result.caloriesPerServing, 132.5);
  assert.equal(result.proteinPerServing, 9.15);
  assert.equal(result.hasUserEnteredFood, true);
});

test("food diary counts only eaten meals and scales logged servings once", () => {
  const result = getDailyNutrition({
    date: "2026-04-15",
    today: "2026-04-15",
    recipes: [{ id: 1, calories: 200, protein: 10 }],
    meals: [
      { id: 1, recipeId: 1, date: "2026-04-15", type: "Lunch", title: "Meal", calories: 200, protein: 10, servings: 2, eaten: true },
      { id: 2, recipeId: 1, date: "2026-04-15", type: "Dinner", title: "Planned meal", calories: 200, protein: 10, servings: 1, eaten: false }
    ],
    nutritionEntries: [
      { id: 3, name: "Snack", date: "2026-04-15", mealType: "Snack", calories: 100, protein: 5, servings: 1.5 }
    ]
  });
  assert.equal(result.calories, 550);
  assert.equal(result.protein, 27.5);
  assert.equal(result.entries.length, 2);
});

test("unknown nutrition stays unknown instead of being assigned a fabricated value", () => {
  const result = getDailyNutrition({
    date: "2026-04-15",
    today: "2026-04-15",
    recipes: [],
    meals: [],
    nutritionEntries: [
      { id: 1, name: "Homemade soup", date: "2026-04-15", mealType: "Lunch", calories: null, protein: null, servings: 1 }
    ]
  });
  assert.equal(result.calories, 0);
  assert.equal(result.protein, 0);
  assert.equal(result.hasUnknownCalories, true);
  assert.equal(result.hasUnknownProtein, true);
});

test("recipe nutrition prefers computed ingredients and flags user-entered estimates", () => {
  const nutrition = getRecipeNutrition({
    calories: 999,
    protein: 99,
    servings: 2,
    nutritionIngredients: [{ foodId: "custom-paneer", grams: 100 }]
  }, [{
    id: "custom-paneer",
    name: "Paneer",
    caloriesPer100g: 265,
    proteinPer100g: 18.3,
    source: "User-entered label or estimate"
  }]);
  assert.equal(nutrition.calories, 132.5);
  assert.equal(nutrition.protein, 9.15);
  assert.match(nutrition.source, /user-entered/i);
});
