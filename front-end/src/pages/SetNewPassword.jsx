import React, { useState } from 'react';
import axios from 'axios';

function SetNewPassword() {
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
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/set-new-password',
        { new_password: newPassword, re_new_password: reNewPassword },
        { headers: { Authorization: `Token ${token}` } }
      );
      setMessage('Password changed successfully');
      window.location.href = '/login';
    } catch (error) {
      setMessage('Error changing password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Set New Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="new_password">New Password:</label>
          <input
            id="new_password"
            className="form-control"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="re_new_password">Confirm New Password:</label>
          <input
            id="re_new_password"
            className="form-control"
            type="password"
            value={reNewPassword}
            onChange={(e) => setReNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Changing...' : 'Change Password'}
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

export default SetNewPassword;
