import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Search movies...' }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search movies"
      />
    </div>
  );
}
