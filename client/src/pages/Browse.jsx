import { useEffect, useState } from 'react';
import api from '../api/client';
import SearchBar from '../components/SearchBar';
import UniverseFilter from '../components/UniverseFilter';
import MovieGrid from '../components/MovieGrid';
import './Browse.css';

export default function Browse() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [universe, setUniverse] = useState('');
  const [sort, setSort] = useState('trending');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      const params = new URLSearchParams();
      if (universe) params.set('universe', universe);
      if (search) params.set('search', search);
      params.set('sort', sort);

      api
        .get(`/movies?${params}`)
        .then(({ data }) => setMovies(data))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [search, universe, sort]);

  return (
    <div className="container page">
      <h1 className="section-title">Browse Movies</h1>

      <div className="browse-controls">
        <SearchBar value={search} onChange={setSearch} />
        <UniverseFilter value={universe} onChange={setUniverse} />
        <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="trending">Trending</option>
          <option value="rating">Top Rated</option>
          <option value="newest">Newest</option>
          <option value="title">A–Z</option>
        </select>
      </div>

      <MovieGrid movies={movies} loading={loading} />
    </div>
  );
}
