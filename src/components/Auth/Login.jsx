import React, { useState } from 'react';
import '../AuthStyles.css';

const Login = ({ onLogin, switchToRegister }) => {
  const [credentials, setCredentials] = useState({ 
    name: '',
    email: '', 
    password: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Your Name"
            value={credentials.name}
            onChange={(e) => setCredentials({...credentials, name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
      <p className="auth-switch">
        Don't have an account? 
        <button onClick={switchToRegister} className="switch-button">
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;
