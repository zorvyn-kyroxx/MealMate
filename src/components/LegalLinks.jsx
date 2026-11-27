const links = [
  ["about", "About MealMate"],
  ["contact", "Contact"],
  ["privacy", "Privacy Policy"],
  ["terms", "Terms and Conditions"],
  ["nutrition", "Nutrition Disclaimer"],
  ["advertising", "Advertising Disclosure"],
  ["grievance", "Grievance Information"]
];

export default function LegalLinks({ onOpenLegal, className = "" }) {
  return (
    <nav className={className} aria-label="About, legal, and support">
      {links.map(([tab, label]) => (
        <button type="button" key={tab} onClick={() => onOpenLegal(tab)}>
          {label}
        </button>
      ))}
    </nav>
  );
}
