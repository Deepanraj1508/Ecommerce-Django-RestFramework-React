// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../static/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });
      // Save the JWT token in the browser cookies
      document.cookie = `jwt=${response.data.jwt}; path=/; httponly`;
      // Redirect to the home page
      window.location.href = '/index';
      console.log('Login successful:', response.data);
    } catch (error) {
      setError('Login failed: ' + error.response.data.detail);
    }
  };
  

  const onHomeButtonClick = () => {
    // Navigate to the home page
    window.location.href = '/';
  };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <input
          className={'inputButton'}
          type="button"
          onClick={onHomeButtonClick}
          value={'Home'}
        />
      </form>
      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
};

export default Login;
