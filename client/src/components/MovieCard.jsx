import { Link } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ movie, index = 0 }) {
  return (
    <Link
      to={`/movies/${movie._id}`}
      className="movie-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="movie-card-poster">
        <img src={movie.poster} alt={movie.title} loading="lazy" />
        <span className={`badge badge-${movie.universe.toLowerCase()}`}>{movie.universe}</span>
      </div>
      <div className="movie-card-body">
        <h3>{movie.title}</h3>
        <p className="movie-meta">
          {movie.year} · ★ {movie.avgRating || '—'}
        </p>
        {movie.trendingScore > 0 && (
          <span className="trending-tag">🔥 Trending {movie.trendingScore}</span>
        )}
      </div>
    </Link>
  );
}
