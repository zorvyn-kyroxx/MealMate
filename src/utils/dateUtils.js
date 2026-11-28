// Date helper utilities for MealMate

export const dayStart = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const weekday = (d.getDay() + 6) % 7; // Monday = 0, Sunday = 6
  d.setDate(d.getDate() - weekday);
  return d;
};

export const dateKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const expensesInMonth = (expenses, yearMonth) => {
  if (!Array.isArray(expenses) || !/^\d{4}-\d{2}$/.test(yearMonth)) return [];
  return expenses.filter((expense) => (
    typeof expense?.date === "string"
    && /^\d{4}-\d{2}-\d{2}$/.test(expense.date)
    && expense.date.slice(0, 7) === yearMonth
  ));
};

export const prettyDate = (date, options = { day: "numeric", month: "short" }) =>
  new Intl.DateTimeFormat("en-IN", options).format(date);

export const readStore = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    if (!value) return fallback;
    const parsed = JSON.parse(value);

    if (Array.isArray(fallback)) return Array.isArray(parsed) ? parsed : fallback;
    if (typeof fallback === "object" && fallback !== null) {
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : fallback;
    }
    if (typeof parsed !== typeof fallback) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
};

export const writeStore = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const isCompleteWorkspaceData = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;
  return [
    "meals",
    "recipes",
    "groceries",
    "expenses",
    "favorites"
  ].every((key) => Array.isArray(data[key]))
    && typeof data.budget === "number"
    && Number.isFinite(data.budget)
    && data.budget >= 0;
};
