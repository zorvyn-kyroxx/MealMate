import { useState } from "react";
import { Check, Plus, ShoppingBasket, Trash2, Leaf, ArrowUpRight, Share2, Pencil } from "lucide-react";
import { groceryCategories } from "../constants/initialData";

export default function GroceriesView({
  groceries,
  completedGroceries,
  groceryProgress,
  onToggleGroceryDone,
  onDeleteGrocery,
  onClearCompletedGroceries,
  onOpenGroceryModal,
  onOpenEditGrocery,
  onNavigate,
  showNotification
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = groceries.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const copyToClipboard = () => {
    if (groceries.length === 0) {
      showNotification("Your grocery list is empty!");
      return;
    }

    const lines = ["🛒 MealMate Shopping Checklist:\n"];
    groceries.forEach((item) => {
      lines.push(`${item.done ? "☑" : "☐"} ${item.name} (${item.amount}) [${item.category}]`);
    });
    lines.push(`\nProgress: ${completedGroceries}/${groceries.length} items purchased (${groceryProgress}%)`);

    navigator.clipboard.writeText(lines.join("\n"))
      .then(() => showNotification("Shopping list copied to clipboard!"))
      .catch(() => showNotification("Could not copy to clipboard."));
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>SHOP SMARTER</span>
          </div>
          <h1>Grocery Checklist</h1>
          <p>Organise items by supermarket aisle, check off ingredients while shopping, and share your list in a tap.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn-outline" onClick={copyToClipboard} title="Copy list to share">
            <Share2 size={15} /> Copy list
          </button>
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

          {/* Aisle / Category Filter Chips */}
          <div className="chip-group">
            <button
              className={`chip ${selectedCategory === "All" ? "active" : ""}`}
              onClick={() => setSelectedCategory("All")}
            >
              All Aisles <span className="chip-count">{groceries.length}</span>
            </button>
            {groceryCategories.map((cat) => {
              const count = groceries.filter((g) => g.category === cat).length;
              if (count === 0 && selectedCategory !== cat) return null;
              return (
                <button
                  key={cat}
                  className={`chip ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat} <span className="chip-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="grocery-list-heading">
            <h3>Items in {selectedCategory === "All" ? "All Aisles" : selectedCategory}</h3>
            <span>{filteredItems.filter((g) => !g.done).length} remaining</span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <ShoppingBasket size={36} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
              <p>
                {groceries.length === 0
                  ? "Your grocery checklist is empty. Add items or sync them from recipes!"
                  : `No items found in the "${selectedCategory}" aisle.`}
              </p>
              <button className="btn btn-green" onClick={onOpenGroceryModal} style={{ marginTop: 10 }}>
                <Plus size={15} /> Add item to {selectedCategory === "All" ? "checklist" : selectedCategory}
              </button>
            </div>
          ) : (
            <div>
              {filteredItems.map((item) => (
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
                  <div className="grocery-actions">
                    <button
                      className="row-action-btn"
                      onClick={() => onOpenEditGrocery(item)}
                      title="Edit item"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      className="row-action-btn delete-btn"
                      onClick={() => onDeleteGrocery(item.id)}
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
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
