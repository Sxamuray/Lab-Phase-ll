import './UniverseFilter.css';

const options = [
  { value: '', label: 'All Universes' },
  { value: 'Marvel', label: 'Marvel' },
  { value: 'DC', label: 'DC' },
];

export default function UniverseFilter({ value, onChange }) {
  return (
    <div className="universe-filter">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`filter-chip ${value === opt.value ? 'active' : ''} ${opt.value ? opt.value.toLowerCase() : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
