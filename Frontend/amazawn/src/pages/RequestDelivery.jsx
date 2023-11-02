import React, { useState } from "react";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import FormRowSideBySide from "../components/FormRowSideBySide";
import FormRowWithDropdown from "../components/FormRowWithDropdown";
import "../styling/index.css";

const RequestDelivery = () => {

 const dropdownOptions = ["kg", "lb"]; // Replace with your specific dropdown options
 const handleInputChange = (event) => {
    // Get the input name and value from the event
    const { name, value } = event.target;
  };

  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
  };


  return (
    <form className="form">
      <div style={{ textAlign: "center" }}>
        <Logo style={{ margin: "0 auto" }} />
      </div>
      <h3 style={{ textAlign: "center" }}>Request a Delivery</h3>

      <div className="form-section">
        <h4 style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35" }}>Your Information</h4>

        <FormRowSideBySide
          type1="text"
          name1="firstName"
          labelText1="First Name"
          type2="text"
          name2="lastName"
          labelText2="Last Name"
        />

        <FormRow
          type="email"
          labelText="Email Address"
          name="email"
        />
      </div>

      <div className="form-section">
        <h4 style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35"}}>Receiver Information</h4>

        <FormRowSideBySide
          type1="text"
          name1="receiverFirstName"
          labelText1="Receiver's First Name"
          type2="text"
          name2="receiverLastName"
          labelText2="Receiver's Last Name"
        />

        <FormRow
          type="email"
          labelText="Receiver's Email Address"
          name="Remail"
        />
      </div>

      <div className="form-section">
        <h4 style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35" }}>Addresses</h4>

        <FormRow
          type="address"
          labelText="Pickup Address"
          name="pa"
        />

        <FormRow
          type="address"
          labelText="Delivery Address"
          name="da"
        />
      </div>

      <div className="form-section">
        <h4 style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35"}}>Package Details</h4>

    <div className="form-row">
    <FormRowWithDropdown
        labelText="Package Weight"
        inputType="number"
        inputName="weight"
        inputValue=""
        onInputChange={handleInputChange}
        dropdownOptions={dropdownOptions}
        dropdownName="weightUnit"
        dropdownValue=""
        onDropdownChange={handleDropdownChange}
      />
  </div>
        
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {}}
        >
          Generate Quotation Now
        </button>
      </div>
    </form>
  );
};

export default RequestDelivery;