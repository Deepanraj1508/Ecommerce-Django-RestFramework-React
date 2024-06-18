import React from 'react';
import { Footer, Navbar } from '../components';
import groceryImage from '../assets/Grocery.jpg';
import toyImage from '../assets/Toys.jpg';
import jewelleryImage from '../assets/jewellery.jpg';
import electronicsImage from '../assets/electronics.jpg';
import OurStory from '../assets/OurStory.jpg';
import OurMission from '../assets/OurMission.jpg';
import "../static/AboutPage.css";   // Create this CSS file for additional styling

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        
        <div className="about-section">
          <div className="about-image-left">
            <img src={OurStory} alt="Our Story" className="img-fluid rounded" />
          </div>
          <div className="about-text-right">
          <h2 className="text-center py-4">Our Story</h2>
            <p>
              Founded in 2024, EcomGrove began with a passion for revolutionizing online shopping by offering a curated selection of premium products at affordable prices. Since then, we have grown into a trusted brand known for our unwavering commitment to delivering exceptional quality and ensuring utmost customer satisfaction with every purchase.
            </p>
          </div>
        </div>

        
        <div className="about-section">
          <div className="about-text-left">
          <h2 className="text-center py-4">Our Mission</h2>
            <p>
              Our mission at EcomGrove is to empower our customers with sustainable choices that enrich their lives. We strive to curate a diverse range of products that not only meet high standards of quality but also uphold our commitment to environmental responsibility. By promoting sustainability in our operations and product offerings, we aim to inspire mindful consumption practices that contribute positively to the planet. At EcomGrove, we believe in fostering long-term relationships built on trust, transparency, and a shared dedication to a greener future for generations to come.
            </p>
          </div>
          <div className="about-image-right">
            <img src={OurMission} alt="Our Mission" className="img-fluid rounded" />
          </div>
        </div>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src={groceryImage} alt="Grocery" />
              <div className="card-body">
                <h5 className="card-title text-center">Grocery</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src={toyImage} alt="Toys" />
              <div className="card-body">
                <h5 className="card-title text-center">Toys</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src={jewelleryImage} alt="Jewelry" />
              <div className="card-body">
                <h5 className="card-title text-center">Jewellery</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src={electronicsImage} alt="Electronics" />
              <div className="card-body">
                <h5 className="card-title text-center">Electronics</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
