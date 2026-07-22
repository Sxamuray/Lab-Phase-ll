import { useEffect, useState } from 'react';
import api from '../api/client';
import HeroBanner from '../components/HeroBanner';
import MovieGrid from '../components/MovieGrid';
import TrendingList from '../components/TrendingList';
import './Home.css';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/movies?sort=trending'), api.get('/movies/trending')])
      .then(([all, trend]) => {
        setFeatured(all.data.slice(0, 6));
        setTrending(trend.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <HeroBanner />
      <div className="container page home-page">
        <section className="home-section">
          <h2 className="section-title">Featured Picks</h2>
          <MovieGrid movies={featured} loading={loading} />
        </section>

        <section className="home-section trending-section">
          <h2 className="section-title">Trending Now</h2>
          <p className="section-desc">Rankings update as Kafka processes user events.</p>
          <TrendingList movies={trending} />
        </section>
      </div>
    </>
  );
}
