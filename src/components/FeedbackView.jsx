import { useState } from "react";
import { Bug, Lightbulb, MessageSquare, Send, Star, Trash2 } from "lucide-react";
import { prettyDate } from "../utils/dateUtils";

const feedbackTypes = [
  { value: "general", label: "General feedback", icon: MessageSquare },
  { value: "idea", label: "Feature idea", icon: Lightbulb },
  { value: "bug", label: "Report a problem", icon: Bug }
];

export default function FeedbackView({ entries, onSubmit, onDelete }) {
  const [type, setType] = useState("general");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanMessage = message.trim();
    if (cleanMessage.length < 10) return;
    onSubmit({ type, rating: rating || null, message: cleanMessage });
    setType("general");
    setRating(0);
    setMessage("");
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /><span>HELP US MAKE MEALMATE BETTER</span></div>
          <h1>Share your feedback</h1>
          <p>Tell us what’s working, what could be better, or what you’d love to see next.</p>
        </div>
      </div>

      <div className="feedback-layout">
        <section className="feedback-form-card">
          <div className="feedback-heading">
            <span className="feedback-icon"><MessageSquare size={19} /></span>
            <div><h2>What’s on your mind?</h2><p>Your feedback helps shape future improvements.</p></div>
          </div>

          <form onSubmit={handleSubmit}>
            <fieldset className="feedback-type-options">
              <legend>Feedback type</legend>
              {feedbackTypes.map(({ value, label, icon: Icon }) => (
                <button
                  type="button"
                  key={value}
                  className={type === value ? "selected" : ""}
                  aria-pressed={type === value}
                  onClick={() => setType(value)}
                >
                  <Icon size={16} /><span>{label}</span>
                </button>
              ))}
            </fieldset>

            <fieldset className="feedback-rating">
              <legend>How is your experience? <span>Optional</span></legend>
              <div role="radiogroup" aria-label="Rate your experience from 1 to 5">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    key={value}
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
                    className={rating >= value ? "active" : ""}
                    onClick={() => setRating(rating === value ? 0 : value)}
                  >
                    <Star size={21} fill={rating >= value ? "currentColor" : "none"} />
                  </button>
                ))}
                {rating > 0 && <span>{rating} of 5</span>}
              </div>
            </fieldset>

            <label className="feedback-message-label" htmlFor="feedback-message">Your feedback</label>
            <textarea
              id="feedback-message"
              required
              minLength={10}
              maxLength={1000}
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Share a suggestion, describe a problem, or tell us what you enjoy..."
            />
            <div className="feedback-form-footer">
              <span>{message.length}/1000 · At least 10 characters</span>
              <button className="btn btn-green" type="submit" disabled={message.trim().length < 10}>
                <Send size={15} /> Save feedback
              </button>
            </div>
          </form>

          <p className="feedback-privacy-note">
            Feedback is saved only in this browser and is not sent to the MealMate team. Don’t include private or sensitive information.
          </p>
        </section>

        <aside className="feedback-side-card">
          <span className="feedback-side-icon"><Lightbulb size={20} /></span>
          <h2>Every idea counts</h2>
          <p>Bug reports, small details, and big ideas all help make MealMate more useful for everyday meal planning.</p>
          <div className="feedback-tip"><strong>Helpful details</strong><span>What happened, what you expected, and the page or device you were using.</span></div>
          <div className="feedback-local-count"><MessageSquare size={15} /><span>{entries.length} saved {entries.length === 1 ? "submission" : "submissions"} on this device</span></div>
        </aside>
      </div>

      {entries.length > 0 && (
        <section className="feedback-history">
          <div className="feedback-history-heading">
            <div><h2>Your saved feedback</h2><p>Only visible in this browser.</p></div>
          </div>
          <div className="feedback-history-list">
            {entries.map((entry) => {
              const feedbackType = feedbackTypes.find((item) => item.value === entry.type) || feedbackTypes[0];
              const Icon = feedbackType.icon;
              return (
                <article className="feedback-entry" key={entry.id}>
                  <div className="feedback-entry-icon"><Icon size={16} /></div>
                  <div className="feedback-entry-copy">
                    <div className="feedback-entry-meta">
                      <strong>{feedbackType.label}</strong>
                      <span>{prettyDate(new Date(entry.createdAt), { day: "numeric", month: "short", year: "numeric" })}</span>
                      {entry.rating && <span className="feedback-entry-rating"><Star size={12} fill="currentColor" /> {entry.rating}/5</span>}
                    </div>
                    <p>{entry.message}</p>
                  </div>
                  <button type="button" className="feedback-delete" title="Delete saved feedback" aria-label="Delete saved feedback" onClick={() => onDelete(entry.id)}>
                    <Trash2 size={15} />
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
