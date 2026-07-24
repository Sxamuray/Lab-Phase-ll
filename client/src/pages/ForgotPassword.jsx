import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import '../components/AuthForm.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [devLink, setDevLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setDevLink('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setMessage(data.message);
      if (data.devResetUrl) setDevLink(data.devResetUrl);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page">
      <h1 className="section-title" style={{ textAlign: 'center' }}>
        Forgot password
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '1.5rem' }}>
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-success">{message}</p>}

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>

        <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send reset link'}
        </button>
      </form>

      {devLink && (
        <div className="dev-reset-link">
          <p>Dev mode — SMTP not configured. Use this link:</p>
          <a href={devLink}>{devLink}</a>
        </div>
      )}

      <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--muted)' }}>
        <Link to="/login">Back to login</Link>
      </p>
    </div>
  );
}
