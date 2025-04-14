import React, { useState } from 'react';
import '../AuthStyles.css';

const Register = ({ onRegister, switchToLogin }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // In a real app, you'd make an API call here
    onRegister(userData);
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={userData.name}
            onChange={(e) => setUserData({...userData, name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="auth-button">Register</button>
      </form>
      <p className="auth-switch">
        Already have an account? 
        <button onClick={switchToLogin} className="switch-button">
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;
