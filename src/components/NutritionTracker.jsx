import { useMemo, useState } from "react";
import {
  Activity, ArrowLeft, ArrowRight, Beef, CalendarDays, Check, CircleHelp,
  Egg, Fish, Leaf, Pencil, Plus, Salad, ShieldAlert, Trash2, Utensils
} from "lucide-react";
import { dateKey, prettyDate } from "../utils/dateUtils";
import { getDailyNutrition, getRecipeNutrition } from "../utils/nutrition";
import { proteinFoodSuggestions } from "../constants/nutritionData";
import { mealTypes } from "../constants/initialData";
import {
  activityLevels,
  calculateNutritionTargets,
  nutritionGoals,
  validateNutritionStep
} from "../utils/nutritionCalculator";
import FoodLogModal from "./Modals/FoodLogModal";

const proteinIcons = {
  Vegetarian: Leaf,
  "Non-vegetarian": Beef
};

const shiftDate = (key, amount) => {
  const date = new Date(`${key}T12:00:00`);
  date.setDate(date.getDate() + amount);
  return dateKey(date);
};

const displayAmount = (value) => Math.round(value * 10) / 10;

export default function NutritionTracker({
  todayKey,
  meals,
  nutritionEntries,
  recipes,
  groceries = [],
  calorieTarget,
  setCalorieTarget,
  nutritionProfile,
  setNutritionProfile,
  customFoods,
  onSaveCustomFood,
  onSaveFood,
  onDeleteFood,
  onEditMeal,
  onDeleteMeal,
  onToggleMealEaten
}) {
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [entryToEdit, setEntryToEdit] = useState(null);
  const [suggestedFood, setSuggestedFood] = useState(null);
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(nutritionProfile.calculationComplete ? 0 : 1);
  const [wizardError, setWizardError] = useState("");

  const targets = useMemo(
    () => calculateNutritionTargets(nutritionProfile),
    [nutritionProfile]
  );

  const daily = useMemo(
    () => getDailyNutrition({
      date: selectedDate,
      today: todayKey,
      meals,
      nutritionEntries,
      recipes,
      customFoods
    }),
    [meals, nutritionEntries, recipes, customFoods, selectedDate, todayKey]
  );
  const isMinor = Number(nutritionProfile.age) > 0 && Number(nutritionProfile.age) < 18;
  const isRestricted = isMinor || nutritionProfile.specialCircumstance;
  const proteinTarget = Number(nutritionProfile.proteinTarget) > 0
    ? Number(nutritionProfile.proteinTarget)
    : null;
  const savedCalorieTarget = Number(calorieTarget) > 0 ? Number(calorieTarget) : null;
  const historyDays = useMemo(
    () => Array.from({ length: 7 }, (_, index) => shiftDate(todayKey, index - 6)),
    [todayKey]
  );
  const mealBreakdown = useMemo(
    () => mealTypes.map((mealType) => {
      const entries = daily.entries.filter((entry) => entry.mealType === mealType);
      return {
        mealType,
        calories: entries.some((entry) => entry.calories !== null)
          ? entries.reduce((sum, entry) => sum + (entry.calories || 0), 0)
          : null,
        protein: entries.some((entry) => entry.protein !== null)
          ? entries.reduce((sum, entry) => sum + (entry.protein || 0), 0)
          : null,
        count: entries.length
      };
    }),
    [daily.entries]
  );

  const updateProfile = (key, value) => {
    setNutritionProfile((current) => ({ ...current, [key]: value }));
  };

  const startCalculator = () => {
    setWizardError("");
    updateProfile("calculationComplete", false);
    setWizardStep(1);
  };

  const continueCalculator = () => {
    const error = validateNutritionStep(nutritionProfile, wizardStep);
    if (error) {
      setWizardError(error);
      return;
    }
    setWizardError("");
    if (wizardStep === 1 && (Number(nutritionProfile.age) < 18 || nutritionProfile.specialCircumstance)) {
      updateProfile("calculationComplete", true);
      setWizardStep(4);
      return;
    }
    if (wizardStep === 3) {
      updateProfile("calculationComplete", true);
      setWizardStep(4);
      return;
    }
    setWizardStep((step) => step + 1);
  };

  const applyCalorieReference = (value) => {
    if (targets.status !== "ready" || !Number.isFinite(value) || value <= 0) return;
    setCalorieTarget(Math.round(value));
  };

  const useProteinReference = () => {
    if (!["ready", "partial"].includes(targets.status) || !targets.proteinGrams) return;
    updateProfile("proteinTarget", String(targets.proteinGrams));
  };

  const recipeSuggestions = useMemo(() => {
    const availableIngredients = groceries
      .filter((item) => item.done !== true && typeof item.name === "string")
      .map((item) => item.name.trim().toLowerCase())
      .filter(Boolean);
    const dietaryTag = ["vegetarian", "vegan", "non-vegetarian"].includes(nutritionProfile.dietaryPreference)
      ? nutritionProfile.dietaryPreference
      : "";
    return recipes
      .map((recipe) => {
        const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
        const availableCount = ingredients.filter((ingredient) => {
          const text = String(ingredient).trim().toLowerCase();
          return text && availableIngredients.some((name) => text.includes(name) || name.includes(text));
        }).length;
        return {
          recipe,
          nutrition: getRecipeNutrition(recipe, customFoods),
          availableCount
        };
      })
      .filter(({ recipe, nutrition, availableCount }) => (
        nutrition.calories !== null
        && (nutrition.protein !== null || nutrition.calories !== null)
        && (!dietaryTag || recipe.dietaryTags?.includes(dietaryTag))
        && (availableIngredients.length === 0 || availableCount > 0)
      ))
      .sort((left, right) => right.availableCount - left.availableCount
        || (right.nutrition.protein || 0) - (left.nutrition.protein || 0))
      .slice(0, 3);
  }, [recipes, customFoods, groceries, nutritionProfile.dietaryPreference]);

  const openNewFood = (food = null) => {
    setEntryToEdit(null);
    setSuggestedFood(food);
    setFoodModalOpen(true);
  };

  const closeFoodModal = () => {
    setEntryToEdit(null);
    setSuggestedFood(null);
    setFoodModalOpen(false);
  };

  const handleFoodSave = (payload) => {
    onSaveFood(payload);
    closeFoodModal();
  };

  return (
    <>
      <div className="page-heading nutrition-page-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /><span>SMART NUTRITION CALCULATOR</span></div>
          <h1>Understand your nutrition</h1>
          <p>Explore careful estimates, then log what you actually eat. Planned meals are never counted as eaten.</p>
        </div>
        <button className="btn btn-green" onClick={() => openNewFood()}>
          <Plus size={17} /> Log food eaten
        </button>
      </div>

      {wizardStep > 0 && wizardStep < 4 && (
        <section className="nutrition-wizard">
          <div className="nutrition-section-heading">
            <div>
              <span className="eyebrow">STEP {wizardStep} OF 3</span>
              <h2>{wizardStep === 1 ? "A little about you" : wizardStep === 2 ? "Measurements" : "Your routine and goal"}</h2>
              <p>Estimates only. You can skip optional details and change these choices later.</p>
            </div>
            <div className="nutrition-wizard-progress" aria-label={`Step ${wizardStep} of 3`}>
              {[1, 2, 3].map((step) => <span className={wizardStep >= step ? "active" : ""} key={step} />)}
            </div>
          </div>

          {wizardStep === 1 && (
            <div className="nutrition-wizard-fields">
              <label>
                How old are you?
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={nutritionProfile.age}
                  onChange={(event) => updateProfile("age", event.target.value)}
                  placeholder="Age in years"
                  autoFocus
                />
              </label>
              {Number(nutritionProfile.age) >= 18 && (
                <label className="nutrition-profile-wide">
                  Do any of these apply: pregnancy, breastfeeding, or a medical condition affecting nutrition?
                  <select
                    value={nutritionProfile.specialCircumstance ? "yes" : "no"}
                    onChange={(event) => updateProfile("specialCircumstance", event.target.value === "yes")}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes — show professional-guidance information instead</option>
                  </select>
                </label>
              )}
              {Number(nutritionProfile.age) > 0 && Number(nutritionProfile.age) < 18 && (
                <p className="nutrition-safety-note minor nutrition-profile-wide">
                  MealMate won’t calculate calorie, weight-change, or adult sports-protein targets for anyone under 18.
                </p>
              )}
            </div>
          )}

          {wizardStep === 2 && (
            <div className="nutrition-wizard-fields">
              <label>
                Height unit
                <select value={nutritionProfile.heightUnit} onChange={(event) => {
                  const unit = event.target.value;
                  if (unit === nutritionProfile.heightUnit) return;
                  if (unit === "ft-in" && Number(nutritionProfile.heightCm) > 0) {
                    const inches = Number(nutritionProfile.heightCm) / 2.54;
                    updateProfile("heightFeet", String(Math.floor(inches / 12)));
                    updateProfile("heightInches", String(Math.round((inches % 12) * 10) / 10));
                  } else if (unit === "cm" && (Number(nutritionProfile.heightFeet) > 0 || Number(nutritionProfile.heightInches) > 0)) {
                    updateProfile("heightCm", String(Math.round((Number(nutritionProfile.heightFeet || 0) * 12 + Number(nutritionProfile.heightInches || 0)) * 2.54 * 10) / 10));
                  }
                  updateProfile("heightUnit", unit);
                }}>
                  <option value="cm">Centimetres</option>
                  <option value="ft-in">Feet and inches</option>
                </select>
              </label>
              {nutritionProfile.heightUnit === "cm" ? (
                <label>Height (cm)
                  <input type="number" min="100" max="250" step="0.1" value={nutritionProfile.heightCm} onChange={(event) => updateProfile("heightCm", event.target.value)} placeholder="e.g. 170" />
                </label>
              ) : (
                <div className="nutrition-wizard-inline">
                  <label>Height (feet)<input type="number" min="0" max="8" value={nutritionProfile.heightFeet} onChange={(event) => updateProfile("heightFeet", event.target.value)} placeholder="5" /></label>
                  <label>Height (inches)<input type="number" min="0" max="11.9" step="0.1" value={nutritionProfile.heightInches} onChange={(event) => updateProfile("heightInches", event.target.value)} placeholder="7" /></label>
                </div>
              )}
              <label>
                Weight unit
                <select value={nutritionProfile.weightUnit} onChange={(event) => {
                  const unit = event.target.value;
                  if (unit === nutritionProfile.weightUnit) return;
                  if (unit === "lb" && Number(nutritionProfile.weightKg) > 0) {
                    updateProfile("weightLb", String(Math.round(Number(nutritionProfile.weightKg) / 0.45359237 * 10) / 10));
                  } else if (unit === "kg" && Number(nutritionProfile.weightLb) > 0) {
                    updateProfile("weightKg", String(Math.round(Number(nutritionProfile.weightLb) * 0.45359237 * 10) / 10));
                  }
                  updateProfile("weightUnit", unit);
                }}>
                  <option value="kg">Kilograms</option>
                  <option value="lb">Pounds</option>
                </select>
              </label>
              <label>Current weight ({nutritionProfile.weightUnit})
                <input
                  type="number"
                  min={nutritionProfile.weightUnit === "kg" ? "25" : "55"}
                  max={nutritionProfile.weightUnit === "kg" ? "400" : "880"}
                  step="0.1"
                  value={nutritionProfile.weightUnit === "kg" ? nutritionProfile.weightKg : nutritionProfile.weightLb}
                  onChange={(event) => updateProfile(nutritionProfile.weightUnit === "kg" ? "weightKg" : "weightLb", event.target.value)}
                  placeholder={nutritionProfile.weightUnit === "kg" ? "e.g. 70" : "e.g. 154"}
                />
              </label>
              <fieldset className="nutrition-equation-field nutrition-profile-wide">
                <legend>Equation information</legend>
                <p>Mifflin–St Jeor uses a sex-specific constant. Choose the equation that best fits your physiology, or skip this calorie estimate.</p>
                {[
                  ["female", "Female equation"],
                  ["male", "Male equation"],
                  ["unspecified", "Prefer not to use a sex-specific equation"]
                ].map(([value, label]) => (
                  <label key={value}>
                    <input type="radio" name="equationSex" value={value} checked={nutritionProfile.equationSex === value} onChange={() => updateProfile("equationSex", value)} />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="nutrition-wizard-fields">
              <label>Usual activity level
                <select value={nutritionProfile.activityLevel} onChange={(event) => updateProfile("activityLevel", event.target.value)}>
                  <option value="">Choose activity level</option>
                  {activityLevels.map((level) => <option value={level.id} key={level.id}>{level.label} — {level.description}</option>)}
                </select>
                <small>Consider your overall daily movement as well as exercise frequency.</small>
              </label>
              <label>Primary nutrition goal
                <select value={nutritionProfile.goal} onChange={(event) => updateProfile("goal", event.target.value)}>
                  <option value="">Choose a goal</option>
                  {nutritionGoals.map((goal) => <option value={goal.id} key={goal.id}>{goal.label}</option>)}
                </select>
              </label>
              <label>Workouts per week (optional)
                <input type="number" min="0" max="14" value={nutritionProfile.workoutFrequency} onChange={(event) => updateProfile("workoutFrequency", event.target.value)} placeholder="Skip if unsure" />
              </label>
              <label>Exercise type (optional)
                <select value={nutritionProfile.exerciseType} onChange={(event) => updateProfile("exerciseType", event.target.value)}>
                  <option value="">Skip</option><option value="walking">Walking</option><option value="cardio">Cardio</option><option value="resistance">Resistance training</option><option value="sports">Sports</option><option value="mixed">Mixed</option><option value="other">Other</option>
                </select>
              </label>
              <label>Dietary preference (optional)
                <select value={nutritionProfile.dietaryPreference} onChange={(event) => updateProfile("dietaryPreference", event.target.value)}>
                  <option value="">No preference</option><option value="vegetarian">Vegetarian</option><option value="vegan">Vegan</option><option value="non-vegetarian">Non-vegetarian</option><option value="other">Other / flexible</option>
                </select>
              </label>
              <label>Workout duration in minutes (optional)
                <input type="number" min="1" max="600" value={nutritionProfile.workoutMinutes} onChange={(event) => updateProfile("workoutMinutes", event.target.value)} placeholder="Skip if unsure" />
              </label>
            </div>
          )}

          {wizardError && <p className="nutrition-wizard-error" role="alert">{wizardError}</p>}
          <div className="nutrition-wizard-actions">
            {wizardStep > 1 && <button className="btn-outline" type="button" onClick={() => { setWizardError(""); setWizardStep((step) => step - 1); }}>Back</button>}
            <button className="btn btn-green" type="button" onClick={continueCalculator}>
              {wizardStep === 3 || Number(nutritionProfile.age) < 18 || nutritionProfile.specialCircumstance ? "See my information" : "Continue"}
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      {(wizardStep === 4 || (wizardStep === 0 && nutritionProfile.calculationComplete)) && (
        <section className="nutrition-results">
          <div className="nutrition-section-heading">
            <div><span className="eyebrow">YOUR ESTIMATES</span><h2>Nutrition reference</h2><p>These are estimates, not medical advice or measured requirements.</p></div>
            <button type="button" className="btn-outline" onClick={startCalculator}><Pencil size={14} /> Edit profile</button>
          </div>
          {targets.status === "minor" ? (
            <p className="nutrition-safety-note minor">Because you’re under 18, MealMate does not show adult calorie targets, weight-loss/surplus suggestions, or adult sports-protein targets. Aim for balanced meals and seek individualized guidance from a qualified healthcare professional or registered dietitian.</p>
          ) : targets.status === "professional" ? (
            <p className="nutrition-safety-note minor">Generic calculator targets aren’t appropriate when pregnancy, breastfeeding, or a relevant medical condition applies. Please seek individualized guidance from a qualified healthcare professional or registered dietitian.</p>
          ) : targets.status === "incomplete" ? (
            <p className="nutrition-safety-note">Complete your adult profile to see an estimate. You can still use the food log without setting targets.</p>
          ) : (
            <>
              <div className="nutrition-result-cards">
                {targets.bmr !== null && (
                  <article><span>Estimated BMR</span><strong>{Math.round(targets.bmr)} <small>kcal/day</small></strong><p>Estimated energy expenditure at rest; this is not an intake target.</p></article>
                )}
                {targets.maintenanceCalories !== null && (
                  <article><span>Estimated maintenance</span><strong>{Math.round(targets.maintenanceCalories)} <small>kcal/day</small></strong><p>BMR × {targets.activity.factor}. Actual needs can differ with daily movement and individual variation.</p><button className="btn-outline" type="button" onClick={() => applyCalorieReference(targets.maintenanceCalories)}>Use maintenance reference</button></article>
                )}
                {targets.suggestedCalories !== null && (
                  <article><span>Goal estimate: {targets.goal.label}</span><strong>{Math.round(targets.suggestedCalories)} <small>kcal/day</small></strong><p>{targets.calorieAdjustment === 0 ? "No calorie adjustment applied." : `${Math.round(Math.abs(targets.calorieAdjustment) * 100)}% ${targets.calorieAdjustment < 0 ? "below" : "above"} estimated maintenance; this is a modest illustrative adjustment.`}</p><button className="btn-outline" type="button" onClick={() => applyCalorieReference(targets.suggestedCalories)}>Use goal estimate as reference</button></article>
                )}
                {targets.proteinGrams !== null && (
                  <article><span>Protein reference</span><strong>{targets.proteinGrams} <small>g/day</small></strong><p>{targets.proteinFactor} g/kg × {Math.round(targets.weightKg * 10) / 10} kg body weight. This is a reference, not a medical prescription.</p><button className="btn-outline" type="button" onClick={useProteinReference}>Use as protein reference</button></article>
                )}
              </div>
              <p className="nutrition-safety-note">
                {targets.status === "partial"
                  ? `Because you chose not to use a sex-specific equation, no calorie estimate is shown. The protein reference uses ${targets.proteinFactor} g/kg.`
                  : `Mifflin–St Jeor estimates adult BMR; maintenance = BMR × selected activity factor. Goal estimates apply a conservative ±10% fat-loss/bulk or +5% muscle-building adjustment. The protein reference uses ${targets.proteinFactor} g/kg.`} Discuss weight-change targets or medical dietary needs with a qualified professional.
              </p>
            </>
          )}
          {["ready", "partial"].includes(targets.status) && recipeSuggestions.length > 0 && (
            <div className="nutrition-recipe-suggestions">
              <h3>Recipes with recorded nutrition</h3>
              <p>Review ingredients and dietary suitability yourself; MealMate cannot verify recipe tags or ingredient substitutions.</p>
              {recipeSuggestions.map(({ recipe, nutrition }) => (
                <article key={recipe.id}><strong>{recipe.title}</strong><span>{Math.round(nutrition.calories)} kcal · {nutrition.protein === null ? "protein n/a" : `${Math.round(nutrition.protein)} g protein`} per serving · {recipe.time} min</span></article>
              ))}
            </div>
          )}
          {["ready", "partial"].includes(targets.status)
            && nutritionProfile.dietaryPreference
            && nutritionProfile.dietaryPreference !== "other"
            && recipeSuggestions.length === 0 && (
              <p className="nutrition-field-note">No recipes currently have matching verified dietary tags and nutrition data. Add a recipe with accurate ingredient and dietary details to get suggestions.</p>
            )}
        </section>
      )}

      {wizardStep === 0 && nutritionProfile.calculationComplete === false && (
        <button className="btn-outline nutrition-calculator-start" type="button" onClick={startCalculator}>Set up nutrition estimates</button>
      )}

      <section className="nutrition-date-bar">
        <button className="icon-button" aria-label="Previous day" onClick={() => setSelectedDate((date) => shiftDate(date, -1))}>
          <ArrowLeft size={17} />
        </button>
        <div>
          <CalendarDays size={17} />
          <strong>{selectedDate === todayKey ? "Today" : prettyDate(new Date(`${selectedDate}T12:00:00`), { weekday: "long", day: "numeric", month: "long" })}</strong>
          <span>{prettyDate(new Date(`${selectedDate}T12:00:00`), { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
        <button
          className="icon-button"
          aria-label="Next day"
          disabled={selectedDate >= todayKey}
          onClick={() => setSelectedDate((date) => shiftDate(date, 1))}
        >
          <ArrowRight size={17} />
        </button>
        {selectedDate !== todayKey && (
          <button className="quiet-link" onClick={() => setSelectedDate(todayKey)}>Back to today</button>
        )}
      </section>

      <section className="nutrition-summary-grid">
        <article className="nutrition-summary-card calories">
          <div className="nutrition-summary-icon"><Activity size={19} /></div>
          <div className="nutrition-summary-label">Calories recorded</div>
          <strong>{Math.round(daily.calories)} <small>kcal</small></strong>
          {!isRestricted && savedCalorieTarget && (
            <>
              <div className="nutrition-progress-track"><span style={{ width: `${Math.min(100, (daily.calories / savedCalorieTarget) * 100)}%` }} /></div>
              <small>{Math.max(0, Math.round(savedCalorieTarget - daily.calories))} kcal to your optional reference</small>
            </>
          )}
          {isRestricted && <small>Intake record only — no calorie target is shown.</small>}
        </article>
        <article className="nutrition-summary-card protein">
          <div className="nutrition-summary-icon"><Leaf size={19} /></div>
          <div className="nutrition-summary-label">Protein recorded</div>
          <strong>{displayAmount(daily.protein)} <small>g</small></strong>
          {!isRestricted && proteinTarget && (
            <>
              <div className="nutrition-progress-track"><span style={{ width: `${Math.min(100, (daily.protein / proteinTarget) * 100)}%` }} /></div>
              <small>{Math.max(0, displayAmount(proteinTarget - daily.protein))} g to your optional reference</small>
            </>
          )}
          {isRestricted && <small>Intake record only — no protein target is shown.</small>}
        </article>
        <div className="nutrition-summary-note">
          <CircleHelp size={17} />
          <span>{daily.entries.length} food {daily.entries.length === 1 ? "entry" : "entries"} recorded. Recipe nutrition is approximate and varies with ingredients and portions.</span>
        </div>
      </section>

      {daily.hasUnknownProtein && (
        <p className="nutrition-unknown-note">
          Some logged foods have no protein value, so the protein total includes only entries with a recorded estimate.
        </p>
      )}
      {daily.hasUnknownCalories && (
        <p className="nutrition-unknown-note">
          Some logged foods have no calorie value, so the calorie total includes only entries with a recorded estimate.
        </p>
      )}

      <section className="nutrition-meal-breakdown" aria-label="Nutrition by meal">
        {mealBreakdown.map((meal) => (
          <article key={meal.mealType}>
            <span>{meal.mealType}</span>
            <strong>{meal.calories === null ? "—" : Math.round(meal.calories)} <small>kcal</small></strong>
            <small>{meal.protein === null ? "—" : `${displayAmount(meal.protein)}g`} protein · {meal.count} entries</small>
          </article>
        ))}
      </section>

      <section className="nutrition-history-card">
        <div className="nutrition-section-heading">
          <div><h2>Recent daily history</h2><p>Select a day to review its food log.</p></div>
          <span>Last 7 days</span>
        </div>
        <div className="nutrition-history-grid">
          {historyDays.map((date) => {
            const day = getDailyNutrition({ date, today: todayKey, meals, nutritionEntries, recipes, customFoods });
            const active = selectedDate === date;
            return (
              <button
                type="button"
                key={date}
                className={`nutrition-history-day ${active ? "active" : ""}`}
                onClick={() => setSelectedDate(date)}
              >
                <span>{prettyDate(new Date(`${date}T12:00:00`), { weekday: "short" })}</span>
                <strong>{Math.round(day.calories)}</strong>
                <small>kcal · {displayAmount(day.protein)}g protein</small>
              </button>
            );
          })}
        </div>
      </section>

      <div className="nutrition-main-grid">
        <section className="nutrition-log-card">
          <div className="nutrition-section-heading">
            <div><h2>{selectedDate === todayKey ? "Today's food log" : "Food log"}</h2><p>Only foods and meals you mark as eaten appear here.</p></div>
            <button className="btn-outline" onClick={() => openNewFood()}><Plus size={15} /> Add entry</button>
          </div>

          {daily.entries.length === 0 ? (
            <div className="nutrition-empty">
              <Utensils size={25} />
              <strong>Nothing logged for this day yet</strong>
              <span>Log a recipe or a custom food after you eat it.</span>
              <button className="btn btn-green" onClick={() => openNewFood()}>Log your first food</button>
            </div>
          ) : (
            <div className="nutrition-entry-list">
              {daily.entries.map((entry) => (
                <article className="nutrition-entry" key={entry.id}>
                  <div className="nutrition-entry-icon">{entry.source === "meal" ? <Check size={16} /> : <Utensils size={16} />}</div>
                  <div className="nutrition-entry-copy">
                    <strong>{entry.title}</strong>
                    <span>{entry.mealType} · {displayAmount(entry.servings)} {entry.servings === 1 ? "serving" : "servings"}{entry.servingDescription ? ` (${entry.servingDescription})` : ""}</span>
                  </div>
                  <div className="nutrition-entry-values">
                    <strong>{entry.calories === null ? "—" : Math.round(entry.calories)} <small>kcal</small></strong>
                    <span>{entry.protein === null ? "Protein n/a" : `${displayAmount(entry.protein)} g protein`}</span>
                  </div>
                  <div className="nutrition-entry-actions">
                    {entry.source === "meal" ? (
                      <>
                        <button title="Edit logged meal" onClick={() => onEditMeal(entry.sourceId)}><Pencil size={14} /></button>
                        <button title="Undo eaten status" onClick={() => onToggleMealEaten(entry.sourceId)}><Check size={14} /></button>
                        <button title="Delete logged meal" onClick={() => onDeleteMeal(entry.sourceId)}><Trash2 size={14} /></button>
                      </>
                    ) : (
                      <>
                        <button title="Edit food entry" onClick={() => {
                          const item = nutritionEntries.find((candidate) => String(candidate.id) === String(entry.sourceId));
                          if (item) {
                            setEntryToEdit(item);
                            setFoodModalOpen(true);
                          }
                        }}><Pencil size={14} /></button>
                        <button title="Delete food entry" onClick={() => onDeleteFood(entry.sourceId)}><Trash2 size={14} /></button>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="nutrition-profile-card">
          <div className="nutrition-section-heading">
            <div><h2>Tracker references</h2><p>Use your calculator estimates or enter references provided by your care team.</p></div>
            <ShieldAlert size={18} />
          </div>
          <div className="nutrition-profile-grid">
            {!isRestricted && (
              <>
                <label>Optional protein reference (g/day)
                  <input type="number" min="1" max="500" value={nutritionProfile.proteinTarget} onChange={(event) => updateProfile("proteinTarget", event.target.value)} placeholder="Set your own" />
                </label>
                <label>Optional calorie reference (kcal/day)
                  <input type="number" min="1" max="10000" value={calorieTarget || ""} onChange={(event) => setCalorieTarget(event.target.value === "" ? null : Number(event.target.value))} placeholder="Set your own" />
                </label>
              </>
            )}
            {(isMinor || nutritionProfile.specialCircumstance) && (
              <p className="nutrition-safety-note minor nutrition-profile-wide">
                Nutrition targets are not shown for this profile. Use food logging for records only and seek individualized professional guidance.
              </p>
            )}
          </div>
          {!isRestricted && (
            <p className="nutrition-safety-note">Only references you choose are used for tracker progress. Meals and foods must be explicitly logged as eaten to count toward totals.</p>
          )}
        </section>
      </div>

      <section className="protein-suggestions-card">
        <div className="nutrition-section-heading">
          <div>
            <h2>Protein food examples</h2>
            <p>Values are calculated from listed serving weights and USDA FoodData Central records; preparation and portions vary.</p>
            <a href="https://fdc.nal.usda.gov/" target="_blank" rel="noreferrer">USDA FoodData Central</a>
          </div>
          <Salad size={18} />
        </div>
        <div className="protein-suggestion-grid">
          {proteinFoodSuggestions.map((food) => {
            const Icon = proteinIcons[food.preference] || (food.name.toLowerCase().includes("egg") ? Egg : food.name.toLowerCase().includes("fish") ? Fish : Leaf);
            return (
              <article className="protein-suggestion" key={food.name}>
                <span className={food.preference === "Vegetarian" ? "vegetarian" : "non-vegetarian"}><Icon size={15} /></span>
                <div><strong>{food.name}</strong><small>{food.serving}</small></div>
                <b>{food.protein} g</b>
                <button type="button" onClick={() => openNewFood(food)} aria-label={`Log ${food.name}`}>Log</button>
              </article>
            );
          })}
        </div>
      </section>

      <FoodLogModal
        isOpen={foodModalOpen}
        onClose={closeFoodModal}
        recipes={recipes}
        customFoods={customFoods}
        onSaveCustomFood={onSaveCustomFood}
        entryToEdit={entryToEdit}
        initialFood={suggestedFood}
        todayKey={todayKey}
        initialDate={selectedDate}
        onSave={handleFoodSave}
      />
    </>
  );
}
