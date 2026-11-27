const legacySeedMeals = new Map([
  [101, { title: "Aloo Paratha", type: "Breakfast", time: "08:30", calories: 420, recipeId: 3 }],
  [102, { title: "Rajma Chawal", type: "Lunch", time: "13:15", calories: 490, recipeId: 16 }],
  [103, { title: "Palak Paneer", type: "Dinner", time: "20:00", calories: 400, recipeId: 37 }]
]);

const legacySeedDescriptions = new Set([
  "Protein-rich gram-flour crepes spiced with cumin, ajwain, and green chilli — a quick, nutritious breakfast ready in under 20 minutes.",
  "The ultimate healing comfort food — a one-pot rice and lentil porridge seasoned with turmeric, ginger, and ghee, light enough for any day.",
  "Crumbled fresh paneer scrambled with onions, tomatoes, capsicum, and spices — a quick, protein-packed dish that works brilliantly as a roti filling.",
  "Soft, spongy, and tangy steamed Gujarati chickpea-flour cakes tempered with mustard seeds, sesame, and curry leaves — light, healthy, and utterly addictive.",
  "Sweet garden carrots and fresh green peas stir-fried with cumin and coriander — a light, colourful, nutritious winter vegetable side dish.",
  "Iron-rich spinach and tender potatoes cooked together with ginger, garlic, and warming spices — a wholesome, nutritious dinner favourite.",
  "A colourful medley of seasonal vegetables cooked in a lightly spiced tomato base — versatile, nutritious, and a true celebration of India's diverse produce.",
  "A light, spicy, oil-free puffed rice chaat tossed with raw vegetables and punchy chutneys — a supremely easy healthy snack ready in under 10 minutes.",
  "Flaky whole-wheat flatbreads stuffed with spiced crumbled fresh paneer and herbs — a protein-rich Punjabi breakfast that is filling and delicious.",
  "A thick, vibrant fruit smoothie blending ripe strawberries and banana with chilled yogurt and honey — a fresh, nutritious Indian fruit-bar style drink.",
  "The original golden latte — warm milk infused with turmeric, black pepper, ginger, and honey — an ancient Ayurvedic immunity-boosting bedtime drink."
]);

export const migrateLegacySeedDescription = (description, currentSeedDescription) =>
  legacySeedDescriptions.has(description) ? currentSeedDescription : description;

export const clearLegacyDemoMealCalories = (meals) => {
  if (!Array.isArray(meals)) return meals;

  return meals.map((meal) => {
    const seed = legacySeedMeals.get(Number(meal?.id));
    if (!seed || !meal
      || !["title", "type", "time", "recipeId"].every((key) => meal[key] === seed[key])
      || Number(meal.calories) !== seed.calories) return meal;

    const { calories: _calories, ...mealWithoutSeedCalories } = meal;
    return mealWithoutSeedCalories;
  });
};
