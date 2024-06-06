import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/contact", formData); // Update this URL with your backend endpoint
      setFormStatus({
        submitted: true,
        success: true,
        message: "Your message has been sent successfully!",
      });
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("There was an error sending your message:", error.response?.data);
      setFormStatus({
        submitted: true,
        success: false,
        message: error.response?.data?.detail || "There was an error sending your message. Please try again.",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            {formStatus.submitted && (
              <div
                className={`alert ${
                  formStatus.success ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {formStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group my-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="message">Message</label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  className="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
