import { useEffect, useState } from 'react';
import api from '../api/client';
import TrendingList from '../components/TrendingList';
import ActivityFeed from '../components/ActivityFeed';
import LoadingSpinner from '../components/LoadingSpinner';
import './Insights.css';

export default function Insights() {
  const [trending, setTrending] = useState([]);
  const [activities, setActivities] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    Promise.all([
      api.get('/movies/trending'),
      api.get('/activity'),
      api.get('/activity/analytics'),
    ]).then(([t, a, stats]) => {
      setTrending(t.data);
      setActivities(a.data);
      setAnalytics(stats.data);
    });
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container page insights-page">
      <h1 className="section-title">Live Insights</h1>
      <p className="section-desc">
        Near real-time analytics powered by Kafka event processing. Refreshes every 8 seconds.
      </p>

      {analytics && (
        <div className="analytics-bar">
          <span>👁 {analytics.viewed} views</span>
          <span>★ {analytics.rated} ratings</span>
          <span>📋 {analytics.watchlist} watchlist updates</span>
          <span>{analytics.total} total events</span>
        </div>
      )}

      <div className="insights-grid">
        <section>
          <h2 className="section-title">Trending Rankings</h2>
          <TrendingList movies={trending} />
        </section>
        <section>
          <h2 className="section-title">Activity Feed</h2>
          <ActivityFeed activities={activities} />
        </section>
      </div>
    </div>
  );
}
