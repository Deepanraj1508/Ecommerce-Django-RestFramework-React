// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import '../static/Login.css'; // Import your custom CSS file for styling

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { name, email, password, phone_number } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/register', formData);
            setSuccess('Registration successful!');
            setError('');
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (err) {
            setError('Registration failed. Please try again.');
            setSuccess('');
            console.error(err);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8000/api/auth/google';
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
                            <h1 className="text-center mb-4">SignUp</h1>
                            <form onSubmit={onSubmit} className="registration-form">
                                <div className="mb-3">
                                    <label htmlFor="Name">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control input-field"
                                        id="Name"
                                        name="name"
                                        placeholder="Enter Your Name"
                                        value={name}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control input-field"
                                        id="Email"
                                        name="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={onChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="PhoneNumber">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control input-field"
                                        id="PhoneNumber"
                                        name="phone_number"
                                        placeholder="Enter Your Phone Number"
                                        value={phone_number}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Password" className="form-label d-flex justify-content-between align-items-center">
                                        Password
                                        <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </span>
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                
                                <div className="text-center">
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-primary btn-login" type="submit">SignUp</button>
                                    </div>
                                    <div className="my-3">
                                        <p>Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link></p>
                                    </div>
                                    <p>or</p>
                                    <button
                                        type="button"
                                        className="btn btn-outline-dark btn-block mb-2 btn-google"
                                        onClick={handleGoogleLogin}
                                    >
                                        <FontAwesomeIcon icon={faGoogle} className="me-2 google-icon" /> Register with Google
                                    </button>
                                </div>
                            </form>
                            {error && <p className="error-message">{error}</p>}
                            {success && <p className="success-message">{success}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;
