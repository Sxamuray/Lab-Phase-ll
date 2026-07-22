import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import './MovieGrid.css';

export default function MovieGrid({ movies, loading, emptyMessage = 'No movies found.' }) {
  if (loading) return <LoadingSpinner />;

  if (!movies?.length) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie, i) => (
        <MovieCard key={movie._id} movie={movie} index={i} />
      ))}
    </div>
  );
}
