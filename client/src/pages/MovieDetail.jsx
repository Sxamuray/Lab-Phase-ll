import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import RatingStars from '../components/RatingStars';
import WatchlistButton from '../components/WatchlistButton';
import './MovieDetail.css';

export default function MovieDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/movies/${id}`)
      .then(({ data }) => {
        setMovie(data);
        if (isAuthenticated) {
          api.post(`/movies/${id}/view`).catch(() => {});
          api.get(`/movies/${id}/my-rating`).then((r) => setRating(r.data.rating || 0));
        }
      })
      .finally(() => setLoading(false));
  }, [id, isAuthenticated]);

  const handleRate = async (value) => {
    setSaving(true);
    try {
      const { data } = await api.post(`/movies/${id}/rate`, { rating: value });
      setRating(value);
      setMovie(data);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!movie) return <p className="container page">Movie not found.</p>;

  return (
    <div className="container page movie-detail">
      <div className="detail-grid">
        <div className="detail-poster">
          <img src={movie.poster} alt={movie.title} />
        </div>
        <div className="detail-info">
          <span className={`badge badge-${movie.universe.toLowerCase()}`}>{movie.universe}</span>
          <h1>{movie.title}</h1>
          <p className="detail-meta">
            {movie.year} · {movie.director} · ★ {movie.avgRating || '—'} ({movie.ratingCount}{' '}
            ratings)
          </p>
          <p className="detail-desc">{movie.description}</p>

          <div className="detail-stats">
            <span>👁 {movie.viewCount} views</span>
            <span>🔥 {movie.trendingScore} trending score</span>
          </div>

          <div className="detail-actions">
            <WatchlistButton movieId={movie._id} />
            {!isAuthenticated && (
              <Link to="/login" className="btn btn-secondary">
                Log in to rate & save
              </Link>
            )}
          </div>

          {isAuthenticated && (
            <div className="detail-rating">
              <h3>Your Rating</h3>
              <RatingStars value={rating} onChange={handleRate} />
              {saving && <span className="saving">Saving...</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
