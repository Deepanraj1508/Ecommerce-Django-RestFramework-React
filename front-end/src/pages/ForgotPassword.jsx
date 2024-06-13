import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8000/api/password-reset', { email });
      setMessage(response.data.message);
    } catch (error) {
      alert('write valid email')
      setMessage(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
        </div>
        <div className="mb-3 text-end">
          <Link to="/request-otp" className="text-decoration-none">Try Anoter way</Link>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && (
        <p className={message.startsWith('Error') ? 'text-danger' : 'text-success'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ForgotPassword;
