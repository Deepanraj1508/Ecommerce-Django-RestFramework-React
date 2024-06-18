import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const Navbar = () => {
    const cartItems = useSelector(state => state.handleCart);

    return (
        <nav style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "10px 0" }} className="navbar navbar-expand-lg ">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4" to="/">
                    <img src={logo} alt="Logo" style={{ height: '40px' }} />
                </NavLink>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact="true" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                    </ul>
                    <div className="d-flex text-center">
                        <NavLink to="/cart" className="btn btn-outline-dark mx-2">
                            <i className="fa fa-shopping-cart me-1"></i> Cart ({cartItems.length})
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
