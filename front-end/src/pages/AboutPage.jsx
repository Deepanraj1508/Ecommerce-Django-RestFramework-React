import React from 'react';
import { Footer, Navbar } from '../components';
import groceryImage from '../assets/Grocery.jpg';
import toyImage from '../assets/Toys.jpg';
import jewelleryImage from '../assets/jewellery.jpg';
import electronicsImage from '../assets/electronics.jpg';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
          Welcome to EcomGrove, your go-to destination for high-quality products and exceptional customer service. At EcomGrove, we believe in providing our customers with a seamless shopping experience from start to finish.
        </p>

        <h2 className="text-center py-4">Our Story</h2>
        <p className="text-center">
          Founded in 2024, EcomGrove began with a passion for revolutionizing online shopping by offering a curated selection of premium products at affordable prices. Since then, we have grown into a trusted brand known for our unwavering commitment to delivering exceptional quality and ensuring utmost customer satisfaction with every purchase.
        </p>

        <h2 className="text-center py-4">Our Mission</h2>
        <p className="text-center">
          Our mission at EcomGrove is to empower our customers with sustainable choices that enrich their lives. We strive to curate a diverse range of products that not only meet high standards of quality but also uphold our commitment to environmental responsibility. By promoting sustainability in our operations and product offerings, we aim to inspire mindful consumption practices that contribute positively to the planet. At EcomGrove, we believe in fostering long-term relationships built on trust, transparency, and a shared dedication to a greener future for generations to come.
        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src={groceryImage} alt="Grocery" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Grocery</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src={toyImage} alt="Toys" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Toys</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid"  src={jewelleryImage} alt="Jewelry" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Jewellery</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src={electronicsImage} alt="Electronics" height={160} />
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
