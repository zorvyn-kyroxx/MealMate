
import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, CalendarDays, BookOpen, ShoppingBasket,
  Wallet, Search, Plus, Trash2, Check, X, Menu, Bell,
  ArrowUpRight, Clock3, Flame, Leaf, ChefHat, Sparkles,
  ChevronRight, Utensils, CircleDollarSign, Pencil, Filter
} from "lucide-react";
import "./App.css";

const initialMeals = [
  { id: 1, day: "Monday", type: "Breakfast", name: "Avocado Toast", time: "08:00", calories: 320 },
  { id: 2, day: "Monday", type: "Lunch", name: "Grilled Chicken Bowl", time: "13:00", calories: 540 },
  { id: 3, day: "Monday", type: "Dinner", name: "Creamy Pasta", time: "20:00", calories: 620 },
  { id: 4, day: "Tuesday", type: "Breakfast", name: "Berry Smoothie", time: "08:00", calories: 280 },
  { id: 5, day: "Tuesday", type: "Lunch", name: "Mediterranean Salad", time: "13:00", calories: 430 },
];

const initialRecipes = [
  { id: 1, name: "Avocado Toast", category: "Breakfast", time: 10, calories: 320, price: 80, emoji: "🥑", description: "Creamy avocado with fresh herbs on toasted bread." },
  { id: 2, name: "Berry Smoothie", category: "Breakfast", time: 5, calories: 280, price: 65, emoji: "🥤", description: "A refreshing blend of berries and yogurt." },
  { id: 3, name: "Grilled Chicken Bowl", category: "Lunch", time: 25, calories: 540, price: 160, emoji: "🥗", description: "Protein-rich bowl with rice and fresh vegetables." },
  { id: 4, name: "Creamy Pasta", category: "Dinner", time: 20, calories: 620, price: 130, emoji: "🍝", description: "Comforting pasta with a delicious creamy sauce." },
  { id: 5, name: "Mediterranean Salad", category: "Lunch", time: 15, calories: 430, price: 110, emoji: "🥙", description: "Fresh vegetables, olives and a light dressing." },
  { id: 6, name: "Pancake Stack", category: "Breakfast", time: 15, calories: 390, price: 90, emoji: "🥞", description: "Fluffy pancakes with fruit and honey." },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const initialGroceries = [
  { id: 1, name: "Fresh vegetables", quantity: "500g", done: false },
  { id: 2, name: "Chicken breast", quantity: "500g", done: false },
  { id: 3, name: "Whole wheat bread", quantity: "1 pack", done: true },
  { id: 4, name: "Greek yogurt", quantity: "1 cup", done: false },
];

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [meals, setMeals] = useState(() => readStorage("mm-meals", initialMeals));
  const [groceries, setGroceries] = useState(() => readStorage("mm-groceries", initialGroceries));
  const [expenses, setExpenses] = useState(() => readStorage("mm-expenses", []));
  const [budget, setBudget] = useState(() => readStorage("mm-budget", 6000));

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showMealForm, setShowMealForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [showGroceryForm, setShowGroceryForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const [mealForm, setMealForm] = useState({
    name: "", day: "Monday", type: "Breakfast", time: "08:00", calories: 300
  });
  const [groceryName, setGroceryName] = useState("");
  const [groceryQuantity, setGroceryQuantity] = useState("");
  const [expenseForm, setExpenseForm] = useState({ name: "", amount: "" });

  useEffect(() => localStorage.setItem("mm-meals", JSON.stringify(meals)), [meals]);
  useEffect(() => localStorage.setItem("mm-groceries", JSON.stringify(groceries)), [groceries]);
  useEffect(() => localStorage.setItem("mm-expenses", JSON.stringify(expenses)), [expenses]);
  useEffect(() => localStorage.setItem("mm-budget", JSON.stringify(budget)), [budget]);

  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const completedGroceries = groceries.filter(item => item.done).length;
  const totalCalories = meals
    .filter(meal => meal.day === "Monday")
    .reduce((sum, meal) => sum + Number(meal.calories), 0);

  const filteredRecipes = useMemo(() => recipesFilter(initialRecipes, search, category), [search, category]);

  function recipesFilter(recipes, query, filter) {
    return recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase()) &&
      (filter === "All" || recipe.category === filter)
    );
  }

  function openNewMeal() {
    setEditingMeal(null);
    setMealForm({ name: "", day: "Monday", type: "Breakfast", time: "08:00", calories: 300 });
    setShowMealForm(true);
  }

  function saveMeal(e) {
    e.preventDefault();
    if (!mealForm.name.trim()) return;

    if (editingMeal) {
      setMeals(old => old.map(meal =>
        meal.id === editingMeal.id ? { ...mealForm, id: editingMeal.id } : meal
      ));
    } else {
      setMeals(old => [...old, { ...mealForm, id: Date.now() }]);
    }
    setShowMealForm(false);
  }

  function editMeal(meal) {
    setEditingMeal(meal);
    setMealForm({ ...meal });
    setShowMealForm(true);
  }

  function addGrocery(e) {
    e.preventDefault();
    if (!groceryName.trim()) return;
    setGroceries(old => [...old, {
      id: Date.now(), name: groceryName, quantity: groceryQuantity || "1 item", done: false
    }]);
    setGroceryName("");
    setGroceryQuantity("");
    setShowGroceryForm(false);
  }

  function addExpense(e) {
    e.preventDefault();
    if (!expenseForm.name.trim() || Number(expenseForm.amount) <= 0) return;
    setExpenses(old => [...old, { id: Date.now(), ...expenseForm }]);
    setExpenseForm({ name: "", amount: "" });
    setShowExpenseForm(false);
  }

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Meal Planner", icon: CalendarDays },
    { name: "Recipes", icon: BookOpen },
    { name: "Groceries", icon: ShoppingBasket },
    { name: "Budget", icon: Wallet },
  ];

  function changePage(name) {
    setPage(name);
    setMobileMenu(false);
  }

  if (!started) {
    return (
      <main className="landing">
        <nav className="landing-nav">
          <div className="brand"><span className="brand-icon"><Leaf /></span> MealMate</div>
          <button className="btn btn-dark" onClick={() => setStarted(true)}>Open app <ArrowUpRight size={17} /></button>
        </nav>
        <section className="landing-hero">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> YOUR SMARTER FOOD ROUTINE</div>
            <h1>Eat better.<br /><span>Live brighter.</span></h1>
            <p>Plan delicious meals, discover new recipes, organize groceries and stay on top of your food budget — all in one place.</p>
            <button className="btn btn-green hero-btn" onClick={() => setStarted(true)}>Start planning <ArrowUpRight size={18} /></button>
            <div className="hero-proof"><span>✦</span> A simpler way to eat well, every day.</div>
          </div>
          <div className="hero-art">
            <div className="hero-circle"></div>
            <div className="food-emoji">🥗</div>
            <div className="floating-note note-one"><Leaf size={17} /> Fresh choices, daily</div>
            <div className="floating-note note-two"><Flame size={17} /> Your week, organized</div>
          </div>
        </section>
        <section className="landing-features">
          <div><CalendarDays /><h3>Plan your week</h3><p>Build a meal routine that works for you.</p></div>
          <div><ChefHat /><h3>Find inspiration</h3><p>Discover easy and delicious recipes.</p></div>
          <div><Wallet /><h3>Spend smarter</h3><p>Keep your food budget on track.</p></div>
        </section>
        <footer className="landing-footer">© 2026 MealMate · Made for better everyday living.</footer>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand"><span className="brand-icon"><Leaf /></span> MealMate</div>
        <div className="side-label">WORKSPACE</div>
        <nav className="side-nav">
          {navigation.map(item => (
            <button key={item.name} className={page === item.name ? "nav-link active" : "nav-link"} onClick={() => changePage(item.name)}>
              <item.icon size={19} /> {item.name}
              {item.name === "Groceries" && <span className="nav-count">{groceries.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="tip-card"><Sparkles size={18} /><strong>A little reminder</strong><p>Healthy habits start with small, consistent choices.</p></div>
          <div className="profile"><div className="avatar">M</div><div><strong>MealMate User</strong><span>Personal workspace</span></div></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)}><Menu /></button>
          <div className="breadcrumb">Workspace <ChevronRight size={14} /> <strong>{page}</strong></div>
          <div className="top-actions">
            <span className="today-label">Your personal food planner</span>
            <button className="icon-button" title="Notifications"><Bell size={19} /></button>
            <div className="avatar">M</div>
          </div>
        </header>

        <div className="page-content">
          {page === "Dashboard" && (
            <>
              <div className="page-heading">
                <div><div className="eyebrow">YOUR PERSONAL OVERVIEW</div><h1>Good day! <span>🌿</span></h1><p>Here's what's happening with your food routine.</p></div>
                <button className="btn btn-green" onClick={openNewMeal}><Plus size={17} /> Add a meal</button>
              </div>

              <section className="welcome-banner">
                <div><div className="banner-tag">A FRESH START</div><h2>Make room for<br />something delicious.</h2><p>Your next great meal is just a plan away.</p><button onClick={() => changePage("Meal Planner")} className="banner-link">Plan your week <ArrowUpRight size={16} /></button></div>
                <div className="banner-visual">🥑</div>
                <div className="banner-decoration"></div>
              </section>

              <section className="stats-grid">
                <div className="stat-card"><div className="stat-top"><span>Planned meals</span><CalendarDays /></div><strong>{meals.length}</strong><small>Across your weekly plan</small></div>
                <div className="stat-card"><div className="stat-top"><span>Monday calories</span><Flame /></div><strong>{totalCalories.toLocaleString()}</strong><small>Calories planned</small></div>
                <div className="stat-card"><div className="stat-top"><span>Grocery progress</span><ShoppingBasket /></div><strong>{completedGroceries}/{groceries.length}</strong><small>Items completed</small></div>
                <div className="stat-card"><div className="stat-top"><span>Food spending</span><CircleDollarSign /></div><strong>₹{totalSpent.toLocaleString("en-IN")}</strong><small>Recorded expenses</small></div>
              </section>

              <section className="dashboard-grid">
                <div className="panel">
                  <div className="panel-heading"><div><h3>Today's meal plan</h3><p>Your Monday overview</p></div><button className="text-link" onClick={() => changePage("Meal Planner")}>View planner <ChevronRight size={15} /></button></div>
                  {meals.filter(meal => meal.day === "Monday").length ? meals.filter(meal => meal.day === "Monday").map(meal => (
                    <div className="meal-row" key={meal.id}><div className="meal-icon">{meal.type === "Breakfast" ? "🥑" : meal.type === "Lunch" ? "🥗" : "🍝"}</div><div className="meal-info"><strong>{meal.name}</strong><span>{meal.type} · {meal.calories} kcal</span></div><span className="meal-time"><Clock3 size={14} /> {meal.time}</span></div>
                  )) : <p className="empty-state">No meals planned for Monday yet.</p>}
                </div>
                <div className="panel">
                  <div className="panel-heading"><div><h3>Weekly inspiration</h3><p>A little something to try</p></div><Sparkles size={19} className="green-icon" /></div>
                  <div className="inspiration-art">🥞</div>
                  <h3 className="inspiration-title">Start with a better breakfast</h3>
                  <p className="muted">Explore simple recipes that make everyday meals feel special.</p>
                  <button className="text-link" onClick={() => changePage("Recipes")}>Explore recipes <ArrowUpRight size={15} /></button>
                </div>
              </section>
            </>
          )}

          {page === "Meal Planner" && (
            <>
              <div className="page-heading"><div><div className="eyebrow">YOUR WEEK, YOUR WAY</div><h1>Meal planner</h1><p>Organize your meals and make every day delicious.</p></div><button className="btn btn-green" onClick={openNewMeal}><Plus size={17} /> Add meal</button></div>
              <div className="week-strip">{days.map((day, i) => <div className="day-pill" key={day}><span>{day.slice(0,3)}</span><strong>{i + 1}</strong></div>)}</div>
              <div className="planner-grid">{days.map(day => <div className="day-card" key={day}><div className="day-card-heading"><h3>{day}</h3><span>{meals.filter(m => m.day === day).length} meals</span></div>{meals.filter(m => m.day === day).map(meal => <div className="planner-meal" key={meal.id}><div className="planner-meal-top"><span className="meal-type">{meal.type}</span><div className="meal-controls"><button onClick={() => editMeal(meal)} title="Edit"><Pencil size={14} /></button><button onClick={() => setMeals(old => old.filter(m => m.id !== meal.id))} title="Delete"><Trash2 size={14} /></button></div></div><strong>{meal.name}</strong><span><Clock3 size={13} /> {meal.time} · {meal.calories} kcal</span></div>)}<button className="add-inline" onClick={() => { setMealForm(old => ({ ...old, day })); setEditingMeal(null); setShowMealForm(true); }}><Plus size={15} /> Add meal</button></div>)}</div>
            </>
          )}

          {page === "Recipes" && (
            <>
              <div className="page-heading"><div><div className="eyebrow">A WORLD OF FLAVOUR</div><h1>Recipe library</h1><p>Find your next favourite meal.</p></div><span className="recipe-total">{initialRecipes.length} curated recipes</span></div>
              <div className="recipe-toolbar"><div className="search-box"><Search size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search recipes..." /></div><div className="filter-box"><Filter size={16} /><select value={category} onChange={e => setCategory(e.target.value)}><option>All</option><option>Breakfast</option><option>Lunch</option><option>Dinner</option></select></div></div>
              <div className="recipe-grid">{filteredRecipes.map(recipe => <article className="recipe-card" key={recipe.id}><div className="recipe-art">{recipe.emoji}<span>{recipe.category}</span></div><div className="recipe-body"><h3>{recipe.name}</h3><p>{recipe.description}</p><div className="recipe-meta"><span><Clock3 size={14} /> {recipe.time} min</span><span><Flame size={14} /> {recipe.calories} kcal</span></div><div className="recipe-bottom"><strong>Approx. ₹{recipe.price}</strong><button onClick={() => { setMealForm({ name: recipe.name, day: "Monday", type: recipe.category, time: "13:00", calories: recipe.calories }); setEditingMeal(null); setShowMealForm(true); }}>Add to plan <Plus size={15} /></button></div></div></article>)}</div>
              {!filteredRecipes.length && <p className="empty-state">No recipes found. Try another search.</p>}
            </>
          )}

          {page === "Groceries" && (
            <>
              <div className="page-heading"><div><div className="eyebrow">SHOP SMARTER</div><h1>Grocery list</h1><p>Everything you need, all in one place.</p></div><button className="btn btn-green" onClick={() => setShowGroceryForm(true)}><Plus size={17} /> Add item</button></div>
              <div className="grocery-summary"><div><span>YOUR SHOPPING PROGRESS</span><h2>{completedGroceries} of {groceries.length} items completed</h2></div><strong>{groceries.length ? Math.round(completedGroceries / groceries.length * 100) : 0}%</strong></div>
              <div className="progress-track"><div style={{ width: `${groceries.length ? completedGroceries / groceries.length * 100 : 0}%` }} /></div>
              <div className="panel grocery-panel"><div className="panel-heading"><div><h3>Shopping checklist</h3><p>Tick items as you shop.</p></div><ShoppingBasket className="green-icon" /></div>{groceries.map(item => <div className={`grocery-row ${item.done ? "is-done" : ""}`} key={item.id}><button className="check-button" onClick={() => setGroceries(old => old.map(g => g.id === item.id ? { ...g, done: !g.done } : g))}>{item.done && <Check size={15} />}</button><div><strong>{item.name}</strong><span>{item.quantity}</span></div><button className="delete-button" onClick={() => setGroceries(old => old.filter(g => g.id !== item.id))}><Trash2 size={16} /></button></div>)}{!groceries.length && <p className="empty-state">Your grocery list is empty.</p>}</div>
            </>
          )}

          {page === "Budget" && (
            <>
              <div className="page-heading"><div><div className="eyebrow">YOUR MONEY, ORGANIZED</div><h1>Food budget</h1><p>Keep an eye on your spending and plan smarter.</p></div><button className="btn btn-green" onClick={() => setShowExpenseForm(true)}><Plus size={17} /> Add expense</button></div>
              <div className="budget-grid"><div className="budget-card budget-main"><span>MONTHLY BUDGET</span><h2>₹{Number(budget).toLocaleString("en-IN")}</h2><p>Set a budget that feels comfortable.</p><div className="budget-edit"><input type="number" min="0" value={budget} onChange={e => setBudget(Number(e.target.value))} /><span>Change budget</span></div></div><div className="budget-card"><span>TOTAL SPENT</span><h2>₹{totalSpent.toLocaleString("en-IN")}</h2><p>Across your recorded expenses.</p></div><div className="budget-card"><span>REMAINING</span><h2>₹{Math.max(0, budget - totalSpent).toLocaleString("en-IN")}</h2><p>{totalSpent > budget ? "You are over your budget." : "You are within your budget."}</p></div></div>
              <div className="panel expense-panel"><div className="panel-heading"><div><h3>Recent expenses</h3><p>Your food spending activity</p></div><CircleDollarSign className="green-icon" /></div>{expenses.map(expense => <div className="expense-row" key={expense.id}><div className="expense-icon"><Utensils /></div><strong>{expense.name}</strong><span>₹{Number(expense.amount).toLocaleString("en-IN")}</span><button onClick={() => setExpenses(old => old.filter(e => e.id !== expense.id))}><Trash2 size={15} /></button></div>)}{!expenses.length && <p className="empty-state">No expenses recorded yet. Add your first expense.</p>}</div>
            </>
          )}
        </div>
        <footer className="app-footer">Made with care <span>♥</span> by MealMate</footer>
      </main>

      {showMealForm && <div className="modal-backdrop" onClick={() => setShowMealForm(false)}><form className="modal" onClick={e => e.stopPropagation()} onSubmit={saveMeal}><div className="modal-heading"><div><span className="eyebrow">MEAL DETAILS</span><h2>{editingMeal ? "Edit meal" : "Add a meal"}</h2></div><button type="button" onClick={() => setShowMealForm(false)}><X /></button></div><label>Meal name<input required value={mealForm.name} onChange={e => setMealForm({ ...mealForm, name: e.target.value })} placeholder="e.g. Vegetable rice" /></label><div className="form-row"><label>Day<select value={mealForm.day} onChange={e => setMealForm({ ...mealForm, day: e.target.value })}>{days.map(d => <option key={d}>{d}</option>)}</select></label><label>Meal type<select value={mealForm.type} onChange={e => setMealForm({ ...mealForm, type: e.target.value })}><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option></select></label></div><div className="form-row"><label>Time<input type="time" value={mealForm.time} onChange={e => setMealForm({ ...mealForm, time: e.target.value })} /></label><label>Calories<input type="number" min="0" value={mealForm.calories} onChange={e => setMealForm({ ...mealForm, calories: Number(e.target.value) })} /></label></div><button className="btn btn-green modal-submit" type="submit">{editingMeal ? "Save changes" : "Add to planner"}</button></form></div>}

      {showGroceryForm && <div className="modal-backdrop" onClick={() => setShowGroceryForm(false)}><form className="modal" onClick={e => e.stopPropagation()} onSubmit={addGrocery}><div className="modal-heading"><h2>Add grocery item</h2><button type="button" onClick={() => setShowGroceryForm(false)}><X /></button></div><label>Item name<input required value={groceryName} onChange={e => setGroceryName(e.target.value)} placeholder="e.g. Tomatoes" /></label><label>Quantity<input value={groceryQuantity} onChange={e => setGroceryQuantity(e.target.value)} placeholder="e.g. 500g" /></label><button className="btn btn-green modal-submit">Add item</button></form></div>}

      {showExpenseForm && <div className="modal-backdrop" onClick={() => setShowExpenseForm(false)}><form className="modal" onClick={e => e.stopPropagation()} onSubmit={addExpense}><div className="modal-heading"><h2>Add expense</h2><button type="button" onClick={() => setShowExpenseForm(false)}><X /></button></div><label>Expense name<input required value={expenseForm.name} onChange={e => setExpenseForm({ ...expenseForm, name: e.target.value })} placeholder="e.g. Weekly vegetables" /></label><label>Amount (₹)<input required type="number" min="1" value={expenseForm.amount} onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })} placeholder="e.g. 500" /></label><button className="btn btn-green modal-submit">Save expense</button></form></div>}
    </div>
  );
}

export default App;
