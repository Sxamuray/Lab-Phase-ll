import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import MovieDetail from './pages/MovieDetail';
import Watchlist from './pages/Watchlist';
import Insights from './pages/Insights';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
