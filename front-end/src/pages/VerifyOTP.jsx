import React, { useState } from 'react';
import "../static/VerifyOTP.css";

const VerifyOTP = () => {
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleVerifyOTP = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await fetch('http://localhost:8000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();
      setIsLoading(false); // Set loading state to false

      if (response.ok) {
        setMessage(data.message);
        setError('');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000); // Redirect after 2 seconds
      } else {
        setMessage('');
        setError(data.error || 'Failed to verify OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setIsLoading(false); // Set loading state to false
      setError('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className="verify-otp-container">
      <h2>Verify OTP</h2>
      <div className="input-group">
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          placeholder="Enter your OTP"
        />
      </div>
      <button onClick={handleVerifyOTP} disabled={isLoading}>
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </button>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default VerifyOTP;
