import React, { useState } from 'react';
import axios from 'axios';

function VerifyOTP() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8000/api/verify-otp', { phone_number: phoneNumber, otp });
      console.log(response.data); // Log the response data for debugging purposes
      setMessage('OTP verified successfully');
      localStorage.setItem('token', response.data.token);
      window.location.href = '/set-new-password';
    } catch (error) {
      setMessage('Error verifying OTP');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Verify OTP</h2>
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
        </div>
        <div className="form-group">
          <label htmlFor="otp">OTP:</label>
          <input
            id="otp"
            className="form-control"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify OTP'}
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

export default VerifyOTP;
