import test from "node:test";
import assert from "node:assert/strict";
import { expensesInMonth } from "../src/utils/dateUtils.js";
import {
  clearLegacyDemoMealCalories,
  migrateLegacySeedDescription
} from "../src/utils/dataMigrations.js";
import { getRecipeNutrition } from "../src/utils/nutrition.js";

test("monthly expense filtering excludes dates outside the displayed budget period", () => {
  const expenses = [
    { id: 1, amount: 25, date: "2026-04-01" },
    { id: 2, amount: 40, date: "2026-04-30" },
    { id: 3, amount: 80, date: "2026-03-31" },
    { id: 4, amount: 15 },
    null
  ];

  assert.deepEqual(expensesInMonth(expenses, "2026-04").map((expense) => expense.id), [1, 2]);
  assert.deepEqual(expensesInMonth(expenses, "invalid"), []);
});

test("unreferenced recipe nutrition is not shown as a numeric estimate", () => {
  assert.deepEqual(
    getRecipeNutrition({ calories: 400, protein: 25 }),
    {
      calories: null,
      protein: null,
      source: "Nutrition not provided (no recorded source)",
      estimated: true
    }
  );
});

test("explicitly user-entered recipe nutrition remains identified as an estimate", () => {
  const nutrition = getRecipeNutrition({
    calories: 400,
    protein: 25,
    nutritionSource: "User-entered label or estimate"
  });

  assert.equal(nutrition.calories, 400);
  assert.equal(nutrition.protein, 25);
  assert.match(nutrition.source, /user-entered/i);
});

test("legacy demo meal calories are cleared without overwriting edited meal data", () => {
  const meals = clearLegacyDemoMealCalories([
    { id: 101, title: "Aloo Paratha", type: "Breakfast", time: "08:30", calories: 420, recipeId: 3 },
    { id: 102, title: "Rajma Chawal", type: "Lunch", time: "13:15", calories: 520, recipeId: 16 },
    { id: 104, title: "My meal", type: "Lunch", time: "13:15", calories: 420, recipeId: 3 }
  ]);

  assert.equal("calories" in meals[0], false);
  assert.equal(meals[1].calories, 520);
  assert.equal(meals[2].calories, 420);
});

test("legacy seed descriptions migrate while customized descriptions remain intact", () => {
  const legacyDescription = "The ultimate healing comfort food — a one-pot rice and lentil porridge seasoned with turmeric, ginger, and ghee, light enough for any day.";
  const updatedDescription = "A comforting one-pot rice and lentil dish seasoned with turmeric, ginger, and ghee.";
  const customizedDescription = "My family's version with extra ginger.";

  assert.equal(
    migrateLegacySeedDescription(legacyDescription, updatedDescription),
    updatedDescription
  );
  assert.equal(
    migrateLegacySeedDescription(customizedDescription, updatedDescription),
    customizedDescription
  );
});
