/**
 * Tier Limits and Feature Gating for MealMate (Free vs Pro)
 */

export const TIER_LIMITS = {
  FREE: {
    maxMeals: 15,
    maxRecipes: 6,
    hasCloudSync: false,
    hasAdvancedCharts: false,
    hasAisleSorting: true,
    hasShareList: true
  },
  PRO: {
    maxMeals: Infinity,
    maxRecipes: Infinity,
    hasCloudSync: true,
    hasAdvancedCharts: true,
    hasAisleSorting: true,
    hasShareList: true
  }
};

/**
 * Checks whether an action is permitted under the current plan
 */
export function checkFeatureAccess(feature, currentPlan, currentCount = 0) {
  const plan = currentPlan === "PRO" ? "PRO" : "FREE";
  const limits = TIER_LIMITS[plan];

  if (feature === "add_meal") {
    if (currentCount >= limits.maxMeals) {
      return {
        allowed: false,
        reason: `You've reached the ${limits.maxMeals}-meal limit on the Free plan. Upgrade to MealMate Pro for unlimited weekly planning!`
      };
    }
  }

  if (feature === "add_recipe") {
    if (currentCount >= limits.maxRecipes) {
      return {
        allowed: false,
        reason: `Free tier includes ${limits.maxRecipes} recipes. Upgrade to MealMate Pro to create unlimited custom recipes!`
      };
    }
  }

  return { allowed: true };
}
