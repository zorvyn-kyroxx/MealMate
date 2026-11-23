import { Sunrise, Sun, Moon, Coffee } from "lucide-react";
import { dateKey } from "../utils/dateUtils";

export const today = new Date();

export const starterRecipes = [
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
    instructions: [
      "Toast the whole-wheat bread until golden and crisp.",
      "Mash the ripe avocado with lemon juice, salt, and pepper.",
      "Spread generously over toast and garnish with chilli flakes."
    ]
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
    instructions: [
      "Cook quinoa according to instructions and steam broccoli florets.",
      "Slice the cucumber and dice the avocado.",
      "Assemble quinoa, vegetables, and drizzle with fresh yogurt dressing."
    ]
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
    instructions: [
      "Spoon half of the Greek yogurt into a dessert glass.",
      "Layer with mixed berries and granola.",
      "Top with remaining yogurt, drizzle with honey, and serve chilled."
    ]
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
    instructions: [
      "Boil pasta in salted water until al dente.",
      "Toss chopped zucchini, peppers, and tomatoes with olive oil and roast at 200°C for 20 mins.",
      "Combine drained pasta with roasted veggies and season to taste."
    ]
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
    instructions: [
      "Blend all ingredients in a blender until smooth batter forms.",
      "Pour batter in small circles onto a warm non-stick skillet.",
      "Flip when bubbles appear on the surface and cook both sides until golden."
    ]
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
    instructions: [
      "Rinse and thoroughly drain cooked chickpeas.",
      "Chop cucumbers, tomatoes, and red onions into uniform bite-sized cubes.",
      "Whisk olive oil and lemon juice, toss with salad, and chill for 10 minutes."
    ]
  }
];

export const initialMeals = [
  { id: 101, date: dateKey(today), type: "Breakfast", title: "Banana Oat Pancakes", time: "08:30", calories: 350, recipeId: 5 },
  { id: 102, date: dateKey(today), type: "Lunch", title: "Chickpea Power Salad", time: "13:15", calories: 390, recipeId: 6 },
  { id: 103, date: dateKey(today), type: "Dinner", title: "Roasted Veggie Pasta", time: "20:00", calories: 520, recipeId: 4 }
];

export const initialGroceries = [
  { id: 1, name: "Ripe avocados", amount: "3 pieces", category: "Produce", done: false },
  { id: 2, name: "Greek yogurt tub", amount: "500g", category: "Dairy", done: true },
  { id: 3, name: "Whole-wheat penne", amount: "1 pack", category: "Pantry", done: false },
  { id: 4, name: "Fresh blueberries", amount: "1 box", category: "Produce", done: false },
  { id: 5, name: "Rolled oats", amount: "1 kg", category: "Pantry", done: true }
];

export const initialExpenses = [
  { id: 1, title: "Supermarket Weekly Groceries", amount: 1450, category: "Groceries", date: dateKey(today) },
  { id: 2, title: "Fresh Vegetables Market", amount: 380, category: "Produce", date: dateKey(today) },
  { id: 3, title: "Artisan Sourdough Bakery", amount: 220, category: "Bakery", date: dateKey(today) }
];

export const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
export const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];
export const groceryCategories = ["Produce", "Dairy", "Bakery", "Pantry", "Meat", "Snacks", "Other"];
export const expenseCategories = ["Groceries", "Produce", "Dining Out", "Bakery", "Beverages", "Other"];

export const iconForMeal = (type) => {
  switch (type) {
    case "Breakfast": return Sunrise;
    case "Lunch": return Sun;
    case "Dinner": return Moon;
    default: return Coffee;
  }
};

export const blankRecipe = {
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
