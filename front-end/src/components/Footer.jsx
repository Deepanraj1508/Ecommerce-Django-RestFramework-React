import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-md-3">
            <h5>About Us</h5>
            <p>
              We are committed to providing the best products and customer service. Our online store offers a wide range of quality items at competitive prices.
            </p>
          </div>
          
          {/* Customer Service Section */}
          <div className="col-md-3">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li><a href="/contact" className="text-white text-decoration-none">Help & FAQs</a></li>
              <li><a href="/shipping" className="text-white text-decoration-none">Shipping & Delivery</a></li>
              <li><a href="/returns" className="text-white text-decoration-none">Returns & Exchanges</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact Us</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/product" className="text-white text-decoration-none">Shop</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="/blog" className="text-white text-decoration-none">Blog</a></li>
              <li><a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <p>
              <i className="fa fa-map-marker-alt"></i> 1234 Street Name, City, State 56789
            </p>
            <p>
              <i className="fa fa-phone"></i> (123) 456-7890
            </p>
            <p>
              <i className="fa fa-envelope"></i> support@ecommerce.com
            </p>
            <div>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} EComGrove. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
