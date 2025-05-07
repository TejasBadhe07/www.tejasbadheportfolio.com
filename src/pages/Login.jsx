import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Debug logs
    console.log('Environment variables:', {
      email: process.env.REACT_APP_ADMIN_EMAIL,
      password: process.env.REACT_APP_ADMIN_PASSWORD
    });
    console.log('Form data:', formData);

    // Check credentials against environment variables
    if (
      formData.email === process.env.REACT_APP_ADMIN_EMAIL &&
      formData.password === process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true');
      // Redirect to dashboard
      navigate('/dashboard/home');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please login to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="login-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>
        </form>

        <div className="login-footer">
          <p>Forgot your password? <a href="#">Reset it</a></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 