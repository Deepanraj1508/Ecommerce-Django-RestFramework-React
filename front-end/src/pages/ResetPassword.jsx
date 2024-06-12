import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== reNewPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`http://localhost:8000/api/reset-password/${uid}/${token}`, {
        new_password: newPassword,
        re_new_password: reNewPassword
      });
      window.location.href = '/';
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            id="newPassword"
            className="form-control"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reNewPassword">Confirm New Password:</label>
          <input
            id="reNewPassword"
            className="form-control"
            type="password"
            value={reNewPassword}
            onChange={(e) => setReNewPassword(e.target.value)}
            required
          />
          <br />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {message && (
        <p className={message.startsWith('Error') ? 'text-danger' : 'text-success'}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ResetPassword;
