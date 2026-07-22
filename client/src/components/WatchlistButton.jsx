import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import './WatchlistButton.css';

export default function WatchlistButton({ movieId }) {
  const { isAuthenticated } = useAuth();
  const [inList, setInList] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    api.get('/watchlist').then(({ data }) => {
      setInList(data.some((m) => m._id === movieId));
    });
  }, [isAuthenticated, movieId]);

  const toggle = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      if (inList) {
        await api.delete(`/watchlist/${movieId}`);
        setInList(false);
      } else {
        await api.post(`/watchlist/${movieId}`);
        setInList(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <button
      type="button"
      className={`watchlist-btn ${inList ? 'in-list' : ''}`}
      onClick={toggle}
      disabled={loading}
    >
      {inList ? '✓ In Watchlist' : '+ Add to Watchlist'}
    </button>
  );
}
