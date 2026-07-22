import { useState } from 'react';
import './AuthForm.css';

export default function AuthForm({ mode, onSubmit, error }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ username, email, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <p className="auth-error">{error}</p>}

      {mode === 'register' && (
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </label>
      )}

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

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
        />
      </label>

      <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
        {loading ? 'Please wait...' : mode === 'register' ? 'Create account' : 'Log in'}
      </button>
    </form>
  );
}
