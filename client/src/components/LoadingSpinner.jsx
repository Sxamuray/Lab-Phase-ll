import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="spinner-wrap" role="status" aria-label="Loading">
      <div className="spinner" />
    </div>
  );
}
