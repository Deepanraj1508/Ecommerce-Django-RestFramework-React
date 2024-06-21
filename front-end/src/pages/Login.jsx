import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import "../static/Login.css"; // Ensure this file contains necessary CSS classes

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });
      // Save the JWT token in the browser cookies
      document.cookie = `jwt=${response.data.jwt}; path=/; httponly`;
      // Redirect to the home page or user dashboard
      window.location.href = '/profile'; // Example redirect to dashboard
      console.log('Login successful:', response.data);
    } catch (error) {
      setError('Login failed: ' + (error.response?.data?.detail || 'An error occurred.'));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 py-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-9">
            <div className="card shadow-lg p-4 animated-form">
              <h1 className="text-center mb-4">Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control input-field"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label d-flex justify-content-between align-items-center">
                    Password
                    <span
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash-fill"></i>
                      ) : (
                        <i className="bi bi-eye-fill"></i>
                      )}
                    </span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control input-field"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 text-end">
                  <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-login" type="submit">Login</button>
                </div>
              </form>
              <div className="mt-3 text-center">
                <p className="mb-0">Don't have an account? <Link to="/register" className="text-decoration-underline">Sign Up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
