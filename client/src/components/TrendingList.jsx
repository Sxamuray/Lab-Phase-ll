import { Link } from 'react-router-dom';
import './TrendingList.css';

export default function TrendingList({ movies }) {
  if (!movies?.length) return null;

  return (
    <ol className="trending-list">
      {movies.map((movie, i) => (
        <li key={movie._id} style={{ animationDelay: `${i * 0.08}s` }}>
          <span className="rank">{i + 1}</span>
          <Link to={`/movies/${movie._id}`} className="trending-item">
            <img src={movie.poster} alt="" />
            <div>
              <strong>{movie.title}</strong>
              <span className={`badge badge-${movie.universe.toLowerCase()}`}>{movie.universe}</span>
              <p className="score">Score: {movie.trendingScore}</p>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
