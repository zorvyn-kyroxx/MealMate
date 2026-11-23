import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, CalendarDays, BookOpen, ShoppingBasket, Wallet,
  BarChart3, Settings, Crown, Sparkles
} from "lucide-react";
import "./App.css";

// Utilities & Initial Data
import { dayStart, dateKey, prettyDate, readStore } from "./utils/dateUtils";
import {
  today, starterRecipes, initialMeals, initialGroceries, initialExpenses,
  iconForMeal, blankRecipe
} from "./constants/initialData";

// Supabase Cloud Sync Service
import {
  syncUserDataToCloud, fetchUserDataFromCloud, signOutUser
} from "./services/supabaseClient";

// Components
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardView from "./components/DashboardView";
import MealPlannerView from "./components/MealPlannerView";
import RecipesView from "./components/RecipesView";
import GroceriesView from "./components/GroceriesView";
import BudgetView from "./components/BudgetView";
import AnalyticsView from "./components/AnalyticsView";
import SettingsView from "./components/SettingsView";
import PricingView from "./components/PricingView";

// Modals
import MealModal from "./components/Modals/MealModal";
import RecipeModal from "./components/Modals/RecipeModal";
import RecipeDetailModal from "./components/Modals/RecipeDetailModal";
import GroceryModal from "./components/Modals/GroceryModal";
import ExpenseModal from "./components/Modals/ExpenseModal";
import AuthModal from "./components/Modals/AuthModal";
import UpgradeModal from "./components/Modals/UpgradeModal";

export default function App() {
  const [started, setStarted] = useState(() => readStore("mealmate-started", false));
  const [page, setPage] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [theme, setTheme] = useState(() => readStore("mealmate-theme", "light"));

  // User session & Plan
  const [user, setUser] = useState(() => readStore("mealmate-user", null));
  const [userPlan, setUserPlan] = useState(() => readStore("mealmate-plan", "FREE"));

  // Workspace Data
  const [meals, setMeals] = useState(() => readStore("mealmate-meals", initialMeals));
  const [recipes, setRecipes] = useState(() => readStore("mealmate-recipes", starterRecipes));
  const [groceries, setGroceries] = useState(() => readStore("mealmate-groceries", initialGroceries));
  const [favorites, setFavorites] = useState(() => readStore("mealmate-favorites", [1, 5]));
  const [budget, setBudget] = useState(() => readStore("mealmate-budget", 8000));
  const [expenses, setExpenses] = useState(() => readStore("mealmate-expenses", initialExpenses));
  const [calorieTarget, setCalorieTarget] = useState(() => readStore("mealmate-cal-target", 2000));
  const [servingSize, setServingSize] = useState(() => readStore("mealmate-serving-size", 2));

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
    calories: "350",
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
    localStorage.setItem("mealmate-theme", JSON.stringify(theme));
  }, [theme]);

  // Sync to LocalStorage
  useEffect(() => localStorage.setItem("mealmate-started", JSON.stringify(started)), [started]);
  useEffect(() => localStorage.setItem("mealmate-user", JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem("mealmate-plan", JSON.stringify(userPlan)), [userPlan]);
  useEffect(() => localStorage.setItem("mealmate-meals", JSON.stringify(meals)), [meals]);
  useEffect(() => localStorage.setItem("mealmate-recipes", JSON.stringify(recipes)), [recipes]);
  useEffect(() => localStorage.setItem("mealmate-groceries", JSON.stringify(groceries)), [groceries]);
  useEffect(() => localStorage.setItem("mealmate-favorites", JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem("mealmate-budget", JSON.stringify(budget)), [budget]);
  useEffect(() => localStorage.setItem("mealmate-expenses", JSON.stringify(expenses)), [expenses]);
  useEffect(() => localStorage.setItem("mealmate-cal-target", JSON.stringify(calorieTarget)), [calorieTarget]);
  useEffect(() => localStorage.setItem("mealmate-serving-size", JSON.stringify(servingSize)), [servingSize]);

  // Background Cloud Sync when user is authenticated
  useEffect(() => {
    if (user && user.id) {
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

  // Auth & Session Handlers
  const handleLoginSuccess = async (userObj) => {
    setUser(userObj);
    if (userObj.plan) setUserPlan(userObj.plan);

    // Try fetching existing cloud state
    const cloudData = await fetchUserDataFromCloud(userObj.id);
    if (cloudData) {
      if (cloudData.meals) setMeals(cloudData.meals);
      if (cloudData.recipes) setRecipes(cloudData.recipes);
      if (cloudData.groceries) setGroceries(cloudData.groceries);
      if (cloudData.expenses) setExpenses(cloudData.expenses);
      if (cloudData.budget) setBudget(cloudData.budget);
      showNotification("Restored cloud workspace for " + userObj.name);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
    showNotification("Signed out of MealMate workspace.");
  };

  const handleUpgradeToPro = () => {
    setUserPlan("PRO");
    if (user) {
      setUser({ ...user, plan: "PRO" });
    }
    showNotification("🎉 Upgraded to MealMate Pro!");
  };

  const handleDowngradeToFree = () => {
    setUserPlan("FREE");
    if (user) {
      setUser({ ...user, plan: "FREE" });
    }
    showNotification("Switched to Starter Plan.");
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
      const matchesCategory = category === "All" || recipe.category === category;
      const ingStr = Array.isArray(recipe.ingredients) ? recipe.ingredients.join(" ") : "";
      const matchesSearch = `${recipe.title} ${recipe.description} ${ingStr}`.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [recipes, category, search]);

  // Aggregated stats
  const todayKey = dateKey(today);
  const todayMeals = meals.filter((meal) => meal.date === todayKey);
  const todayCalories = todayMeals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0);
  const weekMeals = meals.filter((meal) => weekDays.some((d) => dateKey(d) === meal.date));

  const totalSpent = useMemo(() => expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0), [expenses]);
  const completedGroceries = groceries.filter((item) => item.done).length;
  const groceryProgress = groceries.length > 0 ? Math.round((completedGroceries / groceries.length) * 100) : 0;
  const budgetPercent = budget > 0 ? Math.min(100, Math.round((totalSpent / budget) * 100)) : 0;
  const remainingBudget = Math.max(0, budget - totalSpent);

  // Meal Handlers
  const openNewMeal = (defaultDate = todayKey) => {
    setEditingMeal(null);
    setMealForm({
      date: defaultDate,
      type: "Breakfast",
      title: "",
      time: "08:30",
      calories: "350",
      recipeId: ""
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
      calories: String(meal.calories),
      recipeId: meal.recipeId || ""
    });
    setModal("meal");
  };

  const saveMeal = (e) => {
    e.preventDefault();
    if (!mealForm.title.trim()) return;

    if (editingMeal) {
      setMeals((prev) =>
        prev.map((m) =>
          m.id === editingMeal.id
            ? { ...m, ...mealForm, calories: Number(mealForm.calories) || 0 }
            : m
        )
      );
      showNotification("Meal updated successfully!");
    } else {
      const newMeal = {
        id: Date.now(),
        ...mealForm,
        calories: Number(mealForm.calories) || 0
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
    setEditingMeal(null);
    setMealForm({
      date: dateKey(today),
      type: recipe.category || "Dinner",
      title: recipe.title,
      time: "19:30",
      calories: String(recipe.calories || 400),
      recipeId: recipe.id
    });
    setModal("meal");
  };

  const addIngredientsToGroceries = (recipe) => {
    if (!recipe.ingredients || recipe.ingredients.length === 0) return;
    const newItems = recipe.ingredients.map((ing, i) => ({
      id: Date.now() + i,
      name: ing,
      amount: "1 portion",
      category: "Produce",
      done: false
    }));
    setGroceries((prev) => [...prev, ...newItems]);
    showNotification(`Added ${newItems.length} ingredients to your grocery checklist!`);
  };

  const openNewRecipe = () => {
    setEditingRecipe(null);
    setRecipeForm(blankRecipe);
    setModal("recipe");
  };

  const saveRecipe = (e) => {
    e.preventDefault();
    if (!recipeForm.title.trim()) return;

    const ingList = typeof recipeForm.ingredients === "string"
      ? recipeForm.ingredients.split("\n").map(s => s.trim()).filter(Boolean)
      : recipeForm.ingredients;

    const instList = typeof recipeForm.instructions === "string"
      ? recipeForm.instructions.split("\n").map(s => s.trim()).filter(Boolean)
      : recipeForm.instructions;

    const payload = {
      title: recipeForm.title.trim(),
      category: recipeForm.category,
      time: Number(recipeForm.time) || 15,
      calories: Number(recipeForm.calories) || 300,
      servings: Number(recipeForm.servings) || 1,
      description: recipeForm.description.trim() || "A delicious homemade recipe.",
      image: recipeForm.image.trim() || "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900",
      ingredients: ingList.length ? ingList : ["Fresh ingredients"],
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
    if (!groceryForm.name.trim()) return;

    if (editingGrocery) {
      setGroceries((prev) =>
        prev.map((g) =>
          g.id === editingGrocery.id
            ? { ...g, name: groceryForm.name.trim(), amount: groceryForm.amount.trim() || "1 item", category: groceryForm.category }
            : g
        )
      );
      showNotification("Grocery item updated!");
    } else {
      const newItem = {
        id: Date.now(),
        name: groceryForm.name.trim(),
        amount: groceryForm.amount.trim() || "1 item",
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
    const amt = Number(expenseForm.amount);
    if (!expenseForm.title.trim() || amt <= 0) return;

    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === editingExpense.id
            ? {
                ...exp,
                title: expenseForm.title.trim(),
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
        title: expenseForm.title.trim(),
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
      servingSize
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
    if (!data || typeof data !== "object") {
      showNotification("Invalid backup format.");
      return;
    }

    if (Array.isArray(data.meals)) setMeals(data.meals);
    if (Array.isArray(data.recipes)) setRecipes(data.recipes);
    if (Array.isArray(data.groceries)) setGroceries(data.groceries);
    if (Array.isArray(data.expenses)) setExpenses(data.expenses);
    if (typeof data.budget === "number") setBudget(data.budget);
    if (Array.isArray(data.favorites)) setFavorites(data.favorites);
    if (typeof data.calorieTarget === "number") setCalorieTarget(data.calorieTarget);
    if (typeof data.servingSize === "number") setServingSize(data.servingSize);

    showNotification("Workspace data restored successfully!");
  };

  const resetToDemoData = () => {
    if (window.confirm("Are you sure you want to restore default demo recipes, meals, and budget?")) {
      setMeals(initialMeals);
      setRecipes(starterRecipes);
      setGroceries(initialGroceries);
      setExpenses(initialExpenses);
      setBudget(8000);
      setFavorites([1, 5]);
      setCalorieTarget(2000);
      setServingSize(2);
      showNotification("Reset to initial demo data.");
    }
  };

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Meal Planner", icon: CalendarDays },
    { name: "Recipes", icon: BookOpen },
    { name: "Groceries", icon: ShoppingBasket, count: groceries.filter(g => !g.done).length },
    { name: "Budget", icon: Wallet },
    { name: "Analytics", icon: BarChart3 },
    { name: "Pricing", icon: Crown },
    { name: "Settings", icon: Settings }
  ];

  // LANDING PAGE VIEW
  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} />;
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
          setTheme={setTheme}
          user={user}
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
              todayCalories={todayCalories}
              groceries={groceries}
              completedGroceries={completedGroceries}
              groceryProgress={groceryProgress}
              totalSpent={totalSpent}
              remainingBudget={remainingBudget}
              starterRecipe={starterRecipes[0]}
              iconForMeal={iconForMeal}
              onOpenNewMeal={openNewMeal}
              onOpenEditMeal={openEditMeal}
              onOpenRecipeDetails={openRecipeDetails}
              onNavigate={setPage}
            />
          )}

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
              onToggleFavorite={toggleFavorite}
              onOpenNewRecipe={openNewRecipe}
              onOpenRecipeDetails={openRecipeDetails}
              onAddRecipeToPlan={addRecipeToPlan}
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
              expenses={expenses}
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
              expenses={expenses}
              budget={budget}
              totalSpent={totalSpent}
            />
          )}

          {page === "Pricing" && (
            <PricingView
              userPlan={userPlan}
              onUpgradeToPro={handleUpgradeToPro}
              onDowngradeToFree={handleDowngradeToFree}
              showNotification={showNotification}
            />
          )}

          {page === "Settings" && (
            <SettingsView
              theme={theme}
              setTheme={setTheme}
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
        </div>

        {/* Footer */}
        <footer className="app-footer">
          <span>MealMate © 2026 · Eat better. Live brighter.</span>
          <span>Made with care <b>♥</b> for healthy living.</span>
        </footer>
      </main>

      {/* Modals */}
      <MealModal
        isOpen={modal === "meal"}
        onClose={() => setModal("")}
        editingMeal={editingMeal}
        mealForm={mealForm}
        setMealForm={setMealForm}
        onSave={saveMeal}
      />

      <RecipeModal
        isOpen={modal === "recipe"}
        onClose={() => setModal("")}
        editingRecipe={editingRecipe}
        recipeForm={recipeForm}
        setRecipeForm={setRecipeForm}
        onSave={saveRecipe}
      />

      <RecipeDetailModal
        isOpen={modal === "recipeDetail"}
        onClose={() => setModal("")}
        selectedRecipe={selectedRecipe}
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
      />

      <UpgradeModal
        isOpen={modal === "upgrade"}
        onClose={() => setModal("")}
        onUpgradeToPro={handleUpgradeToPro}
        onNavigateToPricing={() => setPage("Pricing")}
        showNotification={showNotification}
      />
    </div>
  );
}
