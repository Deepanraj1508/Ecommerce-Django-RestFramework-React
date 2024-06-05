import React, { useState } from 'react';
import axios from 'axios';
import '../static/Register.css'; // Import the CSS file

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/register', formData);
            alert('Registration successful!');
            setError('');
            // Redirect to login page after successful registration
            window.location.href = '/login';
        } catch (err) {
            setError('Registration failed. Please try again.');
            setSuccess('');
            console.error(err);
        }
    };

    const onHomeButtonClick = () => {
        // Navigate to the home page
        window.location.href = '/';
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            {error && <p>{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={onHomeButtonClick}
                    value={'Home'}
                />
            </form>
        </div>
    );
};

export default Register;
