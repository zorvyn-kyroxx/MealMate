import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, CalendarDays, BookOpen, ShoppingBasket, Wallet,
  Search, Plus, Trash2, Check, X, Menu, ChevronLeft, ChevronRight,
  Clock3, Flame, Leaf, ChefHat, Heart, Pencil, Utensils, Sparkles,
  ArrowUpRight, MoreHorizontal, CircleDollarSign,
  Sunrise, Sun, Moon, Coffee, CalendarCheck, Bell, Eye
} from "lucide-react";
import heroImg from "./assets/hero.png";
import "./App.css";

const today = new Date();

const dayStart = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const weekday = (d.getDay() + 6) % 7; // Monday = 0, Sunday = 6
  d.setDate(d.getDate() - weekday);
  return d;
};

const dateKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const prettyDate = (date, options = { day: "numeric", month: "short" }) =>
  new Intl.DateTimeFormat("en-IN", options).format(date);

const readStore = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const starterRecipes = [
  {
    id: 1,
    title: "Creamy Avocado Toast",
    category: "Breakfast",
    time: 10,
    calories: 320,
    servings: 1,
    description: "A fresh, creamy toast with mashed avocado, lime, and chilli flakes.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=900",
    ingredients: ["2 slices whole-wheat bread", "1 ripe avocado", "1 tsp lemon juice", "Salt & black pepper", "Chilli flakes"],
    instructions: ["Toast the whole-wheat bread until golden and crisp.", "Mash the ripe avocado with lemon juice, salt, and pepper.", "Spread generously over toast and garnish with chilli flakes."]
  },
  {
    id: 2,
    title: "Green Goddess Bowl",
    category: "Lunch",
    time: 25,
    calories: 460,
    servings: 2,
    description: "A nourishing grain bowl packed with broccoli, cucumber, and yogurt herb dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900",
    ingredients: ["1 cup cooked quinoa", "1 cup steamed broccoli", "1 crisp cucumber", "1 avocado", "2 tbsp Greek yogurt dressing"],
    instructions: ["Cook quinoa according to instructions and steam broccoli florets.", "Slice the cucumber and dice the avocado.", "Assemble quinoa, vegetables, and drizzle with fresh yogurt dressing."]
  },
  {
    id: 3,
    title: "Berry Yogurt Parfait",
    category: "Snack",
    time: 5,
    calories: 210,
    servings: 1,
    description: "Layered Greek yogurt with seasonal berries, crunchy granola, and raw honey.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900",
    ingredients: ["¾ cup Greek yogurt", "½ cup fresh mixed berries", "2 tbsp oat granola", "1 tsp raw honey"],
    instructions: ["Spoon half of the Greek yogurt into a dessert glass.", "Layer with mixed berries and granola.", "Top with remaining yogurt, drizzle with honey, and serve chilled."]
  },
  {
    id: 4,
    title: "Roasted Veggie Pasta",
    category: "Dinner",
    time: 30,
    calories: 520,
    servings: 2,
    description: "Tender penne tossed with roasted bell peppers, zucchini, cherry tomatoes, and basil.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900",
    ingredients: ["180g whole-wheat pasta", "1 medium zucchini", "1 bell pepper", "1 cup cherry tomatoes", "1.5 tbsp extra virgin olive oil", "Italian seasoning"],
    instructions: ["Boil pasta in salted water until al dente.", "Toss chopped zucchini, peppers, and tomatoes with olive oil and roast at 200°C for 20 mins.", "Combine drained pasta with roasted veggies and season to taste."]
  },
  {
    id: 5,
    title: "Banana Oat Pancakes",
    category: "Breakfast",
    time: 15,
    calories: 350,
    servings: 2,
    description: "Naturally sweet, fluffy pancakes made with rolled oats, ripe banana, and cinnamon.",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=900",
    ingredients: ["1 large ripe banana", "1 cup rolled oats", "1 egg", "¼ cup milk", "½ tsp baking powder", "Pinch of cinnamon"],
    instructions: ["Blend all ingredients in a blender until smooth batter forms.", "Pour batter in small circles onto a warm non-stick skillet.", "Flip when bubbles appear on the surface and cook both sides until golden."]
  },
  {
    id: 6,
    title: "Chickpea Power Salad",
    category: "Lunch",
    time: 15,
    calories: 390,
    servings: 2,
    description: "Plant-protein salad with cucumbers, diced tomatoes, red onions, and lemon vinaigrette.",
    image: "https://images.unsplash.com/photo-1547496502-bfd404d3442f?w=900",
    ingredients: ["1.5 cups cooked chickpeas", "1 diced cucumber", "1 ripe tomato", "½ red onion, finely chopped", "1 tbsp olive oil", "1 tbsp lemon juice"],
    instructions: ["Rinse and thoroughly drain cooked chickpeas.", "Chop cucumbers, tomatoes, and red onions into uniform bite-sized cubes.", "Whisk olive oil and lemon juice, toss with salad, and chill for 10 minutes."]
  }
];

const initialMeals = [
  { id: 101, date: dateKey(today), type: "Breakfast", title: "Banana Oat Pancakes", time: "08:30", calories: 350, recipeId: 5 },
  { id: 102, date: dateKey(today), type: "Lunch", title: "Chickpea Power Salad", time: "13:15", calories: 390, recipeId: 6 },
  { id: 103, date: dateKey(today), type: "Dinner", title: "Roasted Veggie Pasta", time: "20:00", calories: 520, recipeId: 4 }
];

const initialGroceries = [
  { id: 1, name: "Ripe avocados", amount: "3 pieces", category: "Produce", done: false },
  { id: 2, name: "Greek yogurt tub", amount: "500g", category: "Dairy", done: true },
  { id: 3, name: "Whole-wheat penne", amount: "1 pack", category: "Pantry", done: false },
  { id: 4, name: "Fresh blueberries", amount: "1 box", category: "Produce", done: false },
  { id: 5, name: "Rolled oats", amount: "1 kg", category: "Pantry", done: true }
];

const initialExpenses = [
  { id: 1, title: "Supermarket Weekly Groceries", amount: 1450, category: "Groceries", date: dateKey(today) },
  { id: 2, title: "Fresh Vegetables Market", amount: 380, category: "Produce", date: dateKey(today) },
  { id: 3, title: "Artisan Sourdough Bakery", amount: 220, category: "Bakery", date: dateKey(today) }
];

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];
const groceryCategories = ["Produce", "Dairy", "Bakery", "Pantry", "Meat", "Snacks", "Other"];
const expenseCategories = ["Groceries", "Produce", "Dining Out", "Bakery", "Beverages", "Other"];

const iconForMeal = (type) => {
  switch (type) {
    case "Breakfast": return Sunrise;
    case "Lunch": return Sun;
    case "Dinner": return Moon;
    default: return Coffee;
  }
};

const blankRecipe = {
  title: "",
  category: "Breakfast",
  time: "15",
  calories: "350",
  servings: "2",
  description: "",
  image: "",
  ingredients: "",
  instructions: ""
};

export default function App() {
  const [started, setStarted] = useState(() => readStore("mealmate-started", false));
  const [page, setPage] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [meals, setMeals] = useState(() => readStore("mealmate-meals", initialMeals));
  const [recipes, setRecipes] = useState(() => readStore("mealmate-recipes", starterRecipes));
  const [groceries, setGroceries] = useState(() => readStore("mealmate-groceries", initialGroceries));
  const [favorites, setFavorites] = useState(() => readStore("mealmate-favorites", [1, 5]));
  const [budget, setBudget] = useState(() => readStore("mealmate-budget", 8000));
  const [expenses, setExpenses] = useState(() => readStore("mealmate-expenses", initialExpenses));

  const [weekStart, setWeekStart] = useState(() => dayStart(today));
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [modal, setModal] = useState(""); // "meal" | "recipe" | "recipeDetail" | "grocery" | "expense"
  const [editingMeal, setEditingMeal] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
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
  const [expenseForm, setExpenseForm] = useState({ title: "", amount: "", category: "Groceries" });
  const [notification, setNotification] = useState("");

  // Sync to LocalStorage
  useEffect(() => localStorage.setItem("mealmate-started", JSON.stringify(started)), [started]);
  useEffect(() => localStorage.setItem("mealmate-meals", JSON.stringify(meals)), [meals]);
  useEffect(() => localStorage.setItem("mealmate-recipes", JSON.stringify(recipes)), [recipes]);
  useEffect(() => localStorage.setItem("mealmate-groceries", JSON.stringify(groceries)), [groceries]);
  useEffect(() => localStorage.setItem("mealmate-favorites", JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem("mealmate-budget", JSON.stringify(budget)), [budget]);
  useEffect(() => localStorage.setItem("mealmate-expenses", JSON.stringify(expenses)), [expenses]);

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
      amount: "1 recipe portion",
      category: "Produce",
      done: false
    }));
    setGroceries((prev) => [...prev, ...newItems]);
    showNotification(`Added ${newItems.length} ingredients to your grocery list!`);
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
      showNotification("Recipe saved!");
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

  // Grocery Handlers
  const addGroceryItem = (e) => {
    e.preventDefault();
    if (!groceryForm.name.trim()) return;
    const newItem = {
      id: Date.now(),
      name: groceryForm.name.trim(),
      amount: groceryForm.amount.trim() || "1 item",
      category: groceryForm.category || "Produce",
      done: false
    };
    setGroceries((prev) => [...prev, newItem]);
    setGroceryForm({ name: "", amount: "1 pack", category: "Produce" });
    setModal("");
    showNotification("Added item to grocery list!");
  };

  const toggleGroceryDone = (id) => {
    setGroceries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const deleteGrocery = (id) => {
    setGroceries((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompletedGroceries = () => {
    setGroceries((prev) => prev.filter((item) => !item.done));
    showNotification("Cleared completed grocery items.");
  };

  // Expense Handlers
  const addExpenseItem = (e) => {
    e.preventDefault();
    const amt = Number(expenseForm.amount);
    if (!expenseForm.title.trim() || amt <= 0) return;
    const newExp = {
      id: Date.now(),
      title: expenseForm.title.trim(),
      amount: amt,
      category: expenseForm.category || "Groceries",
      date: dateKey(today)
    };
    setExpenses((prev) => [newExp, ...prev]);
    setExpenseForm({ title: "", amount: "", category: "Groceries" });
    setModal("");
    showNotification("Expense recorded!");
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    showNotification("Expense removed.");
  };

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Meal Planner", icon: CalendarDays },
    { name: "Recipes", icon: BookOpen },
    { name: "Groceries", icon: ShoppingBasket, count: groceries.filter(g => !g.done).length },
    { name: "Budget", icon: Wallet }
  ];

  // LANDING PAGE
  if (!started) {
    return (
      <main className="landing">
        <nav className="landing-nav">
          <div className="brand">
            <span className="brand-icon"><Leaf /></span>
            <span>MealMate</span>
          </div>
          <div className="landing-nav-right">
            <span className="landing-nav-note">Eat better. Live brighter.</span>
            <button className="btn btn-dark" onClick={() => setStarted(true)}>
              Open app <ArrowUpRight size={17} />
            </button>
          </div>
        </nav>

        <section className="landing-hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>YOUR SMARTER FOOD ROUTINE</span>
            </div>
            <h1>
              Eat better.<br />
              <em>Live brighter.</em>
            </h1>
            <p>
              Plan delicious meals, discover curated recipes, organise your grocery checklist, and master your food budget — all in one modern, distraction-free space.
            </p>
            <div className="hero-actions">
              <button className="btn btn-green hero-btn" onClick={() => setStarted(true)}>
                Start planning <ArrowUpRight size={18} />
              </button>
              <div className="hero-caption">
                <Sparkles size={16} />
                <span>No credit card required. Free tier available.</span>
              </div>
            </div>
            <div className="hero-social-proof">
              <div className="avatar-stack">
                <span>✦</span>
                <span>★</span>
                <span>♥</span>
              </div>
              <div>
                <strong>Loved by food lovers & busy professionals</strong>
                <div>Streamlining weekly meal routines with ease</div>
              </div>
            </div>
          </div>

          <div className="hero-showcase">
            <div className="hero-orbit" />
            <div className="hero-photo">
              <img src={heroImg} alt="Delicious and healthy fresh meal prep" />
            </div>
            <div className="hero-float-card hero-float-top">
              <div className="float-icon"><CalendarCheck size={18} /></div>
              <div>
                <strong>Weekly plan ready</strong>
                <small>7 meals organized</small>
              </div>
            </div>
            <div className="hero-float-card hero-float-bottom">
              <div className="float-check"><Check size={14} /></div>
              <div>
                <strong>Smart grocery list</strong>
                <small>Auto-synced ingredients</small>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-benefits">
          <div className="benefit-intro">
            <div className="eyebrow"><span className="eyebrow-dot" /> PURPOSE-BUILT SYSTEM</div>
            <h2>Everything you need for effortless nutrition.</h2>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon"><CalendarDays /></div>
            <h3>Weekly Meal Planner</h3>
            <p>Schedule breakfast, lunch, and dinner with precise calorie targets and effortless week-to-week navigation.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon"><ChefHat /></div>
            <h3>Curated Recipe Library</h3>
            <p>Explore chef-crafted recipes, manage your personal collection, and push ingredients straight to groceries.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon"><CircleDollarSign /></div>
            <h3>Intelligent Food Budget</h3>
            <p>Monitor your grocery spend in real time, avoid overspending, and stay on track with clear financial insights.</p>
          </div>
        </section>

        <footer className="landing-footer">
          <span>© 2026 MealMate · Eat better. Live brighter.</span>
          <span>Crafted with care for mindful living.</span>
        </footer>
      </main>
    );
  }

  // APP SHELL
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

      {/* Mobile Scrim */}
      {mobileMenu && (
        <button
          className="mobile-scrim"
          aria-label="Close menu"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand">
            <span className="brand-icon"><Leaf /></span>
            <span>MealMate</span>
          </div>
          <span className="brand-plan">FREE</span>
        </div>

        <div className="nav-group">
          <div className="side-label">WORKSPACE</div>
          <nav className="side-nav">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = page === item.name;
              return (
                <button
                  key={item.name}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setPage(item.name);
                    setMobileMenu(false);
                  }}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="nav-count">{item.count}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-spacer" />

        <div className="sidebar-promo">
          <div className="promo-spark"><Sparkles size={16} /></div>
          <strong>Daily Nutrition Tip</strong>
          <p>Meal planning reduces weekly food waste by up to 30% and keeps your budget intact.</p>
          <button onClick={() => setPage("Meal Planner")}>
            Review planner <ArrowUpRight size={13} />
          </button>
        </div>

        <div className="profile">
          <div className="avatar">M</div>
          <div className="profile-copy">
            <strong>MealMate User</strong>
            <span>Personal Workspace</span>
          </div>
          <MoreHorizontal size={16} className="profile-more" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-area">
        {/* Topbar */}
        <header className="topbar">
          <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)}>
            <Menu size={20} />
          </button>
          <div className="breadcrumb">
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>{page}</strong>
          </div>
          <div className="top-actions">
            <div className="top-date">
              <span className="status-dot" />
              <span>{prettyDate(today, { weekday: "short", day: "numeric", month: "short" })}</span>
            </div>
            <button className="icon-button" title="Quick notification" onClick={() => showNotification("You are on track with your goals!")}>
              <Bell size={18} />
            </button>
            <div className="avatar top-avatar">M</div>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <div className="page-content">
          {/* DASHBOARD */}
          {page === "Dashboard" && (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-dot" />
                    <span>YOUR PERSONAL OVERVIEW</span>
                  </div>
                  <h1>Good day! <em>🌿</em></h1>
                  <p>Here is what is happening with your weekly food routine and nutrition schedule.</p>
                </div>
                <button className="btn btn-green" onClick={() => openNewMeal(todayKey)}>
                  <Plus size={17} /> Add a meal
                </button>
              </div>

              {/* Dashboard Banner */}
              <section className="dashboard-hero">
                <div className="dashboard-hero-copy">
                  <span className="hero-kicker">SMART ROUTINE</span>
                  <h2>Make room for<br /><em>something delicious.</em></h2>
                  <p>Your week is mapped out with nourishing dishes. Keep consistency and feel your best.</p>
                  <button className="hero-text-button" onClick={() => setPage("Meal Planner")}>
                    Inspect weekly calendar <ArrowUpRight size={15} />
                  </button>
                </div>
                <div className="dashboard-hero-image">
                  <img src={heroImg} alt="Wholesome ingredients bowl" />
                </div>
                <div className="hero-stamp">
                  <span>MEALMATE</span>
                  <strong>FRESH</strong>
                  <Sparkles size={12} />
                </div>
              </section>

              {/* Stats Cards */}
              <section className="stats-grid">
                <div className="stat-card">
                  <div className="stat-top">
                    <span>Planned this week</span>
                    <div className="stat-icon sage"><CalendarDays size={16} /></div>
                  </div>
                  <strong>{weekMeals.length}</strong>
                  <small className="stat-trend">Across current 7 days</small>
                </div>

                <div className="stat-card">
                  <div className="stat-top">
                    <span>Today's calories</span>
                    <div className="stat-icon peach"><Flame size={16} /></div>
                  </div>
                  <strong>{todayCalories} <span className="stat-denom">kcal</span></strong>
                  <small>{todayMeals.length} meals scheduled today</small>
                </div>

                <div className="stat-card">
                  <div className="stat-top">
                    <span>Grocery checklist</span>
                    <div className="stat-icon blue"><ShoppingBasket size={16} /></div>
                  </div>
                  <strong>{completedGroceries}/{groceries.length}</strong>
                  <small>{groceryProgress}% items purchased</small>
                </div>

                <div className="stat-card">
                  <div className="stat-top">
                    <span>Food spend</span>
                    <div className="stat-icon lilac"><CircleDollarSign size={16} /></div>
                  </div>
                  <strong>₹{totalSpent.toLocaleString("en-IN")}</strong>
                  <small>₹{remainingBudget.toLocaleString("en-IN")} remaining</small>
                </div>
              </section>

              {/* Dashboard Panels */}
              <section className="dashboard-columns">
                {/* Today's Meals */}
                <div className="surface-card">
                  <div className="section-heading">
                    <div>
                      <h3>Today's Meal Plan</h3>
                      <p>{prettyDate(today, { weekday: "long", day: "numeric", month: "long" })}</p>
                    </div>
                    <button className="hero-text-button" onClick={() => setPage("Meal Planner")}>
                      View Planner <ChevronRight size={14} />
                    </button>
                  </div>

                  {todayMeals.length === 0 ? (
                    <div className="empty-state">
                      <Coffee size={32} style={{ margin: "0 auto 10px", opacity: 0.4 }} />
                      <p>No meals scheduled for today yet.</p>
                      <button className="btn btn-green" onClick={() => openNewMeal(todayKey)} style={{ marginTop: 8 }}>
                        <Plus size={15} /> Add today's first meal
                      </button>
                    </div>
                  ) : (
                    <div>
                      {todayMeals.map((meal) => {
                        const MealIcon = iconForMeal(meal.type);
                        const kindClass = meal.type.toLowerCase();
                        return (
                          <div className="meal-list-row" key={meal.id}>
                            <div className={`meal-kind-icon ${kindClass}`}>
                              <MealIcon size={18} />
                            </div>
                            <div className="meal-list-info">
                              <strong>{meal.title}</strong>
                              <span>
                                {meal.type} <i>·</i> {meal.calories} kcal
                              </span>
                            </div>
                            <div className="meal-list-time">
                              <Clock3 size={13} />
                              <span>{meal.time}</span>
                            </div>
                            <button
                              className="row-edit"
                              title="Edit meal"
                              onClick={() => openEditMeal(meal)}
                            >
                              <Pencil size={13} />
                            </button>
                          </div>
                        );
                      })}
                      <button className="add-row-button" onClick={() => openNewMeal(todayKey)}>
                        <Plus size={14} /> Add another meal for today
                      </button>
                    </div>
                  )}
                </div>

                {/* Recipe Highlight & Quick Inspiration */}
                <div className="surface-card">
                  <div className="section-heading">
                    <div>
                      <h3>Weekly Inspiration</h3>
                      <p>Hand-picked for balanced nutrition</p>
                    </div>
                    <Sparkles size={18} className="sparkle-mark" />
                  </div>

                  {starterRecipes[0] && (
                    <div className="inspiration-card">
                      <div className="inspiration-photo">
                        <img src={starterRecipes[0].image} alt={starterRecipes[0].title} />
                        <span className="photo-label">{starterRecipes[0].category.toUpperCase()}</span>
                      </div>
                      <h4>{starterRecipes[0].title}</h4>
                      <p>{starterRecipes[0].description}</p>
                      <button
                        className="btn btn-green"
                        style={{ width: "100%", justifyContent: "center" }}
                        onClick={() => openRecipeDetails(starterRecipes[0])}
                      >
                        <Eye size={15} /> View recipe details
                      </button>
                    </div>
                  )}

                  <div className="bottom-insight">
                    <div className="insight-icon"><Utensils size={16} /></div>
                    <div>
                      <strong>Need more ideas?</strong>
                      <p>Browse our recipe library or create your custom dishes.</p>
                    </div>
                    <button onClick={() => setPage("Recipes")}>
                      Explore <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* MEAL PLANNER */}
          {page === "Meal Planner" && (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-dot" />
                    <span>YOUR WEEK, YOUR WAY</span>
                  </div>
                  <h1>Weekly Planner</h1>
                  <p>Organise breakfast, lunch, and dinner with effortless day-to-day scheduling.</p>
                </div>
                <button className="btn btn-green" onClick={() => openNewMeal(todayKey)}>
                  <Plus size={17} /> Add meal
                </button>
              </div>

              {/* Week Navigation Toolbar */}
              <div className="planner-toolbar">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button className="icon-button" onClick={prevWeek} title="Previous week">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="btn btn-dark" style={{ minHeight: 36, padding: "0 14px" }} onClick={resetToThisWeek}>
                    Today
                  </button>
                  <button className="icon-button" onClick={nextWeek} title="Next week">
                    <ChevronRight size={18} />
                  </button>
                  <div>
                    <strong>{weekRangeLabel}</strong>
                  </div>
                </div>

                <div className="planner-legend">
                  <span><span className="legend-dot breakfast-dot" /> Breakfast</span>
                  <span><span className="legend-dot lunch-dot" /> Lunch</span>
                  <span><span className="legend-dot dinner-dot" /> Dinner</span>
                </div>
              </div>

              {/* 7-Day Grid */}
              <div className="planner-grid">
                {weekDays.map((dayDate) => {
                  const dayK = dateKey(dayDate);
                  const isToday = dayK === todayKey;
                  const dayMeals = meals.filter((m) => m.date === dayK);
                  const dayCal = dayMeals.reduce((s, m) => s + (Number(m.calories) || 0), 0);

                  return (
                    <div className={`day-card ${isToday ? "day-card-featured" : ""}`} key={dayK}>
                      <div className="day-card-heading">
                        <div>
                          <span className="day-number">{prettyDate(dayDate, { weekday: "short" }).toUpperCase()}</span>
                          <h3>{prettyDate(dayDate, { day: "numeric", month: "short" })}</h3>
                        </div>
                        <span className="day-meal-count">{dayMeals.length} meals · {dayCal} kcal</span>
                      </div>

                      {dayMeals.length === 0 ? (
                        <div className="day-empty">No meals scheduled for this day</div>
                      ) : (
                        dayMeals.map((meal) => {
                          const kindClass = meal.type.toLowerCase();
                          return (
                            <div className="planner-meal" key={meal.id}>
                              <div className={`planner-meal-accent ${kindClass}`} />
                              <div className="planner-meal-content">
                                <span className="meal-type">{meal.type}</span>
                                <strong>{meal.title}</strong>
                                <div className="planner-meta">
                                  <Clock3 size={12} />
                                  <span>{meal.time}</span>
                                  <i>·</i>
                                  <span>{meal.calories} kcal</span>
                                </div>
                              </div>
                              <div className="meal-controls">
                                <button title="Edit" onClick={() => openEditMeal(meal)}>
                                  <Pencil size={13} />
                                </button>
                                <button title="Delete" onClick={() => deleteMeal(meal.id)}>
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}

                      <button className="add-inline" onClick={() => openNewMeal(dayK)}>
                        <Plus size={14} /> Add meal
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* RECIPES */}
          {page === "Recipes" && (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-dot" />
                    <span>A WORLD OF FLAVOUR</span>
                  </div>
                  <h1>Recipe Library</h1>
                  <p>Discover wholesome recipes, create your custom favourites, and push ingredients to your grocery checklist.</p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-green" onClick={openNewRecipe}>
                    <Plus size={17} /> Create recipe
                  </button>
                </div>
              </div>

              {/* Recipe Toolbar */}
              <div className="recipe-toolbar">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title, description, or ingredients..."
                  />
                  {search && (
                    <button style={{ border: 0, background: "none", cursor: "pointer", color: "#8d9990" }} onClick={() => setSearch("")}>
                      <X size={16} />
                    </button>
                  )}
                </div>
                <div className="filter-box">
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Recipe Cards Grid */}
              <div className="recipe-grid">
                {filteredRecipes.map((recipe) => {
                  const isFav = favorites.includes(recipe.id);
                  return (
                    <article className="recipe-card" key={recipe.id}>
                      <button
                        className="recipe-image-button"
                        onClick={() => openRecipeDetails(recipe)}
                        title="Click to view details"
                      >
                        <img src={recipe.image} alt={recipe.title} />
                        <span className="recipe-category">{recipe.category}</span>
                        <span className="recipe-view">
                          <Eye size={12} /> View
                        </span>
                      </button>

                      <button
                        className={`favorite-button ${isFav ? "is-favorite" : ""}`}
                        title={isFav ? "Remove favorite" : "Add to favorites"}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(recipe.id);
                        }}
                      >
                        <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                      </button>

                      <div className="recipe-body">
                        <div className="recipe-title-row">
                          <h3>{recipe.title}</h3>
                          <span>{recipe.servings} {recipe.servings === 1 ? "serving" : "servings"}</span>
                        </div>
                        <p>{recipe.description}</p>
                        <div className="recipe-meta">
                          <span><Clock3 size={13} /> {recipe.time} min</span>
                          <span><Flame size={13} /> {recipe.calories} kcal</span>
                        </div>
                        <button
                          className="recipe-add"
                          onClick={() => addRecipeToPlan(recipe)}
                        >
                          <Plus size={14} /> Add to meal plan
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {filteredRecipes.length === 0 && (
                <div className="empty-state">
                  <BookOpen size={36} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
                  <p>No recipes match your criteria. Try adjusting the search or category.</p>
                  <button className="btn btn-green" onClick={() => { setSearch(""); setCategory("All"); }} style={{ marginTop: 10 }}>
                    Reset filters
                  </button>
                </div>
              )}
            </>
          )}

          {/* GROCERIES */}
          {page === "Groceries" && (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-dot" />
                    <span>SHOP SMARTER</span>
                  </div>
                  <h1>Grocery Checklist</h1>
                  <p>Keep track of ingredients, check off items while shopping, and clear completed items in a click.</p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {completedGroceries > 0 && (
                    <button className="btn btn-dark" onClick={clearCompletedGroceries}>
                      <Check size={16} /> Clear completed ({completedGroceries})
                    </button>
                  )}
                  <button className="btn btn-green" onClick={() => setModal("grocery")}>
                    <Plus size={17} /> Add item
                  </button>
                </div>
              </div>

              <div className="grocery-layout">
                {/* Main Checklist Card */}
                <div className="surface-card grocery-main">
                  <div className="grocery-progress-head">
                    <div>
                      <div className="eyebrow">SHOPPING PROGRESS</div>
                      <h2>
                        {completedGroceries} of {groceries.length} items <span>done</span>
                      </h2>
                    </div>
                    <div
                      className="progress-ring"
                      style={{ "--progress": `${groceryProgress}%` }}
                    >
                      <span>{groceryProgress}%</span>
                    </div>
                  </div>

                  <div className="progress-track">
                    <div style={{ width: `${groceryProgress}%` }} />
                  </div>

                  <div className="grocery-list-heading">
                    <h3>Items checklist</h3>
                    <span>{groceries.filter(g => !g.done).length} remaining</span>
                  </div>

                  {groceries.length === 0 ? (
                    <div className="empty-state">
                      <ShoppingBasket size={36} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
                      <p>Your grocery checklist is empty. Add items or sync them from recipes!</p>
                      <button className="btn btn-green" onClick={() => setModal("grocery")} style={{ marginTop: 10 }}>
                        <Plus size={15} /> Add first item
                      </button>
                    </div>
                  ) : (
                    <div>
                      {groceries.map((item) => (
                        <div className={`grocery-row ${item.done ? "is-done" : ""}`} key={item.id}>
                          <button
                            className="check-button"
                            onClick={() => toggleGroceryDone(item.id)}
                            title={item.done ? "Mark as pending" : "Mark as done"}
                          >
                            {item.done && <Check size={14} />}
                          </button>
                          <div className="grocery-item-copy">
                            <strong>{item.name}</strong>
                            <span>{item.amount} <i>·</i> {item.category}</span>
                          </div>
                          <button
                            className="delete-button"
                            onClick={() => deleteGrocery(item.id)}
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sidebar Cards */}
                <div className="grocery-side">
                  <div className="grocery-tip">
                    <div className="tip-illustration"><Leaf size={22} /></div>
                    <h3>Recipe Sync</h3>
                    <p>Open any recipe from the library and tap "Add all ingredients to groceries" to automatically populate your checklist.</p>
                    <button onClick={() => setPage("Recipes")}>
                      View recipes <ArrowUpRight size={14} />
                    </button>
                  </div>

                  <div className="grocery-mini-stat">
                    <span>SHOPPING STATUS</span>
                    <strong>{groceries.filter(g => !g.done).length} <small>items left</small></strong>
                    <div className="mini-progress">
                      <span style={{ width: `${groceryProgress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* BUDGET */}
          {page === "Budget" && (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-dot" />
                    <span>YOUR MONEY, ORGANISED</span>
                  </div>
                  <h1>Food Budget Tracker</h1>
                  <p>Monitor your weekly and monthly food spending to eat well without breaking the bank.</p>
                </div>
                <button className="btn btn-green" onClick={() => setModal("expense")}>
                  <Plus size={17} /> Add expense
                </button>
              </div>

              {/* Budget Overview Card */}
              <div className="budget-overview">
                <div className="budget-primary">
                  <span className="eyebrow">MONTHLY FOOD BUDGET</span>
                  <h2>₹{Number(budget).toLocaleString("en-IN")}</h2>
                  <p>Adjust your target monthly food allowance anytime.</p>
                  <div className="budget-edit">
                    <span>Change target (₹):</span>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={budget}
                      onChange={(e) => setBudget(Math.max(0, Number(e.target.value) || 0))}
                    />
                  </div>
                </div>

                <div className="budget-secondary">
                  <div className="budget-stat">
                    <div className="budget-stat-icon peach"><CircleDollarSign size={18} /></div>
                    <div>
                      <small>TOTAL RECORDED SPEND</small>
                      <strong>₹{totalSpent.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>

                  <div className="budget-stat">
                    <div className="budget-stat-icon sage"><Wallet size={18} /></div>
                    <div>
                      <small>REMAINING BUDGET</small>
                      <strong>₹{remainingBudget.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>

                  <div className="budget-usage">
                    <div>
                      <span>Budget Utilization</span>
                      <strong>{budgetPercent}%</strong>
                    </div>
                    <div className="progress-track">
                      <div
                        style={{
                          width: `${budgetPercent}%`,
                          background: totalSpent > budget ? "#c56f70" : undefined
                        }}
                      />
                    </div>
                    {totalSpent > budget ? (
                      <small style={{ color: "#c56f70", fontWeight: 700 }}>
                        Caution: You have exceeded your monthly food budget!
                      </small>
                    ) : (
                      <small>You are within your comfortable food budget.</small>
                    )}
                  </div>
                </div>
              </div>

              {/* Expenses List & Notes */}
              <div className="budget-lower">
                <div className="surface-card expense-panel">
                  <div className="section-heading">
                    <div>
                      <h3>Recent Food Expenses</h3>
                      <p>Logged grocery and food expenditures</p>
                    </div>
                    <CircleDollarSign size={18} className="sparkle-mark" />
                  </div>

                  {expenses.length === 0 ? (
                    <div className="empty-state">
                      <Wallet size={36} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
                      <p>No expenses recorded yet. Log your first expenditure.</p>
                      <button className="btn btn-green" onClick={() => setModal("expense")} style={{ marginTop: 10 }}>
                        <Plus size={15} /> Add first expense
                      </button>
                    </div>
                  ) : (
                    <div>
                      {expenses.map((expense) => (
                        <div className="expense-row" key={expense.id}>
                          <div className="expense-icon">
                            <Utensils size={16} />
                          </div>
                          <div className="expense-copy">
                            <strong>{expense.title}</strong>
                            <span>{expense.category} · {expense.date ? prettyDate(new Date(expense.date)) : "Recent"}</span>
                          </div>
                          <strong className="expense-amount">
                            ₹{Number(expense.amount).toLocaleString("en-IN")}
                          </strong>
                          <button
                            onClick={() => deleteExpense(expense.id)}
                            title="Delete expense"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="budget-note">
                  <div className="note-icon"><Sparkles size={18} /></div>
                  <h3>Smart Budgeting Tip</h3>
                  <p>
                    Planning meals 3–4 days in advance directly lowers last-minute food delivery orders, which on average account for 40% of unnecessary food expenses.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="app-footer">
          <span>MealMate © 2026 · Eat better. Live brighter.</span>
          <span>Made with care <b>♥</b> for healthy living.</span>
        </footer>
      </main>

      {/* MODALS */}

      {/* 1. Meal Form Modal */}
      {modal === "meal" && (
        <div className="modal-backdrop" onClick={() => setModal("")}>
          <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={saveMeal}>
            <div className="modal-heading">
              <div>
                <span className="eyebrow">SCHEDULE A DISH</span>
                <h2>{editingMeal ? "Edit Meal" : "Add to Planner"}</h2>
              </div>
              <button type="button" onClick={() => setModal("")}><X size={18} /></button>
            </div>

            <label>
              Meal Title
              <input
                required
                value={mealForm.title}
                onChange={(e) => setMealForm({ ...mealForm, title: e.target.value })}
                placeholder="e.g. Avocado Toast with Poached Egg"
              />
            </label>

            <div className="form-row">
              <label>
                Date
                <input
                  type="date"
                  required
                  value={mealForm.date}
                  onChange={(e) => setMealForm({ ...mealForm, date: e.target.value })}
                />
              </label>

              <label>
                Meal Type
                <select
                  value={mealForm.type}
                  onChange={(e) => setMealForm({ ...mealForm, type: e.target.value })}
                >
                  {mealTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-row">
              <label>
                Time
                <input
                  type="time"
                  value={mealForm.time}
                  onChange={(e) => setMealForm({ ...mealForm, time: e.target.value })}
                />
              </label>

              <label>
                Estimated Calories (kcal)
                <input
                  type="number"
                  min="0"
                  value={mealForm.calories}
                  onChange={(e) => setMealForm({ ...mealForm, calories: e.target.value })}
                  placeholder="350"
                />
              </label>
            </div>

            <button className="btn btn-green modal-submit" type="submit">
              {editingMeal ? "Update Meal" : "Add to Schedule"}
            </button>
          </form>
        </div>
      )}

      {/* 2. Recipe Detail Modal */}
      {modal === "recipeDetail" && selectedRecipe && (
        <div className="modal-backdrop" onClick={() => setModal("")}>
          <div className="recipe-detail-modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
            <button className="detail-close" onClick={() => setModal("")} title="Close">
              <X size={18} />
            </button>

            <div className="detail-content">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>{selectedRecipe.category.toUpperCase()} RECIPE</span>
              </div>
              <h2>{selectedRecipe.title}</h2>
              <p>{selectedRecipe.description}</p>

              <div className="detail-stats">
                <span><Clock3 size={15} /> {selectedRecipe.time} minutes</span>
                <span><Flame size={15} /> {selectedRecipe.calories} kcal</span>
                <span><ChefHat size={15} /> {selectedRecipe.servings} {selectedRecipe.servings === 1 ? "serving" : "servings"}</span>
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 14 }}>Ingredients</h3>
                  <button
                    type="button"
                    className="btn btn-dark"
                    style={{ minHeight: 32, padding: "0 12px", fontSize: 11 }}
                    onClick={() => addIngredientsToGroceries(selectedRecipe)}
                  >
                    <Plus size={14} /> Add all to groceries
                  </button>
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, color: "#54665a", fontSize: 12, lineHeight: 1.8 }}>
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 20 }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 14 }}>Preparation Steps</h3>
                <ol style={{ margin: 0, paddingLeft: 18, color: "#54665a", fontSize: 12, lineHeight: 1.8 }}>
                  {selectedRecipe.instructions.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button
                  className="btn btn-green"
                  style={{ flex: 1 }}
                  onClick={() => {
                    setModal("");
                    addRecipeToPlan(selectedRecipe);
                  }}
                >
                  <Plus size={16} /> Add to Meal Planner
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    deleteRecipe(selectedRecipe.id);
                    setModal("");
                  }}
                >
                  <Trash2 size={16} /> Delete Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Recipe Form Modal (Create or Edit) */}
      {modal === "recipe" && (
        <div className="modal-backdrop" onClick={() => setModal("")}>
          <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={saveRecipe}>
            <div className="modal-heading">
              <div>
                <span className="eyebrow">RECIPE STUDIO</span>
                <h2>{editingRecipe ? "Edit Recipe" : "Create New Recipe"}</h2>
              </div>
              <button type="button" onClick={() => setModal("")}><X size={18} /></button>
            </div>

            <label>
              Recipe Title
              <input
                required
                value={recipeForm.title}
                onChange={(e) => setRecipeForm({ ...recipeForm, title: e.target.value })}
                placeholder="e.g. Mediterranean Lemon Salmon"
              />
            </label>

            <div className="form-row">
              <label>
                Category
                <select
                  value={recipeForm.category}
                  onChange={(e) => setRecipeForm({ ...recipeForm, category: e.target.value })}
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                </select>
              </label>

              <label>
                Cooking Time (minutes)
                <input
                  type="number"
                  min="1"
                  value={recipeForm.time}
                  onChange={(e) => setRecipeForm({ ...recipeForm, time: e.target.value })}
                  placeholder="20"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Calories (kcal)
                <input
                  type="number"
                  min="0"
                  value={recipeForm.calories}
                  onChange={(e) => setRecipeForm({ ...recipeForm, calories: e.target.value })}
                  placeholder="450"
                />
              </label>

              <label>
                Servings
                <input
                  type="number"
                  min="1"
                  value={recipeForm.servings}
                  onChange={(e) => setRecipeForm({ ...recipeForm, servings: e.target.value })}
                  placeholder="2"
                />
              </label>
            </div>

            <label>
              Image URL
              <input
                type="url"
                value={recipeForm.image}
                onChange={(e) => setRecipeForm({ ...recipeForm, image: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
              />
            </label>

            <label>
              Short Description
              <input
                value={recipeForm.description}
                onChange={(e) => setRecipeForm({ ...recipeForm, description: e.target.value })}
                placeholder="A vibrant, fresh dish perfect for weekday dinners."
              />
            </label>

            <label>
              Ingredients (one per line)
              <textarea
                value={Array.isArray(recipeForm.ingredients) ? recipeForm.ingredients.join("\n") : recipeForm.ingredients}
                onChange={(e) => setRecipeForm({ ...recipeForm, ingredients: e.target.value })}
                placeholder={"2 salmon fillets\n1 lemon\n2 cups fresh spinach\n1 tbsp olive oil"}
              />
            </label>

            <label>
              Instructions (one step per line)
              <textarea
                value={Array.isArray(recipeForm.instructions) ? recipeForm.instructions.join("\n") : recipeForm.instructions}
                onChange={(e) => setRecipeForm({ ...recipeForm, instructions: e.target.value })}
                placeholder={"Season the salmon with lemon juice and salt.\nHeat skillet and sear salmon for 4 minutes each side.\nServe over sautéed spinach."}
              />
            </label>

            <button className="btn btn-green modal-submit" type="submit">
              {editingRecipe ? "Update Recipe" : "Save Recipe"}
            </button>
          </form>
        </div>
      )}

      {/* 4. Grocery Item Modal */}
      {modal === "grocery" && (
        <div className="modal-backdrop" onClick={() => setModal("")}>
          <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={addGroceryItem}>
            <div className="modal-heading">
              <div>
                <span className="eyebrow">SHOPPING LIST</span>
                <h2>Add Grocery Item</h2>
              </div>
              <button type="button" onClick={() => setModal("")}><X size={18} /></button>
            </div>

            <label>
              Item Name
              <input
                required
                value={groceryForm.name}
                onChange={(e) => setGroceryForm({ ...groceryForm, name: e.target.value })}
                placeholder="e.g. Extra virgin olive oil"
              />
            </label>

            <div className="form-row">
              <label>
                Quantity / Amount
                <input
                  value={groceryForm.amount}
                  onChange={(e) => setGroceryForm({ ...groceryForm, amount: e.target.value })}
                  placeholder="e.g. 500ml or 2 bunches"
                />
              </label>

              <label>
                Category
                <select
                  value={groceryForm.category}
                  onChange={(e) => setGroceryForm({ ...groceryForm, category: e.target.value })}
                >
                  {groceryCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>

            <button className="btn btn-green modal-submit" type="submit">
              Add to Grocery Checklist
            </button>
          </form>
        </div>
      )}

      {/* 5. Expense Modal */}
      {modal === "expense" && (
        <div className="modal-backdrop" onClick={() => setModal("")}>
          <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={addExpenseItem}>
            <div className="modal-heading">
              <div>
                <span className="eyebrow">BUDGET LOG</span>
                <h2>Record Food Expense</h2>
              </div>
              <button type="button" onClick={() => setModal("")}><X size={18} /></button>
            </div>

            <label>
              Expense Title / Store
              <input
                required
                value={expenseForm.title}
                onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                placeholder="e.g. Nature Basket Organic Groceries"
              />
            </label>

            <div className="form-row">
              <label>
                Amount (₹)
                <input
                  required
                  type="number"
                  min="1"
                  step="1"
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  placeholder="650"
                />
              </label>

              <label>
                Category
                <select
                  value={expenseForm.category}
                  onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                >
                  {expenseCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>

            <button className="btn btn-green modal-submit" type="submit">
              Save Expense Entry
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
