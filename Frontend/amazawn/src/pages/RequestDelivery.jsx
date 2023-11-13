import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import FormRowWithDropdown from "../components/FormRowWithDropdown";
import AddressSelectionComponent from "../components/AddressSelectionComponent";
import "../styling/index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormRowShort from "../components/FormRowShort";
import axios from 'axios'; 


const RequestDelivery = () => {
  const dropdownOptions = ["kg", "lb"]; 

  const [formData, setFormData] = useState({
    senderName: "",
    email: "",
    pickupAddress: "",
    pickupAddressLatitude:null,
    pickupAddressLongitude:null,
    deliveryAddress: "",
    deliveryAddressLatitude:null,
    deliveryAddressLongitude:null,
    receiverName: "",
    Remail: "",
    weightUnit: "kg",
    weight: "",
    length: "",
    width: "",
    height: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
    if (
      !formData.senderName ||
      !formData.email ||
      !formData.pickupAddress ||
      !formData.deliveryAddress ||
      !formData.weight ||
      !formData.weightUnit ||
      !formData.height ||
      !formData.length ||
      !formData.width ||
      !formData.Remail ||
      !formData.receiverName
    ) {
      console.log("Required fields are not filled");
      toast.error("Please fill in all required fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (formData.email && !emailRegex.test(formData.email)) {
      console.log("email");
      toast.error("Invalid email address format (email).");
      return;
    }

    if (formData.Remail && !emailRegex.test(formData.Remail)) {
      console.log("email");
      toast.error("Invalid email address format (email).");
      return;
    }

    // Check that pickup and delivery addresses are not the same
    if (formData.pickupAddress === formData.deliveryAddress) {
      console.log("address");
      toast.error("Pickup and delivery addresses cannot be the same.");
      return;
    }

    if (
      !isValidNumber(formData.weight) || // Validate weight as a number
      !isValidNumber(formData.length) || // Validate length as a number
      !isValidNumber(formData.width) || // Validate width as a number
      !isValidNumber(formData.height) // Validate height as a number
    ) {
      console.log("invalid number");
      toast.error("Please fill in all required fields with valid numbers.");
      return;
    }

    // Check that weight, length, width, and height are not negative
    const numericFields = ["weight", "length", "width", "height"];
    for (const field of numericFields) {
      if (formData[field] < 0) {
        console.log("neg number");
        toast.error(
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } cannot be negative.`
        );
        return;
      }
    }

      //COMMENTING THIS OUT BECASUE ITS NOT NEEDED FOR SPRINT 3- SINCE SPRINT 3 IS FRONTEND ONLY
    /*  const requestData = {
      SenderFirstName: formData.senderName,
      SenderLastName: "", 
      SenderEmail: formData.email,
      ReceiverFirstName: formData.receiverName,
      ReceiverLastName: "",
      ReceiverEmail: formData.Remail,
      SenderLocation: {
        name: formData.pickupAddress,
        latitude: formData.pickupAddressLatitude,
        longitude: formData.pickupAddressLongitude,
      },
      ReceiverLocation: {
        name: formData.deliveryAddress,
        latitude: formData.deliveryAddressLatitude,
        longitude: formData.deliveryAddressLongitude,
      },
      requestedPackages: [
        {
          Description: "Package 1",
          Weight: parseFloat(formData.weight), // Convert weight to a number
          Height: parseInt(formData.height), // Convert height to an integer
          Width: parseInt(formData.width), // Convert width to an integer
          Length: parseInt(formData.length), // Convert length to an integer
        },
      ],
    };

    console.log(requestData);
    
    // Send the GET request to the backend
    const response = await axios.get('http://localhost:8080/logistics/requestQuotation', {
      params: requestData,
    });
   console.log('Backend response:', response.data);  */
}catch (error) {
    /* // Handle errors
    console.error('Error submitting form:', error);

    // Optionally, you can show an error message to the user
    toast.error('An error occurred while submitting the form. Please try again.'); */
  } 
};

  // Validation function to check if a value is a valid number
  const isValidNumber = (value) => {
    return /^[+-]?\d+(\.\d+)?$/.test(value);
  };

  // Handle changes in the dropdown value
  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Header/>
      <form className="form"  method="POST"  onSubmit={handleFormSubmit}>
        <div style={{ textAlign: "center" }}>
          <Logo style={{ margin: "0 auto" }} />
        </div>
        <h3 style={{ textAlign: "center" }}>Request a Delivery</h3>
        <p style={{textAlign:"center", fontSize:"14px", marginTop:"-15px"}}>required fields are marked *</p>
        <div className="form-section">
          <h4
            style={{
              marginBottom: "0.3rem",
              marginTop: "2rem",
              color: "#024f35",
            }}
          >
            Your Information
          </h4>

          <FormRow
            type="text"
            name="senderName"
            labelText="Full name or Company Name *"
            value={formData.senderName}
            onChange={handleInputChange}
          />

          <FormRow
            type="email"
            labelText="Email Address *"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-section">
          <h4
            style={{
              marginBottom: "0.3rem",
              marginTop: "2rem",
              color: "#024f35",
            }}
          >
            Receiver's Information
          </h4>
          <FormRow
            type="text"
            name="receiverName"
            labelText="Full name or Company Name *"
            value={formData.receiverName}
            onChange={handleInputChange}
          />

          <FormRow
            type="email"
            labelText="Email Address *"
            name="Remail"
            value={formData.Remail}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-section">
          <h4
            style={{
              marginBottom: "0.3rem",
              marginTop: "2rem",
              color: "#024f35",
            }}
          >
            Addresses
          </h4>

          <AddressSelectionComponent
            type="address"
            labelText="Pick-up Location *"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleInputChange}
            setFormData={setFormData}
          />

          <AddressSelectionComponent
            type="address"
            labelText="Delivery Location *"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleInputChange}
            setFormData={setFormData}
          />
        </div>

        <div className="form-section">
          <h4
            style={{
              marginBottom: "0.3rem",
              marginTop: "2rem",
              color: "#024f35",
            }}
          >
            Package Details
          </h4>

          <div className="form-row">
            <FormRowWithDropdown
              labelText="Weight *"
              inputType="text"
              inputName="weight"
              value={formData.weight}
              onInputChange={handleInputChange}
              dropdownOptions={dropdownOptions}
              dropdownName="weightUnit"
              dropdownValue={formData.weightUnit}
              onDropdownChange={handleDropdownChange}
            />

            <p style={{ paddingTop: "10px", textAlign: "center" }}>
              {" "}
              Please enter your package dimensions in inches for the most
              accurate quotation
            </p>
            <FormRowShort
              labelText="Length *"
              type="text"
              name="length"
              value={formData.length}
              onChange={handleInputChange}
            />

            <FormRowShort
              labelText="Width *"
              type="text"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
            />

            <FormRowShort
              labelText="Height *"
              type="text"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div style={{display: "flex", justifyContent:"center"}}>
          <button 
           type="submit" 
           className="btn"
           style={{textAlign:"center", display: "inline-block"}}>
            Generate Quotation Now
          </button>
        </div>
      </form>
      <Footer/>
    </div>
  );
};

export default RequestDelivery;
