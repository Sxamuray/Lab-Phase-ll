import { Link } from 'react-router-dom';
import './HeroBanner.css';

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-bg" />
      <div className="container hero-content">
        <p className="hero-tag">Marvel & DC · Event-driven discovery</p>
        <h1>Find your next hero movie</h1>
        <p className="hero-sub">
          Browse universes, build your watchlist, and watch trending titles update in near real time
          as Kafka processes every view, rating, and watchlist change.
        </p>
        <div className="hero-actions">
          <Link to="/browse" className="btn btn-primary">
            Explore Movies
          </Link>
          <Link to="/insights" className="btn btn-dc">
            Live Insights
          </Link>
        </div>
      </div>
    </section>
  );
}
