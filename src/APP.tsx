import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { loginUser } from './authService';

export default function App() {
  const { user, loading, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      login(data.token, data.user); 
    } catch (err) {
      alert("Login failed! Please check your credentials.");
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading configurations...</div>;

  if (user) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h2>Welcome back, {user.email}!</h2>
        <p>You are successfully authenticated into DailyForge.</p>
        <button onClick={logout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Log Out</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '10%', fontFamily: 'sans-serif' }}>
      <h1>Welcome Back</h1>
      <p>Login to continue your experience</p>
      <form onSubmit={handleFormSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <label>Email:</label><br />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '0.5rem', width: '250px', marginBottom: '1rem' }} /><br />
        <label>Password:</label><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '0.5rem', width: '250px', marginBottom: '1rem' }} /><br />
        <button type="submit" style={{ padding: '0.5rem 1rem', width: '100%', backgroundColor: '#4db6ac', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}