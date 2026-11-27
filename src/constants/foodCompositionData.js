export const foodCompositionSource = "USDA FoodData Central, SR Legacy";

const foodDataUrl = (fdcId) => `https://fdc.nal.usda.gov/food-details/${fdcId}/nutrients`;

export const foodCompositionData = [
  {
    id: "usda-171477",
    fdcId: 171477,
    name: "Chicken breast, cooked, roasted (meat only)",
    state: "Cooked, edible meat",
    caloriesPer100g: 165,
    proteinPer100g: 31,
    source: foodCompositionSource,
    sourceUrl: foodDataUrl(171477)
  },
  {
    id: "usda-173799",
    fdcId: 173799,
    name: "Chickpeas, cooked, boiled",
    state: "Cooked, drained edible portion",
    caloriesPer100g: 164,
    proteinPer100g: 8.86,
    source: foodCompositionSource,
    sourceUrl: foodDataUrl(173799)
  },
  {
    id: "usda-175242",
    fdcId: 175242,
    name: "Kidney beans, cooked, boiled",
    state: "Cooked, drained edible portion",
    caloriesPer100g: 127,
    proteinPer100g: 8.67,
    source: foodCompositionSource,
    sourceUrl: foodDataUrl(175242)
  },
  {
    id: "usda-173424",
    fdcId: 173424,
    name: "Egg, whole, hard-boiled",
    state: "Cooked, edible portion",
    caloriesPer100g: 155,
    proteinPer100g: 12.6,
    source: foodCompositionSource,
    sourceUrl: foodDataUrl(173424)
  },
  {
    id: "usda-173944",
    fdcId: 173944,
    name: "Banana, raw",
    state: "Raw, edible portion",
    caloriesPer100g: 89,
    proteinPer100g: 1.09,
    source: foodCompositionSource,
    sourceUrl: foodDataUrl(173944)
  }
];

export const getFoodComposition = (foodId, customFoods = []) =>
  foodCompositionData.find((food) => food.id === foodId)
  || customFoods.find((food) => food.id === foodId)
  || null;

export const getFoodCompositionOptions = (customFoods = []) =>
  [...foodCompositionData, ...customFoods];
