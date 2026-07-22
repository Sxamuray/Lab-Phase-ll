import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async ({ username, email, password }) => {
    setError('');
    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container page">
      <h1 className="section-title" style={{ textAlign: 'center' }}>
        Join HeroStream
      </h1>
      <AuthForm mode="register" onSubmit={handleSubmit} error={error} />
      <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--muted)' }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
