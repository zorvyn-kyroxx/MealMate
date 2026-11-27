import { getFoodComposition } from "../constants/foodCompositionData.js";

export const activityLevels = [
  { id: "sedentary", label: "Sedentary", factor: 1.2, description: "Mostly sitting, with very little physical activity." },
  { id: "light", label: "Lightly active", factor: 1.375, description: "Light exercise or walking around 1–3 days per week." },
  { id: "moderate", label: "Moderately active", factor: 1.55, description: "Moderate exercise around 3–5 days per week." },
  { id: "very", label: "Very active", factor: 1.725, description: "Hard exercise or sports around 6–7 days per week." },
  { id: "extreme", label: "Extremely active", factor: 1.9, description: "Very demanding physical work or athletic training." }
];

export const nutritionGoals = [
  { id: "maintain", label: "Maintain my current weight", adjustment: 0 },
  { id: "fitness", label: "Improve general fitness", adjustment: 0 },
  { id: "weight-management", label: "Weight management", adjustment: 0 },
  { id: "fat-loss", label: "Lose weight / fat loss", adjustment: -0.1 },
  { id: "muscle", label: "Build muscle", adjustment: 0.05 },
  { id: "bulk", label: "Bulk", adjustment: 0.1 },
  { id: "protein", label: "Improve my daily protein intake", adjustment: 0 }
];

const proteinFactors = [0.8, 1.2, 1.4, 1.6];
const poundsToKg = 0.45359237;
const inchesToCm = 2.54;

const finitePositive = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

export const weightToKg = (value, unit = "kg") => {
  const amount = finitePositive(value);
  if (amount === null) return null;
  return unit === "lb" ? amount * poundsToKg : amount;
};

export const heightToCm = ({ centimeters, feet, inches, unit = "cm" }) => {
  if (unit === "ft-in") {
    const footValue = feet === "" ? 0 : Number(feet);
    const inchValue = inches === "" ? 0 : Number(inches);
    if (!Number.isFinite(footValue) || !Number.isFinite(inchValue) || footValue < 0 || inchValue < 0) return null;
    const totalInches = footValue * 12 + inchValue;
    return totalInches > 0 ? totalInches * inchesToCm : null;
  }
  return finitePositive(centimeters);
};

export const calculateMifflinStJeor = ({ weightKg, heightCm, age, equationSex }) => {
  if (![weightKg, heightCm, age].every((value) => Number.isFinite(Number(value)) && Number(value) > 0)) return null;
  const common = (10 * Number(weightKg)) + (6.25 * Number(heightCm)) - (5 * Number(age));
  if (equationSex === "male") return common + 5;
  if (equationSex === "female") return common - 161;
  return null;
};

export const getSuggestedProteinFactor = (profile) => {
  if (["muscle", "bulk"].includes(profile.goal)) return 1.6;
  const activityIndex = activityLevels.findIndex((level) => level.id === profile.activityLevel);
  const workoutFrequency = Number(profile.workoutFrequency);
  if (activityIndex >= 2 || (Number.isFinite(workoutFrequency) && workoutFrequency >= 3)) return 1.2;
  return 0.8;
};

export const calculateNutritionTargets = (profile) => {
  const age = Number(profile.age);
  if (!Number.isFinite(age) || age < 1 || age > 120) return { status: "incomplete" };
  if (age < 18) return { status: "minor", age };
  if (profile.specialCircumstance === true) return { status: "professional", age };

  const weightKg = weightToKg(
    profile.weightUnit === "lb" ? profile.weightLb : profile.weightKg,
    profile.weightUnit
  );
  const heightCm = heightToCm({
    centimeters: profile.heightCm,
    feet: profile.heightFeet,
    inches: profile.heightInches,
    unit: profile.heightUnit
  });
  if (!weightKg || weightKg < 25 || weightKg > 400
    || !heightCm || heightCm < 100 || heightCm > 250) {
    return { status: "incomplete", age, weightKg, heightCm };
  }

  const activity = activityLevels.find((level) => level.id === profile.activityLevel);
  if (!activity || !nutritionGoals.some((goal) => goal.id === profile.goal)) {
    return { status: "incomplete", age, weightKg, heightCm };
  }

  const bmr = calculateMifflinStJeor({
    weightKg,
    heightCm,
    age,
    equationSex: profile.equationSex
  });
  const maintenanceCalories = bmr === null ? null : bmr * activity.factor;
  const goal = nutritionGoals.find((option) => option.id === profile.goal);
  const suggestedCalories = maintenanceCalories === null
    ? null
    : maintenanceCalories * (1 + goal.adjustment);

  const suggestedFactor = getSuggestedProteinFactor(profile);
  const selectedFactor = Number(profile.proteinFactor);
  const proteinFactor = proteinFactors.includes(selectedFactor) ? selectedFactor : suggestedFactor;

  return {
    status: bmr === null ? "partial" : "ready",
    age,
    weightKg,
    heightCm,
    activity,
    goal,
    bmr,
    maintenanceCalories,
    suggestedCalories,
    calorieAdjustment: goal.adjustment,
    proteinFactor,
    proteinGrams: Math.round(weightKg * proteinFactor)
  };
};

export const validateNutritionStep = (profile, step) => {
  if (step === 1) {
    const age = Number(profile.age);
    if (!Number.isInteger(age) || age < 1 || age > 120) return "Enter an age between 1 and 120.";
    if (age < 18) return "";
    const weightKg = weightToKg(
      profile.weightUnit === "lb" ? profile.weightLb : profile.weightKg,
      profile.weightUnit
    );
    const heightCm = heightToCm({
      centimeters: profile.heightCm,
      feet: profile.heightFeet,
      inches: profile.heightInches,
      unit: profile.heightUnit
    });
    if (!weightKg || weightKg < 25 || weightKg > 400) return "Enter a valid body weight between 25 and 400 kg (or the equivalent in pounds).";
    if (!heightCm || heightCm < 100 || heightCm > 250) return "Enter a valid height between 100 and 250 cm (or the equivalent in feet and inches).";
    if (!["male", "female", "unspecified"].includes(profile.equationSex)) {
      return "Choose an equation option or select “Prefer not to use a sex-specific equation”.";
    }
  }
  if (step === 2 && Number(profile.age) >= 18
    && !activityLevels.some((level) => level.id === profile.activityLevel)) {
    return "Choose the activity level that best describes your usual week.";
  }
  if (step === 3 && Number(profile.age) >= 18
    && !nutritionGoals.some((goal) => goal.id === profile.goal)) {
    return "Choose a primary nutrition goal.";
  }
  if (step === 3 && Number(profile.age) < 18
    && !["fitness", "maintain", "protein"].includes(profile.goal)) {
    return "For people under 18, choose balanced eating, general fitness, or protein education.";
  }
  return "";
};

export const calculateRecipeIngredientNutrition = (nutritionIngredients, servings, customFoods = []) => {
  if (!Array.isArray(nutritionIngredients) || nutritionIngredients.length === 0) return null;
  const servingCount = finitePositive(servings);
  if (!servingCount) return null;

  const resolvedIngredients = nutritionIngredients.map((ingredient) => ({
    ingredient,
    food: getFoodComposition(ingredient.foodId, customFoods)
  }));
  if (resolvedIngredients.some(({ ingredient, food }) => (
    !food
    || !Number.isFinite(Number(ingredient.grams))
    || Number(ingredient.grams) <= 0
  ))) return null;

  const totalCalories = resolvedIngredients.reduce(
    (total, { ingredient, food }) => total + (food.caloriesPer100g * Number(ingredient.grams) / 100),
    0
  );
  const totalProtein = resolvedIngredients.reduce(
    (total, { ingredient, food }) => total + (food.proteinPer100g * Number(ingredient.grams) / 100),
    0
  );

  return {
    totalCalories,
    totalProtein,
    caloriesPerServing: totalCalories / servingCount,
    proteinPerServing: totalProtein / servingCount,
    ingredientCount: resolvedIngredients.length,
    hasUserEnteredFood: resolvedIngredients.some(({ food }) => food.source !== "USDA FoodData Central, SR Legacy")
  };
};

export const roundedCalories = (value) => Math.round(Number(value) / 10) * 10;
