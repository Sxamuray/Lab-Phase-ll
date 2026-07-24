import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import '../components/AuthForm.css';
import './ResetPassword.css';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, { password });
      setSession(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page">
      <h1 className="section-title" style={{ textAlign: 'center' }}>
        Reset password
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '1.5rem' }}>
        Choose a new password for your account.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <p className="auth-error">{error}</p>}

        <label>
          New password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
        </label>

        <label>
          Confirm password
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
        </label>

        <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update password'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--muted)' }}>
        <Link to="/login">Back to login</Link>
      </p>
    </div>
  );
}
