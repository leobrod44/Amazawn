import React, { useState } from "react";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import FormRowSideBySide from "../components/FormRowSideBySide";
import FormRowWithDropdown from "../components/FormRowWithDropdown";
import AddressSelectionComponent from "../components/AddressSelectionComponent";
import "../styling/index.css";



const RequestDelivery = () => {

 const dropdownOptions = ["kg", "lb"]; // Replace with your specific dropdown options
 const dropdownOptions2=["in"];

 const handleInputChange = (event) => {
    // Get the input name and value from the event
    const { name, value } = event.target;
  };

  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
  };


  return (
    <div>
    <form className="form">
      <div style={{ textAlign: "center" }}>
        <Logo style={{ margin: "0 auto" }} />
      </div>
      <h3 style={{ textAlign: "center" }}>Request a Delivery</h3>

      <div className="form-section">
        <h4 style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35" }}>Your Information</h4>

        <FormRow
        type="text"
        name="senderName"
        labelText="Full name or Company Name *"/>
       
        <FormRow
          type="email"
          labelText="Email Address *"
          name="email"
        />
      </div>

      <div className="form-section">
        <h4 style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35"}}>Receiver's Information</h4>
        <FormRow
        type="text"
        name="receiverName"
        labelText="Full name or Company Name"/>

        <FormRow
          type="email"
          labelText="Email Address"
          name="Remail"
        />
      </div>

      <div className="form-section">
        <h4 style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35" }}>Addresses</h4>

        
        <AddressSelectionComponent
        type="address"
        labelText="Pick-up Location *"
        name="pickupAddress"/>

        <AddressSelectionComponent
        type="address"
        labelText="Delivery Location *"
        name="DeliveryAddress"/>
        
      </div>

      <div className="form-section">
        <h4 style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35"}}>Package Details</h4>

    <div className="form-row">
    <FormRowWithDropdown
        labelText="Weight *"
        inputType="number"
        inputName="weight"
        inputValue=""
        onInputChange={handleInputChange}
        dropdownOptions={dropdownOptions}
        dropdownName="weightUnit"
        dropdownValue=""
        onDropdownChange={handleDropdownChange}
      /> 
       <FormRowWithDropdown
        labelText="Length"
        inputType="number"
        inputName="Length"
        inputValue=""
        onInputChange={handleInputChange}
        dropdownOptions={dropdownOptions2}
        dropdownName="MeasurementUnit"
        dropdownValue=""
        onDropdownChange={handleDropdownChange}
      />
       <FormRowWithDropdown
        labelText="Width"
        inputType="number"
        inputName="Width"
        inputValue=""
        onInputChange={handleInputChange}
        dropdownOptions={dropdownOptions2}
        dropdownName="MeasurementUnit"
        dropdownValue=""
        onDropdownChange={handleDropdownChange}
      />
       <FormRowWithDropdown
        labelText="Height"
        inputType="number"
        inputName="Height"
        inputValue=""
        onInputChange={handleInputChange}
        dropdownOptions={dropdownOptions2}
        dropdownName="MeasurementUnit"
        dropdownValue=""
        onDropdownChange={handleDropdownChange}
      />
  </div>
        
      </div>

      <div style={{ textAlign: "center", paddingTop:"14%" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {}}
        >
          Generate Quotation Now
        </button>
      </div>
    </form>
    </div>
  );
};

export default RequestDelivery;