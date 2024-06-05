import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center">
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0">Made with ❤️ by {" "}
              <a  href="https://deepanraj.com" className="text-decoration-underline text-dark fs-5" target="_blank" rel="noreferrer">Deepanraj</a>
            </p>
            <a className="text-dark fs-4" href="https://github.com/ssahibsingh" target="_blank" rel="noreferrer">
              <i className="fa fa-github"></i>
            </a>
            {/* Add other social media icons similarly */}
            <a className="text-dark fs-4" href="URL_TO_YOUR_SOCIAL_MEDIA_PROFILE" target="_blank" rel="noreferrer">
              <i className="fa fa-instagram"></i> {/* Example for Facebook */}
            </a>
            <a className="text-dark fs-4" href="URL_TO_YOUR_SOCIAL_MEDIA_PROFILE" target="_blank" rel="noreferrer">
              <i className="fa fa-whatsapp"></i> {/* Example for Facebook */}
            </a>
            <a className="text-dark fs-4" href="URL_TO_YOUR_SOCIAL_MEDIA_PROFILE" target="_blank" rel="noreferrer">
              <i className="fa fa-linkedin"></i> {/* Example for Facebook */}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
