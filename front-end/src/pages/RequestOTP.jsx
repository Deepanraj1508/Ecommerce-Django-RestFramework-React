import React, { useState } from 'react';
import axios from 'axios';

function RequestOTP() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8000/api/request-otp', { phone_number: phoneNumber });
      setMessage('OTP sent successfully');
      window.location.href = '/verify-otp';
    } catch (error) {
      setMessage('Error sending OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Request OTP</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            id="phone_number"
            className="form-control"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <br />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send OTP'}
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

export default RequestOTP;
