import { Check, Plus, ShoppingBasket, Trash2, Leaf, ArrowUpRight } from "lucide-react";

export default function GroceriesView({
  groceries,
  completedGroceries,
  groceryProgress,
  onToggleGroceryDone,
  onDeleteGrocery,
  onClearCompletedGroceries,
  onOpenGroceryModal,
  onNavigate
}) {
  return (
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
            <button className="btn btn-dark" onClick={onClearCompletedGroceries}>
              <Check size={16} /> Clear completed ({completedGroceries})
            </button>
          )}
          <button className="btn btn-green" onClick={onOpenGroceryModal}>
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
            <span>{groceries.filter((g) => !g.done).length} remaining</span>
          </div>

          {groceries.length === 0 ? (
            <div className="empty-state">
              <ShoppingBasket size={36} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
              <p>Your grocery checklist is empty. Add items or sync them from recipes!</p>
              <button className="btn btn-green" onClick={onOpenGroceryModal} style={{ marginTop: 10 }}>
                <Plus size={15} /> Add first item
              </button>
            </div>
          ) : (
            <div>
              {groceries.map((item) => (
                <div className={`grocery-row ${item.done ? "is-done" : ""}`} key={item.id}>
                  <button
                    className="check-button"
                    onClick={() => onToggleGroceryDone(item.id)}
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
                    onClick={() => onDeleteGrocery(item.id)}
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
            <button onClick={() => onNavigate("Recipes")}>
              View recipes <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="grocery-mini-stat">
            <span>SHOPPING STATUS</span>
            <strong>{groceries.filter((g) => !g.done).length} <small>items left</small></strong>
            <div className="mini-progress">
              <span style={{ width: `${groceryProgress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
