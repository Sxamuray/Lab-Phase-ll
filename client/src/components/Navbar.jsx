import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">⚡</span>
          HeroStream
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/browse">Browse</NavLink>
          {isAuthenticated && <NavLink to="/watchlist">Watchlist</NavLink>}
          <NavLink to="/insights">Live Insights</NavLink>
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span className="nav-user">Hi, {user.username}</span>
              <button type="button" className="btn btn-secondary" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Log in
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>

        <button type="button" className="nav-toggle" aria-label="Menu">
          ☰
        </button>
      </div>
    </header>
  );
}
