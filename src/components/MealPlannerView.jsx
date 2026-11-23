import { Plus, ChevronLeft, ChevronRight, Clock3, Pencil, Trash2 } from "lucide-react";
import { dateKey, prettyDate } from "../utils/dateUtils";

export default function MealPlannerView({
  weekDays,
  todayKey,
  weekRangeLabel,
  meals,
  onPrevWeek,
  onNextWeek,
  onResetToThisWeek,
  onOpenNewMeal,
  onOpenEditMeal,
  onDeleteMeal
}) {
  return (
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
        <button className="btn btn-green" onClick={() => onOpenNewMeal(todayKey)}>
          <Plus size={17} /> Add meal
        </button>
      </div>

      {/* Week Navigation Toolbar */}
      <div className="planner-toolbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="icon-button" onClick={onPrevWeek} title="Previous week">
            <ChevronLeft size={18} />
          </button>
          <button className="btn btn-dark" style={{ minHeight: 36, padding: "0 14px" }} onClick={onResetToThisWeek}>
            Today
          </button>
          <button className="icon-button" onClick={onNextWeek} title="Next week">
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
                        <button title="Edit" onClick={() => onOpenEditMeal(meal)}>
                          <Pencil size={13} />
                        </button>
                        <button title="Delete" onClick={() => onDeleteMeal(meal.id)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}

              <button className="add-inline" onClick={() => onOpenNewMeal(dayK)}>
                <Plus size={14} /> Add meal
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
