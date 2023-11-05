import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styling/CustomerSupport.css";

const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // State for the message text
  const [messageText, setMessageText] = useState(""); 
  // State for the message text class
  const [messageClass, setMessageClass] = useState(""); 

  const { name, email, message } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFieldEmpty = (field) => field.trim() === "";

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFieldEmpty(name) && !isFieldEmpty(email) && !isFieldEmpty(message)) {
      if (isValidEmail(email)) {
        // Show a success message
        setMessageText("Email successfully sent!");
        setMessageClass("green");

        setFormData({
          name: "",
          email: "",
          message: "",
        });

        // Clear the success message after a few seconds
        setTimeout(() => {
          setMessageText("");
          setMessageClass("");
        }, 3000);

      } else {
        // Show a warning message for invalid email format
        setMessageText("Please enter a valid email address.");
        setMessageClass("red");
      }
    } else {
      // Show a warning message if any field is empty
      setMessageText("Please fill in all the fields before submitting.");
      setMessageClass("red");
    }
  };

  return (
    <div className="container-page">
      <nav>
        <Header />
      </nav>
      <div className="title-body-container">
        <div className="form-container">
          <form className="form" method="POST">
            <div className="title">Contact Customer Support</div>
            <div>
              <input
                type="text"
                placeholder="Your name"
                name="name"
                className={`name-email ${isFieldEmpty(name) ? "red" : ""}`}
                required
                value={name}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                className={`name-email ${
                  isFieldEmpty(email) || !isValidEmail(email) ? "red" : "" }`}
                required
                value={email}
                onChange={handleChange}
              />
              <textarea
                placeholder="Add your message"
                name="message"
                className={`message-box ${isFieldEmpty(message) ? "red" : ""}`}
                required
                value={message}
                onChange={handleChange}
              />
            </div>
            <div className={`message ${messageClass}`}>
              {messageText}
            </div>
            <div className="sendBtnContainer">
              <button className="sendBtn" type="submit" onClick={handleSubmit}>
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
      <nav>
        <Footer />
      </nav>
    </div>
  );
};

export default CustomerSupport;
