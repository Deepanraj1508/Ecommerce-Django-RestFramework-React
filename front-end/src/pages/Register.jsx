import React, { useState } from 'react';
import axios from 'axios';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';

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

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={onSubmit}>
                            <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    name="name"
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="my-3">
                                <p>Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;
