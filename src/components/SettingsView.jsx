import { useState } from "react";
import { Moon, Sun, Download, Upload, RefreshCw, ShieldCheck } from "lucide-react";

export default function SettingsView({
  theme,
  setTheme,
  calorieTarget,
  setCalorieTarget,
  servingSize,
  setServingSize,
  onExportData,
  onImportData,
  onResetData,
  showNotification
}) {
  const [userName, setUserName] = useState("MealMate User");

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        onImportData(parsed);
      } catch {
        showNotification("Invalid JSON backup file.");
      }
    };
    reader.readAsText(file);
    // Reset file input value
    e.target.value = "";
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>CUSTOMISE YOUR WORKSPACE</span>
          </div>
          <h1>Settings & Preferences</h1>
          <p>Personalize your theme, set daily nutrition goals, manage your profile, and export or restore your data.</p>
        </div>
      </div>

      <div className="settings-layout">
        {/* Appearance & Goals */}
        <div className="settings-card">
          <h3>Display & Preferences</h3>
          <p className="subtitle">Configure interface styling and default nutritional goals.</p>

          {/* Theme Toggle */}
          <div className="settings-item">
            <div className="settings-item-copy">
              <strong>Application Theme</strong>
              <span>Switch between Sage Light and Midnight Dark modes</span>
            </div>
            <button
              className="theme-toggle-btn"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>

          {/* Target Daily Calories */}
          <div className="settings-item">
            <div className="settings-item-copy">
              <strong>Target Daily Energy</strong>
              <span>Target calorie allowance per day (kcal)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="number"
                min="1000"
                max="5000"
                step="50"
                value={calorieTarget}
                onChange={(e) => setCalorieTarget(Number(e.target.value) || 2000)}
                style={{ width: 100, textAlign: "right" }}
              />
              <span style={{ fontSize: 11, color: "var(--muted)" }}>kcal</span>
            </div>
          </div>

          {/* Default Servings */}
          <div className="settings-item">
            <div className="settings-item-copy">
              <strong>Default Servings</strong>
              <span>Standard portion size for recipes and meal plans</span>
            </div>
            <select
              value={servingSize}
              onChange={(e) => setServingSize(Number(e.target.value) || 2)}
              style={{ width: 120 }}
            >
              <option value={1}>1 Person</option>
              <option value={2}>2 People</option>
              <option value={4}>4 People (Family)</option>
              <option value={6}>6 People</option>
            </select>
          </div>

          {/* User Profile Info */}
          <div className="settings-item">
            <div className="settings-item-copy">
              <strong>Display Name</strong>
              <span>Name shown on your personal workspace</span>
            </div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ width: 150 }}
            />
          </div>
        </div>

        {/* Data Backup & Cloud Readiness */}
        <div className="settings-card">
          <h3>Data Management & Backup</h3>
          <p className="subtitle">Securely download your entire MealMate workspace or restore from a backup.</p>

          {/* Export JSON */}
          <div className="settings-item">
            <div className="settings-item-copy">
              <strong>Export Backup (JSON)</strong>
              <span>Download all meals, recipes, groceries, and expenses</span>
            </div>
            <button className="btn-outline" onClick={onExportData}>
              <Download size={15} /> Export
            </button>
          </div>

          {/* Import JSON */}
          <div className="settings-item">
            <div className="settings-item-copy">
              <strong>Restore from Backup</strong>
              <span>Load a previously saved MealMate JSON file</span>
            </div>
            <label className="btn-outline" style={{ cursor: "pointer" }}>
              <Upload size={15} /> Import
              <input
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {/* Reset Demo Data */}
          <div className="settings-item">
            <div className="settings-item-copy">
              <strong>Reset to Demo Data</strong>
              <span>Revert to original starter recipes and meals</span>
            </div>
            <button
              className="row-action-btn delete-btn"
              style={{ width: "auto", padding: "6px 12px", height: "auto" }}
              onClick={onResetData}
            >
              <RefreshCw size={13} style={{ marginRight: 6 }} /> Reset
            </button>
          </div>

          {/* Local Storage Privacy Indicator */}
          <div style={{
            marginTop: 18,
            padding: "14px 16px",
            borderRadius: "12px",
            background: "var(--background)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "flex-start",
            gap: 12
          }}>
            <ShieldCheck size={20} color="var(--green)" style={{ flex: "0 0 auto", marginTop: 2 }} />
            <div>
              <strong style={{ fontSize: 11, color: "var(--text)", display: "block" }}>
                100% Client-Side Privacy
              </strong>
              <p style={{ margin: "4px 0 0", fontSize: 10, color: "var(--muted)", lineHeight: 1.6 }}>
                Your data is stored locally in your browser’s LocalStorage. No third party or server has access to your personal food schedule.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
