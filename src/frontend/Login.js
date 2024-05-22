// Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css'; // Import your CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [error, setError] = useState('');

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await fetch(`https://w3villa-1mal.onrender.com/protected`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          navigate('/home');
        }
      } catch (error) {
        console.error('Protected resource error:', error);
      }
    };

    checkTokenValidity();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error message

    try {
      const response = await fetch(`https://w3villa-1mal.onrender.com/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      alert('Login successful!');
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <span className="error">{error}</span>}
        <button type="submit">Login</button>
      </form>
      <p className="register-link">
        New user? <span className="link" onClick={handleRegisterClick}>Register here</span>
      </p>
    </div>
  );
};

export default Login;
