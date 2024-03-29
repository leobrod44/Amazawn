import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styling/CustomerSupport.css";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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

  const { name, email, tracking_number, message } = formData;

  const handleInputChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFieldEmpty(name) && !isFieldEmpty(email) && !isFieldEmpty(message)) {
      if (isValidEmail(email)) {
        setMessageText("Email successfully sent!");
        setMessageClass("green");

        setFormData({
          name: "",
          email: "",
          tracking_number: "",
          message: "",
        });

        setTimeout(() => {
          setMessageText("");
          setMessageClass("");
        }, 3000);
        try {
          const ticketData = {
            name: name,
            email: email,
            tracking_number: tracking_number,
            message: message,
          };
          const response = await axios.post(
            "http://localhost:8080/support/customersupport",
            ticketData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.data);
        } catch (error) {
          console.error("Error:", error); 
        }
      } else {
        toast.error("Invalid email address format.");
      }
    } else {
      toast.error("Please fill in all the fields.");
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
              <FormRow
                type="text"
                name="name"
                labelText={"Your Full Name or Company Name"}
                className={`name-email ${isFieldEmpty(name) ? "red" : ""}`}
                required
                value={formData.name}
                onChange={handleInputChange}
              />
              <FormRow
                type="email"
                placeholder="Email"
                name="email"
                labelText={"Email Address"}
                className={`name-email ${
                  isFieldEmpty(email) || !isValidEmail(email) ? "red" : ""
                }`}
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              
              <FormRow
                type="tracking_number"
                placeholder="Tracking-Number"
                name="tracking_number"
                labelText={"Tracking Number (Optional)"}
                value={formData.tracking_number}
                onChange={handleInputChange}
              />

              <label className="form-label">Enter Your Message Here</label>
              <textarea
                name="message"
                className={`message-box ${isFieldEmpty(message) ? "red" : ""}`}
                required
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
            <div className={`message ${messageClass}`}>{messageText}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="btn" type="submit" onClick={handleSubmit}>
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerSupport;