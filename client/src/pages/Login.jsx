import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async ({ email, password }) => {
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container page">
      <h1 className="section-title" style={{ textAlign: 'center' }}>
        Welcome back
      </h1>
      <AuthForm mode="login" onSubmit={handleSubmit} error={error} />
      <p style={{ textAlign: 'center', marginTop: '0.75rem' }}>
        <Link to="/forgot-password" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>
          Forgot password?
        </Link>
      </p>
      <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--muted)' }}>
        No account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}
