import './RatingStars.css';

export default function RatingStars({ value, onChange, readonly = false }) {
  return (
    <div className={`rating-stars ${readonly ? 'readonly' : ''}`}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <button
          key={star}
          type="button"
          className={star <= value ? 'filled' : ''}
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          aria-label={`Rate ${star} out of 10`}
        >
          ★
        </button>
      ))}
      {value > 0 && <span className="rating-value">{value}/10</span>}
    </div>
  );
}
