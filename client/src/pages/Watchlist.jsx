import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import './Watchlist.css';

export default function Watchlist() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [movies, setMovies] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    Promise.all([api.get('/watchlist'), api.get('/watchlist/stats')])
      .then(([list, s]) => {
        setMovies(list.data);
        setStats(s.data);
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (authLoading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    return (
      <div className="container page auth-prompt">
        <h1 className="section-title">Your Watchlist</h1>
        <p>Log in to save movies and track your Marvel & DC queue.</p>
        <Link to="/login" className="btn btn-primary">
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1 className="section-title">Your Watchlist</h1>

      {stats && (
        <div className="watchlist-stats">
          <div className="stat-card">
            <strong>{stats.total}</strong>
            <span>Total</span>
          </div>
          <div className="stat-card marvel">
            <strong>{stats.marvel}</strong>
            <span>Marvel</span>
          </div>
          <div className="stat-card dc">
            <strong>{stats.dc}</strong>
            <span>DC</span>
          </div>
        </div>
      )}

      <MovieGrid movies={movies} loading={loading} emptyMessage="Your watchlist is empty. Browse movies to add some!" />
    </div>
  );
}
