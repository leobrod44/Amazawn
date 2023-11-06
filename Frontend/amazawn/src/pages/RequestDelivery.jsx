import React, { useState } from "react";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import FormRowWithDropdown from "../components/FormRowWithDropdown";
import AddressSelectionComponent from "../components/AddressSelectionComponent";
import "../styling/index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormRowShort from "../components/FormRowShort";
const RequestDelivery = () => {
  const dropdownOptions = ["kg", "lb"]; // Replace with your specific dropdown options

  const [formData, setFormData] = useState({
    senderName: "",
    email: "",
    pickupAddress: "",
    deliveryAddress: "",
    receiverName: "",
    Remail: "",
    weightUnit: "kg",
    weight: "",
    length: "",
    width: "",
    height: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("handleFormSubmit called"); // Add this line
    console.log(formData); // Add this line
    if (
      !formData.senderName ||
      !formData.email ||
      !formData.pickupAddress ||
      !formData.deliveryAddress ||
      !formData.weight ||
      !formData.weightUnit ||
      !formData.height ||
      !formData.length ||
      !formData.width
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

    console.log("Form submitted successfully");
    console.log(formData);
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
      <form className="form" method="POST" onSubmit={handleFormSubmit}>
        <div style={{ textAlign: "center" }}>
          <Logo style={{ margin: "0 auto" }} />
        </div>
        <h3 style={{ textAlign: "center" }}>Request a Delivery</h3>

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
            labelText="Full name or Company Name"
            value={formData.receiverName}
            onChange={handleInputChange}
          />

          <FormRow
            type="email"
            labelText="Email Address"
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
          />

          <AddressSelectionComponent
            type="address"
            labelText="Delivery Location *"
            name="deliveryAddress"
            value={formData.deliveryAddress}
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
        <div>
          <button type="submit" className="btn">
            Generate Quotation Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestDelivery;
