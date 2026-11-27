import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, CalendarDays, BookOpen, ShoppingBasket, Wallet,
  BarChart3, Settings, Crown, Sparkles, Activity, MessageSquare
} from "lucide-react";
import "./App.css";

// Utilities & Initial Data
import { dayStart, dateKey, prettyDate, readStore, expensesInMonth } from "./utils/dateUtils";
import {
  clearLegacyDemoMealCalories,
  migrateLegacySeedDescription
} from "./utils/dataMigrations";
import {
  today, starterRecipes, initialMeals, initialGroceries, initialExpenses,
  iconForMeal, blankRecipe, categories
} from "./constants/initialData";

// Supabase Cloud Sync Service
import {
  syncUserDataToCloud, fetchUserDataFromCloud, signOutUser, isSupabaseConfigured
} from "./services/supabaseClient";

// Core Shell & Dashboard (loaded eagerly for instant first paint)
import LandingPage from "./components/LandingPage";
import LegalLinks from "./components/LegalLinks";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardView from "./components/DashboardView";

// Secondary Views & Modals (code-split to keep initial bundle fast)
const MealPlannerView = lazy(() => import("./components/MealPlannerView"));
const RecipesView = lazy(() => import("./components/RecipesView"));
const GroceriesView = lazy(() => import("./components/GroceriesView"));
const BudgetView = lazy(() => import("./components/BudgetView"));
const AnalyticsView = lazy(() => import("./components/AnalyticsView"));
const SettingsView = lazy(() => import("./components/SettingsView"));
const PricingView = lazy(() => import("./components/PricingView"));
const NutritionTracker = lazy(() => import("./components/NutritionTracker"));
const FeedbackView = lazy(() => import("./components/FeedbackView"));

// Security & Gating Utilities
import { checkFeatureAccess } from "./utils/tierLimits";
import { sanitizeText } from "./utils/security";
import { getRecipeCollections, getRecipeProtein } from "./constants/nutritionData";
import { getDailyNutrition, getRecipeNutrition } from "./utils/nutrition";
import { calculateRecipeIngredientNutrition } from "./utils/nutritionCalculator";
import { getFoodComposition } from "./constants/foodCompositionData";
import {
  createSubscriptionOrder, fetchSubscriptionStatus, verifySubscriptionPayment
} from "./services/subscriptionService";

// Modals (lazy-loaded on demand)
const MealModal = lazy(() => import("./components/Modals/MealModal"));
const RecipeModal = lazy(() => import("./components/Modals/RecipeModal"));
const RecipeDetailModal = lazy(() => import("./components/Modals/RecipeDetailModal"));
const GroceryModal = lazy(() => import("./components/Modals/GroceryModal"));
const ExpenseModal = lazy(() => import("./components/Modals/ExpenseModal"));
const AuthModal = lazy(() => import("./components/Modals/AuthModal"));
const UpgradeModal = lazy(() => import("./components/Modals/UpgradeModal"));
const LegalModal = lazy(() => import("./components/Modals/LegalModal"));
const PaymentModal = lazy(() => import("./components/Modals/PaymentModal"));

const cloudAccountsEnabled =
  import.meta.env.VITE_CLOUD_ACCOUNTS_ENABLED === "true" && isSupabaseConfigured;
const accountCreationEnabled =
  cloudAccountsEnabled && import.meta.env.VITE_ACCOUNT_CREATION_ENABLED === "true";
const paymentsEnabled = false;

const defaultNutritionProfile = {
  age: "",
  equationSex: "",
  heightUnit: "cm",
  heightCm: "",
  heightFeet: "",
  heightInches: "",
  weightUnit: "kg",
  weightKg: "",
  weightLb: "",
  activityLevel: "",
  goal: "",
  dietaryPreference: "",
  proteinTarget: "",
  proteinFactor: "suggested",
  workoutFrequency: "",
  exerciseType: "",
  workoutMinutes: "",
  specialCircumstance: false,
  calculationComplete: false
};

const normalizeFeedbackEntries = (entries) => {
  if (!Array.isArray(entries)) return [];
  return entries.filter((entry) => (
    entry
    && typeof entry === "object"
    && ["general", "idea", "bug"].includes(entry.type)
    && typeof entry.message === "string"
    && entry.message.trim().length >= 10
    && typeof entry.createdAt === "string"
  )).slice(0, 100);
};

const normalizeNutritionEntries = (entries) => {
  if (!Array.isArray(entries)) return [];
  return entries.flatMap((entry, index) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return [];
    const name = sanitizeText(String(entry.name || "").trim());
    const date = typeof entry.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(entry.date)
      ? entry.date
      : "";
    const calories = entry.calories === null || entry.calories === undefined || entry.calories === ""
      ? null
      : Number(entry.calories);
    const protein = entry.protein === null || entry.protein === undefined || entry.protein === ""
      ? null
      : Number(entry.protein);
    const servings = Number(entry.servings);
    if (!name || !date || (calories !== null && (!Number.isFinite(calories) || calories < 0))
      || (protein !== null && (!Number.isFinite(protein) || protein < 0))
      || !Number.isFinite(servings) || servings <= 0) return [];
    return [{
      ...entry,
      id: entry.id ?? `imported-${index}-${date}`,
      name,
      date,
      mealType: typeof entry.mealType === "string" && entry.mealType.trim() ? entry.mealType : "Snack",
      servings,
      calories,
      protein,
      grams: Number.isFinite(Number(entry.grams)) && Number(entry.grams) > 0 ? Number(entry.grams) : null,
      foodId: typeof entry.foodId === "string" ? entry.foodId : "",
      nutritionSource: typeof entry.nutritionSource === "string" ? sanitizeText(entry.nutritionSource) : "",
      servingDescription: typeof entry.servingDescription === "string" ? entry.servingDescription : ""
    }];
  });
};

const normalizeNutritionProfile = (profile) => {
  const source = profile && typeof profile === "object" && !Array.isArray(profile) ? profile : {};
  const optionalNumber = (value, max) => {
    const number = Number(value);
    return value !== "" && Number.isFinite(number) && number > 0 && number <= max ? String(value) : "";
  };
  const activityAliases = {
    light: "light",
    moderate: "moderate",
    active: "very",
    sedentary: "sedentary",
    very: "very",
    extreme: "extreme"
  };
  const goalAliases = {
    balanced: "fitness",
    energy: "fitness",
    strength: "muscle",
    other: "",
    maintain: "maintain",
    fitness: "fitness",
    "weight-management": "weight-management",
    "fat-loss": "fat-loss",
    muscle: "muscle",
    bulk: "bulk",
    protein: "protein"
  };
  const heightUnit = source.heightUnit === "ft-in" ? "ft-in" : "cm";
  const weightUnit = source.weightUnit === "lb" ? "lb" : "kg";
  const dietaryPreferences = ["", "vegetarian", "vegan", "non-vegetarian", "other"];
  const proteinFactor = ["suggested", "0.8", "1.2", "1.4", "1.6"].includes(String(source.proteinFactor))
    ? String(source.proteinFactor)
    : "suggested";
  return {
    age: optionalNumber(source.age, 120),
    weightKg: optionalNumber(source.weightKg, 500),
    weightLb: optionalNumber(source.weightLb, 880),
    weightUnit,
    heightUnit,
    heightCm: optionalNumber(source.heightCm, 300),
    heightFeet: source.heightFeet === "" || source.heightFeet === undefined ? "" : optionalNumber(source.heightFeet, 8),
    heightInches: source.heightInches === "" || source.heightInches === undefined ? "" : String(Number(source.heightInches) >= 0 && Number(source.heightInches) < 12 ? source.heightInches : ""),
    equationSex: ["male", "female", "unspecified"].includes(source.equationSex) ? source.equationSex : "",
    activityLevel: activityAliases[source.activityLevel] || "",
    goal: goalAliases[source.goal] ?? "",
    dietaryPreference: dietaryPreferences.includes(source.dietaryPreference) ? source.dietaryPreference : "",
    proteinTarget: optionalNumber(source.proteinTarget, 500),
    proteinFactor,
    workoutFrequency: source.workoutFrequency === "" || source.workoutFrequency === undefined ? "" : String(Number(source.workoutFrequency) >= 0 && Number(source.workoutFrequency) <= 14 ? source.workoutFrequency : ""),
    exerciseType: ["", "walking", "cardio", "resistance", "sports", "mixed", "other"].includes(source.exerciseType) ? source.exerciseType : "",
    workoutMinutes: optionalNumber(source.workoutMinutes, 600),
    specialCircumstance: source.specialCircumstance === true,
    calculationComplete: source.calculationComplete === true
  };
};

const normalizeCustomFoods = (foods) => {
  if (!Array.isArray(foods)) return [];
  return foods.flatMap((food, index) => {
    if (!food || typeof food !== "object" || Array.isArray(food)) return [];
    const name = sanitizeText(String(food.name || "").trim());
    const caloriesPer100g = Number(food.caloriesPer100g);
    const proteinPer100g = food.proteinPer100g === null || food.proteinPer100g === "" ? null : Number(food.proteinPer100g);
    if (!name || !Number.isFinite(caloriesPer100g) || caloriesPer100g < 0
      || proteinPer100g === null || !Number.isFinite(proteinPer100g) || proteinPer100g < 0) return [];
    return [{
      id: typeof food.id === "string" || typeof food.id === "number" ? food.id : `custom-food-${index}`,
      name,
      state: typeof food.state === "string" ? sanitizeText(food.state) : "User-entered serving basis",
      caloriesPer100g,
      proteinPer100g,
      source: "User-entered label or estimate",
      sourceUrl: ""
    }];
  }).slice(0, 500);
};

const readCompatibleStore = (key, legacyKey, fallback) => {
  const primaryValue = readStore(key, undefined);
  return primaryValue === undefined ? readStore(legacyKey, fallback) : primaryValue;
};

const normalizeRecipes = (recipeList) => {
  const starterRecipesById = new Map(starterRecipes.map((recipe) => [String(recipe.id), recipe]));

  const normalized = recipeList.map((recipe) => {
    const starterRecipe = starterRecipesById.get(String(recipe.id));
    const hasRecordedNutritionSource =
      typeof recipe.nutritionSource === "string" && /USDA|user-entered/i.test(recipe.nutritionSource);
    const hasSavedCategories = Array.isArray(recipe.categories) && recipe.categories.length > 0;
    const recipeCategories = hasSavedCategories
      ? recipe.categories
      : starterRecipe?.categories || [recipe.category].filter(Boolean);

    return {
      ...recipe,
      category: recipeCategories[0] || recipe.category,
      categories: recipeCategories,
      description: starterRecipe
        ? migrateLegacySeedDescription(recipe.description, starterRecipe.description)
        : recipe.description,
      calories: hasRecordedNutritionSource || !starterRecipe ? recipe.calories : "",
      protein: hasRecordedNutritionSource || !starterRecipe ? recipe.protein ?? getRecipeProtein(recipe) : "",
      collections: getRecipeCollections({
        ...recipe,
        collections: starterRecipe ? [] : recipe.collections
      }),
      ...(starterRecipe && {
        image: starterRecipe.image,
        imageCredit: starterRecipe.imageCredit,
        imageCreditUrl: starterRecipe.imageCreditUrl
      })
    };
  });

  if (readStore("mealmate-seed-version", 0) < 4) {
    const savedIds = new Set(normalized.map((recipe) => String(recipe.id)));
    starterRecipes
      .filter((recipe) => Number(recipe.id) >= 106 && !savedIds.has(String(recipe.id)))
      .forEach((recipe) => normalized.push({ ...recipe, protein: getRecipeProtein(recipe) }));
    try {
      localStorage.setItem("mealmate-seed-version", JSON.stringify(4));
    } catch {
      // The recipes remain usable for this session if browser storage is unavailable.
    }
  }

  return normalized;
};

const getRecipeCategories = (recipe) =>
  Array.isArray(recipe.categories) && recipe.categories.length
    ? recipe.categories
    : [recipe.category].filter(Boolean);

export default function App() {
  const [started, setStarted] = useState(() => readStore("mealmate-started", false));
  const [page, setPage] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [theme, setTheme] = useState(() => readStore("mealmate-theme", "light"));

  // User session & Plan
  const [user, setUser] = useState(() => {
    if (!cloudAccountsEnabled) return null;
    const savedUser = readStore("mealmate-user", null);
    return typeof savedUser?.id === "string" && savedUser.id.startsWith("local-") ? null : savedUser;
  });
  const [verifiedPlan, setVerifiedPlan] = useState({ userId: null, plan: "FREE", expiresAt: null });
  const userId = typeof user?.id === "string" ? user.id : null;
  const userPlan = verifiedPlan.userId === userId ? verifiedPlan.plan : "FREE";

  // Legal & Payment Modal States (auto-open if visiting /privacy or /terms)
  const initialLegalPath =
    typeof window !== "undefined" ? window.location.pathname.toLowerCase() : "";
  const legalPathTabs = {
    "/about": "about",
    "/contact": "contact",
    "/privacy": "privacy",
    "/terms": "terms",
    "/nutrition": "nutrition",
    "/nutrition-disclaimer": "nutrition",
    "/advertising": "advertising",
    "/advertising-disclosure": "advertising",
    "/grievance": "grievance",
    "/grievance-information": "grievance"
  };
  const [legalOpen, setLegalOpen] = useState(Boolean(legalPathTabs[initialLegalPath]));
  const [legalTab, setLegalTab] = useState(legalPathTabs[initialLegalPath] || "terms");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState("");
  const [paymentData, setPaymentData] = useState({
    amount: 1999,
    billingCycle: "annual",
    planName: "MealMate Pro",
    order: null
  });

  // Workspace Data
  const [meals, setMeals] = useState(() =>
    clearLegacyDemoMealCalories(readCompatibleStore("mealmate-meals", "mm-meals", initialMeals))
  );
  const [recipes, setRecipes] = useState(() =>
    normalizeRecipes(readStore("mealmate-recipes", starterRecipes))
  );
  const [groceries, setGroceries] = useState(() => readCompatibleStore("mealmate-groceries", "mm-groceries", initialGroceries));
  const [favorites, setFavorites] = useState(() => readStore("mealmate-favorites", [1, 5]));
  const [budget, setBudget] = useState(() => readCompatibleStore("mealmate-budget", "mm-budget", 8000));
  const [expenses, setExpenses] = useState(() => readCompatibleStore("mealmate-expenses", "mm-expenses", initialExpenses));
  const [calorieTarget, setCalorieTarget] = useState(() => {
    const saved = readCompatibleStore("mealmate-cal-target", "mm-nutrition-targets", null);
    return typeof saved === "number" && Number.isFinite(saved) && saved > 0 ? saved : null;
  });
  const [servingSize, setServingSize] = useState(() => readStore("mealmate-serving-size", 2));
  const [nutritionEntries, setNutritionEntries] = useState(() =>
    normalizeNutritionEntries(readCompatibleStore("mealmate-nutrition", "mm-food-logs", []))
  );
  const [nutritionProfile, setNutritionProfile] = useState(() =>
    normalizeNutritionProfile(readCompatibleStore("mealmate-nutrition-profile", "mm-nutrition-profile", defaultNutritionProfile))
  );
  const [customFoods, setCustomFoods] = useState(() =>
    normalizeCustomFoods(readCompatibleStore("mealmate-custom-foods", "mm-custom-foods", []))
  );
  const [feedbackEntries, setFeedbackEntries] = useState(() =>
    normalizeFeedbackEntries(readStore("mealmate-feedback", []))
  );
  const [weekStart, setWeekStart] = useState(() => dayStart(today));
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [modal, setModal] = useState(""); // "meal" | "recipe" | "recipeDetail" | "grocery" | "expense" | "auth" | "upgrade"
  const [editingMeal, setEditingMeal] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editingGrocery, setEditingGrocery] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [mealForm, setMealForm] = useState({
    date: dateKey(today),
    type: "Breakfast",
    title: "",
    time: "08:30",
    calories: "",
    recipeId: ""
  });
  const [recipeForm, setRecipeForm] = useState(blankRecipe);
  const [groceryForm, setGroceryForm] = useState({ name: "", amount: "1 pack", category: "Produce" });
  const [expenseForm, setExpenseForm] = useState({ title: "", amount: "", category: "Groceries", date: dateKey(today) });
  const [notification, setNotification] = useState("");

  // Apply and Sync Theme
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  // Sync to LocalStorage
  useEffect(() => localStorage.setItem("mealmate-started", JSON.stringify(started)), [started]);
  useEffect(() => localStorage.setItem("mealmate-user", JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem("mealmate-meals", JSON.stringify(meals)), [meals]);
  useEffect(() => localStorage.setItem("mealmate-recipes", JSON.stringify(recipes)), [recipes]);
  useEffect(() => localStorage.setItem("mealmate-groceries", JSON.stringify(groceries)), [groceries]);
  useEffect(() => localStorage.setItem("mealmate-favorites", JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem("mealmate-budget", JSON.stringify(budget)), [budget]);
  useEffect(() => localStorage.setItem("mealmate-expenses", JSON.stringify(expenses)), [expenses]);
  useEffect(() => {
    localStorage.setItem("mealmate-cal-target", JSON.stringify(calorieTarget));
    localStorage.setItem("mm-nutrition-targets", JSON.stringify(calorieTarget));
  }, [calorieTarget]);
  useEffect(() => localStorage.setItem("mealmate-serving-size", JSON.stringify(servingSize)), [servingSize]);
  useEffect(() => {
    localStorage.setItem("mealmate-nutrition", JSON.stringify(nutritionEntries));
    localStorage.setItem("mm-food-logs", JSON.stringify(nutritionEntries));
  }, [nutritionEntries]);
  useEffect(() => {
    localStorage.setItem("mealmate-nutrition-profile", JSON.stringify(nutritionProfile));
    localStorage.setItem("mm-nutrition-profile", JSON.stringify(nutritionProfile));
  }, [nutritionProfile]);
  useEffect(() => {
    localStorage.setItem("mealmate-custom-foods", JSON.stringify(customFoods));
    localStorage.setItem("mm-custom-foods", JSON.stringify(customFoods));
  }, [customFoods]);
  useEffect(() => localStorage.setItem("mealmate-feedback", JSON.stringify(feedbackEntries)), [feedbackEntries]);
  useEffect(() => {
    let active = true;
    if (!cloudAccountsEnabled || !userId || userId.startsWith("local-")) return () => { active = false; };
    fetchSubscriptionStatus()
      .then((status) => {
        if (active) {
          setVerifiedPlan({
            userId,
            plan: status.isPro ? "PRO" : "FREE",
            expiresAt: status.expiresAt
          });
        }
      })
      .catch(() => {
        if (active) setVerifiedPlan({ userId, plan: "FREE", expiresAt: null });
      });
    return () => { active = false; };
  }, [userId]);
  useEffect(() => {
      if (verifiedPlan.userId !== userId || verifiedPlan.plan !== "PRO") return undefined;
      const timer = window.setInterval(() => {
        const expiry = Date.parse(verifiedPlan.expiresAt);
        if (!Number.isFinite(expiry) || expiry <= Date.now()) {
          setVerifiedPlan((current) => (
            current.userId === userId ? { ...current, plan: "FREE" } : current
          ));
        }
      }, 60_000);
      return () => window.clearInterval(timer);
  }, [verifiedPlan, userId]);

  // Background Cloud Sync when user is authenticated
  useEffect(() => {
    if (cloudAccountsEnabled && user && user.id) {
      const payload = { meals, recipes, groceries, expenses, budget, favorites, calorieTarget, servingSize };
      syncUserDataToCloud(user.id, payload);
    }
  }, [meals, recipes, groceries, expenses, budget, favorites, calorieTarget, servingSize, user]);

  // Handle ESC key for closing modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setModal("");
        setMobileMenu(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
    try {
      localStorage.setItem("mealmate-theme", JSON.stringify(nextTheme));
    } catch {
      showNotification("Your browser could not save this preference. Check available storage and try again.");
    }
  };

  // Auth & Session Handlers
  const handleLoginSuccess = async (userObj) => {
    setVerifiedPlan({ userId: null, plan: "FREE", expiresAt: null });
    setUser(userObj);

    // Try fetching existing cloud state
    const cloudData = await fetchUserDataFromCloud(userObj.id);
    if (cloudData) {
      if (cloudData.meals) setMeals(clearLegacyDemoMealCalories(cloudData.meals));
      if (cloudData.recipes) setRecipes(normalizeRecipes(cloudData.recipes));
      if (cloudData.groceries) setGroceries(cloudData.groceries);
      if (cloudData.expenses) setExpenses(cloudData.expenses);
      if (cloudData.budget) setBudget(cloudData.budget);
      showNotification("Restored cloud workspace for " + userObj.name);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
    setVerifiedPlan({ userId: null, plan: "FREE", expiresAt: null });
    showNotification("Signed out of MealMate workspace.");
  };

  const openLegalModal = (tab = "terms") => {
    setLegalTab(tab);
    setLegalOpen(true);
  };

  const openPaymentModal = async (details) => {
    if (!paymentsEnabled) {
      showNotification("Subscriptions are not available during the free beta.");
      return;
    }
    if (!isSupabaseConfigured) {
      showNotification("Secure subscriptions are unavailable until the Supabase and Razorpay backend is configured.");
      return;
    }
    if (!user || userId?.startsWith("local-")) {
      showNotification("Sign in with a MealMate account before subscribing.");
      setModal("auth");
      return;
    }
    const billingCycle = details?.billingCycle || "annual";
    try {
      const order = await createSubscriptionOrder(billingCycle);
      setPaymentData({
        amount: order.amountPaise / 100,
        billingCycle: order.billingCycle,
        planName: details?.planName || "MealMate Pro",
        order
      });
      setPaymentOpen(true);
    } catch (error) {
      showNotification(error.message || "Secure subscription checkout is unavailable right now.");
    }
  };

  const handlePaymentSuccess = async (payment) => {
    const entitlement = await verifySubscriptionPayment(payment);
    if (!entitlement.isPro) {
      throw new Error("Payment has not been verified. Pro access remains locked.");
    }
    setVerifiedPlan({ userId, plan: "PRO", expiresAt: entitlement.expiresAt });
    try {
      const existingHistory = JSON.parse(localStorage.getItem("mealmate-payments") || "[]");
      const receipt = {
        paymentId: payment.paymentId,
        orderId: payment.orderId,
        amount: paymentData.amount,
        billingCycle: paymentData.billingCycle,
        date: new Date().toISOString()
      };
      localStorage.setItem("mealmate-payments", JSON.stringify([receipt, ...existingHistory]));
    } catch {
      // ignore
    }
    showNotification("Payment verified! MealMate Pro is active.");
    return payment;
  };

  // Week computation
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const weekRangeLabel = useMemo(() => {
    const start = weekDays[0];
    const end = weekDays[6];
    return `${prettyDate(start, { day: "numeric", month: "short" })} – ${prettyDate(end, { day: "numeric", month: "short", year: "numeric" })}`;
  }, [weekDays]);

  const prevWeek = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    setWeekStart(prev);
  };

  const nextWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
  };

  const resetToThisWeek = () => {
    setWeekStart(dayStart(today));
  };

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory = category === "All" || getRecipeCollections(recipe).includes(category);
      const ingStr = Array.isArray(recipe.ingredients) ? recipe.ingredients.join(" ") : "";
      const matchesSearch = `${recipe.title} ${recipe.description} ${ingStr}`.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [recipes, category, search]);

  // Aggregated stats
  const todayKey = dateKey(today);
  const todayMeals = meals.filter((meal) => meal.date === todayKey);
  const todayNutrition = useMemo(
    () => getDailyNutrition({ date: todayKey, today: todayKey, meals, nutritionEntries, recipes, customFoods }),
    [meals, nutritionEntries, recipes, customFoods, todayKey]
  );
  const weekMeals = meals.filter((meal) => weekDays.some((d) => dateKey(d) === meal.date));

  const currentMonthExpenses = useMemo(
    () => expensesInMonth(expenses, todayKey.slice(0, 7)),
    [expenses, todayKey]
  );
  const totalSpent = useMemo(
    () => currentMonthExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
    [currentMonthExpenses]
  );
  const completedGroceries = groceries.filter((item) => item.done).length;
  const groceryProgress = groceries.length > 0 ? Math.round((completedGroceries / groceries.length) * 100) : 0;
  const budgetPercent = budget > 0 ? Math.round((totalSpent / budget) * 100) : 0;
  const remainingBudget = Math.max(0, budget - totalSpent);

  // Meal Handlers
  const openNewMeal = (defaultDate = todayKey) => {
    const access = checkFeatureAccess("add_meal", userPlan, weekMeals.length);
    if (!access.allowed) {
      setUpgradeReason(access.reason);
      setModal("upgrade");
      return;
    }
    setUpgradeReason("");
    setEditingMeal(null);
    setMealForm({
      date: defaultDate,
      type: "Breakfast",
      title: "",
      time: "08:30",
      calories: "",
      protein: "",
      servings: "1",
      recipeId: "",
      eaten: false
    });
    setModal("meal");
  };

  const openEditMeal = (meal) => {
    setEditingMeal(meal);
    setMealForm({
      date: meal.date,
      type: meal.type,
      title: meal.title,
      time: meal.time,
      calories: meal.calories === null || meal.calories === undefined ? "" : String(meal.calories),
      protein: meal.protein === null || meal.protein === undefined ? "" : String(meal.protein),
      servings: String(meal.servings || 1),
      recipeId: meal.recipeId || "",
      eaten: Boolean(meal.eaten)
    });
    setModal("meal");
  };

  const selectMealRecipe = (recipeId) => {
    const recipe = recipes.find((item) => String(item.id) === String(recipeId));
    if (!recipe) {
      setMealForm((current) => ({ ...current, recipeId: "" }));
      return;
    }

    const recipeCategories = getRecipeCategories(recipe);
    const nutrition = getRecipeNutrition(recipe, customFoods);
    setMealForm((current) => ({
      ...current,
      recipeId: recipe.id,
      title: recipe.title,
      type: recipeCategories.includes(current.type) ? current.type : recipeCategories[0] || current.type,
      calories: nutrition.calories === null ? "" : String(nutrition.calories),
      protein: nutrition.protein === null ? "" : String(nutrition.protein)
    }));
  };

  const saveMeal = (e) => {
    e.preventDefault();
    const cleanTitle = sanitizeText(mealForm.title.trim());
    const calories = mealForm.calories === "" ? null : Number(mealForm.calories);
    const protein = mealForm.protein === "" ? null : Number(mealForm.protein);
    const servings = Number(mealForm.servings);
    if (!cleanTitle || !mealForm.date || (calories !== null && (!Number.isFinite(calories) || calories < 0))) return;
    if (protein !== null && (!Number.isFinite(protein) || protein < 0)) return;
    if (!Number.isFinite(servings) || servings <= 0 || servings > 50) return;

    if (editingMeal) {
      setMeals((prev) =>
        prev.map((m) =>
          m.id === editingMeal.id
            ? {
                ...m,
                ...mealForm,
                title: cleanTitle,
                calories,
                protein,
                servings,
                recipeId: mealForm.recipeId || "",
                eaten: Boolean(mealForm.eaten) && mealForm.date <= todayKey
              }
            : m
        )
      );
      showNotification("Meal updated successfully!");
    } else {
      const newMeal = {
        id: Date.now(),
        ...mealForm,
        title: cleanTitle,
        calories,
        protein,
        servings,
        recipeId: mealForm.recipeId || "",
        eaten: Boolean(mealForm.eaten) && mealForm.date <= todayKey
      };
      setMeals((prev) => [...prev, newMeal]);
      showNotification("Meal added to your schedule!");
    }
    setModal("");
  };

  const deleteMeal = (id) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
    showNotification("Meal removed.");
  };

  const toggleMealEaten = (id) => {
    const meal = meals.find((item) => String(item.id) === String(id));
    if (!meal) return;
    if (meal.date > todayKey) {
      showNotification("A future planned meal cannot be marked as eaten yet.");
      return;
    }
    setMeals((prev) => prev.map((item) => (
      String(item.id) === String(id) ? { ...item, eaten: !item.eaten } : item
    )));
    showNotification(meal.eaten ? "Meal removed from your food log." : "Meal marked as eaten and added to Smart Nutrition Calculator.");
  };

  // Recipe Handlers
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const openRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setModal("recipeDetail");
  };

  const addRecipeToPlan = (recipe) => {
    const access = checkFeatureAccess("add_meal", userPlan, weekMeals.length);
    if (!access.allowed) {
      setUpgradeReason(access.reason);
      setModal("upgrade");
      return;
    }
    setUpgradeReason("");
    setEditingMeal(null);
    const nutrition = getRecipeNutrition(recipe, customFoods);
    setMealForm({
      date: dateKey(today),
      type: getRecipeCategories(recipe)[0] || "Dinner",
      title: recipe.title,
      time: "19:30",
      calories: nutrition.calories === null ? "" : String(nutrition.calories),
      protein: nutrition.protein === null ? "" : String(nutrition.protein),
      servings: "1",
      recipeId: recipe.id,
      eaten: false
    });
    setModal("meal");
  };

  const saveNutritionFood = (payload) => {
    if (payload.kind === "recipe") {
      const recipe = recipes.find((item) => String(item.id) === String(payload.recipeId));
      if (!recipe || payload.date > todayKey) {
        showNotification("Choose a recipe and a date that has already happened.");
        return;
      }

      const existingMeal = meals.find((meal) =>
        meal.date === payload.date
        && meal.type === payload.mealType
        && String(meal.recipeId) === String(recipe.id)
      );
      if (existingMeal?.eaten) {
        showNotification("This recipe is already in your food log for that meal. Edit its servings to adjust the amount.");
        setPage("Smart Nutrition Calculator");
        return;
      }

      const nutrition = getRecipeNutrition(recipe, customFoods);
      const mealData = {
        title: recipe.title,
        date: payload.date,
        type: payload.mealType,
        time: "12:00",
        recipeId: recipe.id,
        calories: nutrition.calories,
        protein: nutrition.protein,
        servings: payload.servings,
        eaten: true
      };

      if (existingMeal) {
        setMeals((previous) => previous.map((meal) => (
          String(meal.id) === String(existingMeal.id) ? { ...meal, ...mealData } : meal
        )));
      } else {
        setMeals((previous) => [...previous, { id: Date.now(), ...mealData }]);
      }
      showNotification("Recipe logged as eaten and included in Smart Nutrition Calculator.");
      return;
    }

    const name = sanitizeText(payload.name.trim());
    const calories = payload.calories === null || payload.calories === "" || payload.calories === undefined
      ? null
      : Number(payload.calories);
    const protein = payload.protein === null ? null : Number(payload.protein);
    if (!name || payload.date > todayKey || (calories !== null && (!Number.isFinite(calories) || calories < 0))) {
      showNotification("Enter a food name, valid nutrition values, and a past or current date.");
      return;
    }
    if (protein !== null && (!Number.isFinite(protein) || protein < 0)) {
      showNotification("Protein must be a non-negative number or left blank.");
      return;
    }
    const servings = Number(payload.servings);
    if (!Number.isFinite(servings) || servings <= 0 || servings > 50) {
      showNotification("Servings must be between 0 and 50.");
      return;
    }

    const entry = {
      id: payload.id || Date.now(),
      name,
      date: payload.date,
      mealType: payload.mealType,
      servings,
      servingDescription: sanitizeText(payload.servingDescription || ""),
      calories,
      protein,
      foodId: typeof payload.foodId === "string" ? payload.foodId : "",
      grams: Number.isFinite(Number(payload.grams)) && Number(payload.grams) > 0 ? Number(payload.grams) : null,
      nutritionSource: sanitizeText(payload.nutritionSource || "")
    };

    setNutritionEntries((previous) => payload.id
      ? previous.map((item) => String(item.id) === String(payload.id) ? entry : item)
      : [...previous, entry]);
    showNotification(payload.id
      ? "Food entry updated."
      : payload.savedForReuse
        ? "Food logged and reusable food saved."
        : payload.reuseSaveFailed
          ? "Food logged, but a reusable food with that name already exists."
        : "Food added to your nutrition log.");
  };

  const saveCustomFood = (food) => {
    const normalized = normalizeCustomFoods([{
      ...food,
      id: `custom-food-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    }])[0];
    if (!normalized) {
      showNotification("Enter a food name and valid nutrition values per 100 g.");
      return false;
    }
    if (customFoods.some((item) => item.name.toLowerCase() === normalized.name.toLowerCase())) {
      showNotification("A saved food with that name already exists.");
      return false;
    }
    setCustomFoods((previous) => [normalized, ...previous].slice(0, 500));
    return true;
  };

  const deleteNutritionFood = (id) => {
    setNutritionEntries((previous) => previous.filter((entry) => String(entry.id) !== String(id)));
    showNotification("Food entry removed from your nutrition log.");
  };

  const saveFeedback = ({ type, rating, message }) => {
    const cleanMessage = sanitizeText(String(message || "").trim());
    if (!["general", "idea", "bug"].includes(type) || cleanMessage.length < 10 || cleanMessage.length > 1000) {
      showNotification("Please enter feedback between 10 and 1,000 characters.");
      return;
    }
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      rating: Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : null,
      message: cleanMessage,
      createdAt: new Date().toISOString()
    };
    setFeedbackEntries((previous) => [entry, ...previous].slice(0, 100));
    showNotification("Feedback saved in this browser. It has not been sent to the team.");
  };

  const deleteFeedback = (id) => {
    setFeedbackEntries((previous) => previous.filter((entry) => entry.id !== id));
  };

  const mergeIngredientsIntoGroceries = (ingredientNames) => {
    const existingNames = new Set(groceries.map((g) => g.name.trim().toLowerCase()));
    const uniqueToAdd = [];

    ingredientNames.forEach((raw) => {
      const clean = sanitizeText(String(raw).trim());
      if (!clean) return;
      const key = clean.toLowerCase();
      if (!existingNames.has(key)) {
        existingNames.add(key);
        uniqueToAdd.push({
          id: Date.now() + uniqueToAdd.length,
          name: clean,
          amount: "1 portion",
          category: "Produce",
          done: false
        });
      }
    });

    if (uniqueToAdd.length > 0) {
      setGroceries((prev) => [...prev, ...uniqueToAdd]);
    }
    return uniqueToAdd.length;
  };

  const addIngredientsToGroceries = (recipe) => {
    if (!recipe.ingredients || recipe.ingredients.length === 0) return;
    const addedCount = mergeIngredientsIntoGroceries(recipe.ingredients);
    if (addedCount > 0) {
      showNotification(`Added ${addedCount} new ingredients to your grocery checklist!`);
    } else {
      showNotification("Those ingredients are already in your grocery checklist.");
    }
  };

  const syncWeekToGroceries = () => {
    if (weekMeals.length === 0) {
      showNotification("No meals scheduled for this week yet.");
      return;
    }

    const matchedIngredients = [];
    weekMeals.forEach((meal) => {
      const matchedRecipe = recipes.find(
        (r) =>
          (meal.recipeId && String(r.id) === String(meal.recipeId)) ||
          r.title.trim().toLowerCase() === meal.title.trim().toLowerCase()
      );
      if (matchedRecipe?.ingredients?.length) {
        matchedIngredients.push(...matchedRecipe.ingredients);
      }
    });

    if (matchedIngredients.length === 0) {
      showNotification("Link meals from your Recipe Library to auto-sync ingredients.");
      return;
    }

    const addedCount = mergeIngredientsIntoGroceries(matchedIngredients);
    if (addedCount > 0) {
      showNotification(`Synced ${addedCount} ingredients from this week's meals!`);
    } else {
      showNotification("All ingredients for this week are already in your grocery list.");
    }
  };

  const openNewRecipe = () => {
    const customRecipeCount = recipes.filter(
      (recipe) => !starterRecipes.some((starter) => starter.id === recipe.id)
    ).length;
    const access = checkFeatureAccess("add_recipe", userPlan, customRecipeCount);
    if (!access.allowed) {
      setUpgradeReason(access.reason);
      setModal("upgrade");
      return;
    }
    setUpgradeReason("");
    setEditingRecipe(null);
    setRecipeForm(blankRecipe);
    setModal("recipe");
  };

  const saveRecipe = (e) => {
    e.preventDefault();
    const cleanTitle = sanitizeText(recipeForm.title.trim());
    if (!cleanTitle) return;

    const ingList = typeof recipeForm.ingredients === "string"
      ? recipeForm.ingredients.split("\n").map(s => sanitizeText(s.trim())).filter(Boolean)
      : recipeForm.ingredients.map(s => sanitizeText(s));

    const instList = typeof recipeForm.instructions === "string"
      ? recipeForm.instructions.split("\n").map(s => sanitizeText(s.trim())).filter(Boolean)
      : recipeForm.instructions.map(s => sanitizeText(s));

    const selectedCategories = getRecipeCategories(recipeForm)
      .filter((recipeCategory) => categories.includes(recipeCategory) && recipeCategory !== "All");
    if (selectedCategories.length === 0) {
      showNotification("Choose at least one meal category for this recipe.");
      return;
    }

    let calories = recipeForm.calories === "" ? null : Number(recipeForm.calories);
    let protein = recipeForm.protein === "" || recipeForm.protein === null || recipeForm.protein === undefined
      ? null
      : Number(recipeForm.protein);
    if (calories !== null && (!Number.isFinite(calories) || calories < 0)) {
      showNotification("Calories must be a non-negative number or left blank.");
      return;
    }
    if (protein !== null && (!Number.isFinite(protein) || protein < 0)) {
      showNotification("Protein must be a non-negative number or left blank.");
      return;
    }

    const servings = Number(recipeForm.servings) || 1;
    if (!Number.isFinite(servings) || servings <= 0 || servings > 50) {
      showNotification("Recipe servings must be between 0 and 50.");
      return;
    }
    const nutritionIngredients = Array.isArray(recipeForm.nutritionIngredients)
      ? recipeForm.nutritionIngredients
      : [];
    const groceryIngredients = nutritionIngredients.flatMap((ingredient) => {
      const food = getFoodComposition(ingredient.foodId, customFoods);
      return food ? [`${food.name} — ${ingredient.grams} g`] : [];
    });
    const allIngredients = [...new Set([...ingList, ...groceryIngredients])];
    const ingredientNutrition = calculateRecipeIngredientNutrition(nutritionIngredients, servings, customFoods);
    if (nutritionIngredients.length > 0 && !ingredientNutrition) {
      showNotification("Remove invalid nutrition ingredients or choose foods from the nutrition database.");
      return;
    }
    if (ingredientNutrition) {
      calories = Math.round(ingredientNutrition.caloriesPerServing);
      protein = Math.round(ingredientNutrition.proteinPerServing * 10) / 10;
    }

    const payload = {
      title: cleanTitle,
      category: selectedCategories[0],
      categories: selectedCategories,
      dietaryTags: Array.isArray(recipeForm.dietaryTags)
        ? recipeForm.dietaryTags.filter((tag) => ["vegetarian", "vegan", "non-vegetarian"].includes(tag))
        : [],
      time: Number(recipeForm.time) || 15,
      calories,
      protein,
      servings,
      nutritionIngredients,
      nutritionSource: ingredientNutrition
        ? ingredientNutrition.hasUserEnteredFood ? "USDA and user-entered ingredient estimate" : "USDA ingredient estimate"
        : "User-entered or legacy estimate",
      description: sanitizeText(recipeForm.description.trim()) || "A delicious homemade recipe.",
      image: recipeForm.image.trim() || "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900",
      ingredients: allIngredients.length ? allIngredients : ["Fresh ingredients"],
      instructions: instList.length ? instList : ["Prepare and enjoy!"]
    };

    if (editingRecipe) {
      setRecipes((prev) => prev.map((r) => (r.id === editingRecipe.id ? { ...r, ...payload } : r)));
      showNotification("Recipe updated!");
    } else {
      setRecipes((prev) => [...prev, { id: Date.now(), ...payload }]);
      showNotification("New recipe created!");
    }
    setModal("");
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    showNotification("Recipe deleted.");
  };

  // Grocery Handlers (Add + Edit)
  const openNewGrocery = () => {
    setEditingGrocery(null);
    setGroceryForm({ name: "", amount: "1 pack", category: "Produce" });
    setModal("grocery");
  };

  const openEditGrocery = (item) => {
    setEditingGrocery(item);
    setGroceryForm({ name: item.name, amount: item.amount, category: item.category });
    setModal("grocery");
  };

  const saveGroceryItem = (e) => {
    e.preventDefault();
    const cleanName = sanitizeText(groceryForm.name.trim());
    const cleanAmt = sanitizeText(groceryForm.amount.trim()) || "1 item";
    if (!cleanName) return;

    if (editingGrocery) {
      setGroceries((prev) =>
        prev.map((g) =>
          g.id === editingGrocery.id
            ? { ...g, name: cleanName, amount: cleanAmt, category: groceryForm.category }
            : g
        )
      );
      showNotification("Grocery item updated!");
    } else {
      const newItem = {
        id: Date.now(),
        name: cleanName,
        amount: cleanAmt,
        category: groceryForm.category || "Produce",
        done: false
      };
      setGroceries((prev) => [...prev, newItem]);
      showNotification("Added item to grocery list!");
    }

    setGroceryForm({ name: "", amount: "1 pack", category: "Produce" });
    setModal("");
  };

  const toggleGroceryDone = (id) => {
    setGroceries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const deleteGrocery = (id) => {
    setGroceries((prev) => prev.filter((item) => item.id !== id));
    showNotification("Item removed.");
  };

  const clearCompletedGroceries = () => {
    setGroceries((prev) => prev.filter((item) => !item.done));
    showNotification("Cleared completed grocery items.");
  };

  // Expense Handlers (Add + Edit)
  const openNewExpense = () => {
    setEditingExpense(null);
    setExpenseForm({ title: "", amount: "", category: "Groceries", date: dateKey(today) });
    setModal("expense");
  };

  const openEditExpense = (expense) => {
    setEditingExpense(expense);
    setExpenseForm({
      title: expense.title,
      amount: String(expense.amount),
      category: expense.category,
      date: expense.date || dateKey(today)
    });
    setModal("expense");
  };

  const saveExpenseItem = (e) => {
    e.preventDefault();
    const cleanTitle = sanitizeText(expenseForm.title.trim());
    const amt = Number(expenseForm.amount);
    if (!cleanTitle || amt <= 0) return;

    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === editingExpense.id
            ? {
                ...exp,
                title: cleanTitle,
                amount: amt,
                category: expenseForm.category || "Groceries",
                date: expenseForm.date || dateKey(today)
              }
            : exp
        )
      );
      showNotification("Expense updated!");
    } else {
      const newExp = {
        id: Date.now(),
        title: cleanTitle,
        amount: amt,
        category: expenseForm.category || "Groceries",
        date: expenseForm.date || dateKey(today)
      };
      setExpenses((prev) => [newExp, ...prev]);
      showNotification("Expense recorded!");
    }

    setExpenseForm({ title: "", amount: "", category: "Groceries", date: dateKey(today) });
    setModal("");
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    showNotification("Expense removed.");
  };

  // Data Export & Backup
  const exportData = () => {
    const backup = {
      mealmate_version: "2.0",
      export_date: new Date().toISOString(),
      meals,
      recipes,
      groceries,
      expenses,
      budget,
      favorites,
      calorieTarget,
      servingSize,
      nutritionEntries,
      nutritionProfile,
      customFoods,
      feedbackEntries,
      theme
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mealmate-backup-${dateKey(today)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification("Backup downloaded successfully!");
  };

  const importData = (data) => {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      showNotification("Invalid backup format.");
      return;
    }

    const isRecord = (value) => value && typeof value === "object" && !Array.isArray(value);
    const isArrayOf = (key, predicate) =>
      data[key] === undefined || (Array.isArray(data[key]) && data[key].every(predicate));
    const validMeals = isArrayOf("meals", (item) =>
      isRecord(item) && typeof item.title === "string" &&
      typeof item.date === "string" && typeof item.type === "string"
    );
    const validRecipes = isArrayOf("recipes", (item) =>
      isRecord(item) && typeof item.title === "string" &&
      Array.isArray(item.ingredients) && item.ingredients.every((ingredient) => typeof ingredient === "string") &&
      Array.isArray(item.instructions) && item.instructions.every((instruction) => typeof instruction === "string") &&
      (item.calories == null || item.calories === "" ||
        (Number.isFinite(Number(item.calories)) && Number(item.calories) >= 0)) &&
      (item.protein == null || item.protein === "" ||
        (Number.isFinite(Number(item.protein)) && Number(item.protein) >= 0)) &&
      (item.servings == null ||
        (Number.isFinite(Number(item.servings)) && Number(item.servings) > 0 && Number(item.servings) <= 50)) &&
      (item.nutritionIngredients === undefined ||
        (Array.isArray(item.nutritionIngredients) && item.nutritionIngredients.every((ingredient) =>
          isRecord(ingredient) &&
          (typeof ingredient.foodId === "string" || typeof ingredient.foodId === "number") &&
          Number.isFinite(Number(ingredient.grams)) && Number(ingredient.grams) > 0
        ))) &&
      (item.nutritionSource === undefined || item.nutritionSource === null ||
        typeof item.nutritionSource === "string")
    );
    const validGroceries = isArrayOf("groceries", (item) =>
      isRecord(item) && typeof item.name === "string"
    );
    const validExpenses = isArrayOf("expenses", (item) =>
      isRecord(item) && typeof item.title === "string" &&
      Number.isFinite(Number(item.amount))
    );
    const validNutritionEntries = isArrayOf("nutritionEntries", (item) => isRecord(item));
    const validFeedbackEntries = isArrayOf("feedbackEntries", (item) => isRecord(item));
    const validCustomFoods = isArrayOf("customFoods", (item) => isRecord(item));
    const validFavorites = isArrayOf("favorites", (id) => id !== null && id !== undefined);
    const validNutritionProfile =
      data.nutritionProfile === undefined || isRecord(data.nutritionProfile);
    const validTheme = data.theme === undefined || ["light", "dark"].includes(data.theme);
    const validScalars =
      (data.budget === undefined || (Number.isFinite(data.budget) && data.budget >= 0)) &&
      (data.calorieTarget === undefined || data.calorieTarget === null ||
        (Number.isFinite(data.calorieTarget) && data.calorieTarget > 0)) &&
      (data.servingSize === undefined || [1, 2, 4, 6].includes(data.servingSize));

    if (!validMeals || !validRecipes || !validGroceries || !validExpenses ||
      !validNutritionEntries || !validFeedbackEntries || !validCustomFoods ||
      !validFavorites || !validNutritionProfile || !validTheme || !validScalars ||
      (Array.isArray(data.nutritionEntries) &&
        normalizeNutritionEntries(data.nutritionEntries).length !== data.nutritionEntries.length) ||
      (Array.isArray(data.feedbackEntries) &&
        normalizeFeedbackEntries(data.feedbackEntries).length !== data.feedbackEntries.length) ||
      (Array.isArray(data.customFoods) &&
        normalizeCustomFoods(data.customFoods).length !== data.customFoods.length)) {
      showNotification("Backup contains invalid or corrupted workspace data.");
      return;
    }

    if (Array.isArray(data.meals)) setMeals(clearLegacyDemoMealCalories(data.meals));
    if (Array.isArray(data.recipes)) setRecipes(normalizeRecipes(data.recipes));
    if (Array.isArray(data.groceries)) setGroceries(data.groceries);
    if (Array.isArray(data.expenses)) setExpenses(data.expenses);
    if (typeof data.budget === "number") setBudget(data.budget);
    if (Array.isArray(data.favorites)) setFavorites(data.favorites);
    if (typeof data.calorieTarget === "number" || data.calorieTarget === null) setCalorieTarget(data.calorieTarget);
    if (typeof data.servingSize === "number") setServingSize(data.servingSize);
    if (Array.isArray(data.nutritionEntries)) setNutritionEntries(normalizeNutritionEntries(data.nutritionEntries));
    if (Array.isArray(data.feedbackEntries)) setFeedbackEntries(normalizeFeedbackEntries(data.feedbackEntries));
    if (Array.isArray(data.customFoods)) setCustomFoods(normalizeCustomFoods(data.customFoods));
    if (data.theme === "light" || data.theme === "dark") handleThemeChange(data.theme);
    if (data.nutritionProfile) setNutritionProfile(normalizeNutritionProfile(data.nutritionProfile));

    showNotification("Workspace data restored successfully!");
  };

  const resetToDemoData = () => {
    if (window.confirm("Are you sure you want to restore default demo recipes, meals, and budget?")) {
      setMeals(initialMeals);
      setRecipes(normalizeRecipes(starterRecipes));
      setGroceries(initialGroceries);
      setExpenses(initialExpenses);
      setBudget(8000);
      setFavorites([1, 5]);
      setCalorieTarget(null);
      setServingSize(2);
      setNutritionEntries([]);
      setNutritionProfile(defaultNutritionProfile);
      setCustomFoods([]);
      showNotification("Reset to initial demo data.");
    }
  };

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Meal Planner", icon: CalendarDays },
    { name: "Recipes", icon: BookOpen },
    { name: "Smart Nutrition Calculator", icon: Activity },
    { name: "Groceries", icon: ShoppingBasket, count: groceries.filter(g => !g.done).length },
    { name: "Budget", icon: Wallet },
    { name: "Analytics", icon: BarChart3 },
    { name: "Pricing", icon: Crown },
    { name: "Feedback", icon: MessageSquare },
    { name: "Settings", icon: Settings }
  ];

  // LANDING PAGE VIEW
  if (!started) {
    return (
      <>
        <LandingPage
          onStart={() => setStarted(true)}
          onOpenLegal={openLegalModal}
          previewMeals={initialMeals}
        />
        <Suspense fallback={null}>
          <LegalModal
            key={legalOpen ? legalTab : "legal-closed"}
            isOpen={legalOpen}
            onClose={() => setLegalOpen(false)}
            initialTab={legalTab}
          />
        </Suspense>
      </>
    );
  }

  // APP SHELL VIEW
  return (
    <div className="app-shell">
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 100,
          background: "#26382d",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
          fontSize: "12px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          animation: "modalIn 0.2s ease"
        }}>
          <Sparkles size={16} color="#8eaa88" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        page={page}
        setPage={setPage}
        navigation={navigation}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        user={user}
        userPlan={userPlan}
        accountAccessEnabled={cloudAccountsEnabled}
        paymentsEnabled={paymentsEnabled}
        onOpenAuth={() => setModal("auth")}
        onOpenUpgrade={() => setModal("upgrade")}
        onSignOut={handleSignOut}
      />

      {/* Main Area */}
      <main className="main-area">
        {/* Top Header */}
        <Topbar
          page={page}
          today={today}
          theme={theme}
          setTheme={handleThemeChange}
          user={user}
          accountAccessEnabled={cloudAccountsEnabled}
          onOpenAuth={() => setModal("auth")}
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
          showNotification={showNotification}
        />

        {/* View Router */}
        <div className="page-content">
          {page === "Dashboard" && (
            <DashboardView
              today={today}
              todayKey={todayKey}
              weekMeals={weekMeals}
              todayMeals={todayMeals}
              nutritionTotals={todayNutrition}
              onToggleMealEaten={toggleMealEaten}
              groceries={groceries}
              completedGroceries={completedGroceries}
              groceryProgress={groceryProgress}
              totalSpent={totalSpent}
              remainingBudget={remainingBudget}
              starterRecipe={recipes[0]}
              customFoods={customFoods}
              iconForMeal={iconForMeal}
              onOpenNewMeal={openNewMeal}
              onOpenEditMeal={openEditMeal}
              onOpenRecipeDetails={openRecipeDetails}
              onNavigate={setPage}
            />
          )}

          <Suspense fallback={<div className="empty-state"><p>Loading view...</p></div>}>
            {page === "Meal Planner" && (
              <MealPlannerView
                weekDays={weekDays}
                todayKey={todayKey}
                weekRangeLabel={weekRangeLabel}
                meals={meals}
                onPrevWeek={prevWeek}
                onNextWeek={nextWeek}
                onResetToThisWeek={resetToThisWeek}
                onOpenNewMeal={openNewMeal}
                onOpenEditMeal={openEditMeal}
                onDeleteMeal={deleteMeal}
                onToggleMealEaten={toggleMealEaten}
                onSyncWeekToGroceries={syncWeekToGroceries}
              />
            )}

          {page === "Recipes" && (
            <RecipesView
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              filteredRecipes={filteredRecipes}
              favorites={favorites}
              customFoods={customFoods}
              onToggleFavorite={toggleFavorite}
              onOpenNewRecipe={openNewRecipe}
              onOpenRecipeDetails={openRecipeDetails}
              onAddRecipeToPlan={addRecipeToPlan}
            />
          )}

          {page === "Smart Nutrition Calculator" && (
            <NutritionTracker
              todayKey={todayKey}
              meals={meals}
              nutritionEntries={nutritionEntries}
              recipes={recipes}
              groceries={groceries}
              calorieTarget={calorieTarget}
              setCalorieTarget={setCalorieTarget}
              nutritionProfile={nutritionProfile}
              setNutritionProfile={setNutritionProfile}
              customFoods={customFoods}
              onSaveCustomFood={saveCustomFood}
              onSaveFood={saveNutritionFood}
              onDeleteFood={deleteNutritionFood}
              onEditMeal={(id) => {
                const meal = meals.find((item) => String(item.id) === String(id));
                if (meal) openEditMeal(meal);
              }}
              onDeleteMeal={deleteMeal}
              onToggleMealEaten={toggleMealEaten}
              showNotification={showNotification}
            />
          )}

          {page === "Groceries" && (
            <GroceriesView
              groceries={groceries}
              completedGroceries={completedGroceries}
              groceryProgress={groceryProgress}
              onToggleGroceryDone={toggleGroceryDone}
              onDeleteGrocery={deleteGrocery}
              onClearCompletedGroceries={clearCompletedGroceries}
              onOpenGroceryModal={openNewGrocery}
              onOpenEditGrocery={openEditGrocery}
              onNavigate={setPage}
              showNotification={showNotification}
            />
          )}

          {page === "Budget" && (
            <BudgetView
              budget={budget}
              setBudget={setBudget}
              totalSpent={totalSpent}
              remainingBudget={remainingBudget}
              budgetPercent={budgetPercent}
              expenses={currentMonthExpenses}
              onDeleteExpense={deleteExpense}
              onOpenExpenseModal={openNewExpense}
              onOpenEditExpense={openEditExpense}
            />
          )}

          {page === "Analytics" && (
            <AnalyticsView
              meals={meals}
              recipes={recipes}
              groceries={groceries}
              expenses={currentMonthExpenses}
              budget={budget}
              totalSpent={totalSpent}
            />
          )}

          {page === "Pricing" && (
            <PricingView
              userPlan={userPlan}
              planExpiresAt={verifiedPlan.userId === userId ? verifiedPlan.expiresAt : null}
              paymentsEnabled={paymentsEnabled}
            />
          )}

          {page === "Feedback" && (
            <FeedbackView
              entries={feedbackEntries}
              onSubmit={saveFeedback}
              onDelete={deleteFeedback}
            />
          )}

          {page === "Settings" && (
            <SettingsView
              theme={theme}
              setTheme={handleThemeChange}
              calorieTarget={calorieTarget}
              setCalorieTarget={setCalorieTarget}
              servingSize={servingSize}
              setServingSize={setServingSize}
              onExportData={exportData}
              onImportData={importData}
              onResetData={resetToDemoData}
              showNotification={showNotification}
            />
          )}
          </Suspense>
        </div>

        {/* Footer */}
        <footer className="app-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span>MealMate © 2026 · Eat better. Live brighter.</span>
          <LegalLinks onOpenLegal={openLegalModal} className="app-footer-links" />
          <span>Made with care <b>♥</b> for healthy living.</span>
        </footer>
      </main>

      {/* Modals */}
      <Suspense fallback={null}>
        <MealModal
          isOpen={modal === "meal"}
          onClose={() => setModal("")}
          editingMeal={editingMeal}
          recipes={recipes}
          todayKey={todayKey}
          mealForm={mealForm}
          setMealForm={setMealForm}
          onSelectRecipe={selectMealRecipe}
          onSave={saveMeal}
        />

        <RecipeModal
          isOpen={modal === "recipe"}
          onClose={() => setModal("")}
          editingRecipe={editingRecipe}
          recipeForm={recipeForm}
          setRecipeForm={setRecipeForm}
          customFoods={customFoods}
          onSave={saveRecipe}
        />

        <RecipeDetailModal
          isOpen={modal === "recipeDetail"}
          onClose={() => setModal("")}
          selectedRecipe={selectedRecipe}
          customFoods={customFoods}
          isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.id) : false}
          onToggleFavorite={toggleFavorite}
          onAddIngredientsToGroceries={addIngredientsToGroceries}
          onAddRecipeToPlan={addRecipeToPlan}
          onDeleteRecipe={deleteRecipe}
        />

        <GroceryModal
          isOpen={modal === "grocery"}
          onClose={() => setModal("")}
          editingGrocery={editingGrocery}
          groceryForm={groceryForm}
          setGroceryForm={setGroceryForm}
          onSave={saveGroceryItem}
        />

        <ExpenseModal
          isOpen={modal === "expense"}
          onClose={() => setModal("")}
          editingExpense={editingExpense}
          expenseForm={expenseForm}
          setExpenseForm={setExpenseForm}
          onSave={saveExpenseItem}
        />

        <AuthModal
          isOpen={modal === "auth"}
          onClose={() => setModal("")}
          onLoginSuccess={handleLoginSuccess}
          showNotification={showNotification}
          accountCreationEnabled={accountCreationEnabled}
          accountAccessEnabled={cloudAccountsEnabled}
        />

        <UpgradeModal
          isOpen={modal === "upgrade"}
          onClose={() => setModal("")}
          onOpenPayment={openPaymentModal}
          upgradeReason={upgradeReason}
          onNavigateToPricing={() => setPage("Pricing")}
          showNotification={showNotification}
        />

        <LegalModal
          key={legalOpen ? legalTab : "legal-closed"}
          isOpen={legalOpen}
          onClose={() => setLegalOpen(false)}
          initialTab={legalTab}
        />

        <PaymentModal
          key={paymentOpen ? `${paymentData.billingCycle}-${paymentData.amount}` : "payment-closed"}
          isOpen={paymentOpen && paymentsEnabled}
          onClose={() => setPaymentOpen(false)}
          planName={paymentData.planName}
          billingCycle={paymentData.billingCycle}
          amount={paymentData.amount}
          order={paymentData.order}
          userEmail={user?.email || "user@mealmate.app"}
          userName={user?.name || "MealMate User"}
          onPaymentSuccess={handlePaymentSuccess}
          showNotification={showNotification}
        />
      </Suspense>
    </div>
  );
}
