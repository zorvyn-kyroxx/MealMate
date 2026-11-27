import "./AdSlot.css";

export default function AdSlot({ placement }) {
  return (
    <aside className={`ad-slot ad-slot-${placement}`} aria-label="Reserved advertising space; ads are not enabled">
      <span>Advertising is not active</span>
      <p>This space is reserved for a future contextual ad. No ad scripts or nutrition data are used.</p>
    </aside>
  );
}
