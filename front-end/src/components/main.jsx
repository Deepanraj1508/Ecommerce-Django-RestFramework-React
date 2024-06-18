import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="New Season Arrivals"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h1 className="card-title display-3 fw-light">New Season Arrivals</h1>
              <p className="card-text fs-5 d-none d-sm-block">
                Discover our latest collection, crafted to bring you unparalleled style and comfort. Explore now to find your perfect look for the new season.
              </p>
              <a href="/shop" className="btn btn-primary btn-lg mt-3">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
