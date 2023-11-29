import React, { useState } from 'react';
import '../styling/Popup.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


const PopupWindow = ({ onClose, requestData, deliveryAddress, originAddress }) => {

  console.log(deliveryAddress);
  console.log(originAddress);
  console.log('3 - PopupWindow created, responseData is: ', requestData);

  const handleButtonClick = async () => {
    console.log('popup');
    try {
      // Send the POST request to the backend using Axios
      const response = await axios.post('http://localhost:8080/logistics/startShipment', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle the response if needed
      console.log('Response:', response);

     
     
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button
          className="close-button"
          onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.5)')}
          onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0px 0px 0px rgba(0, 0, 0, 0.1)')}
          style={{ backgroundColor: '#016846', color: 'white' }}
          onClick={onClose}
        >
          x
        </button>
        <br></br>
        <br></br>
        <br></br>
        <h3 style={{ textAlign: "center" }}>Quotation Details</h3>

        {requestData && (
        
          <>
            <p><span className="form-label">Delivery Method: </span>{requestData.shipmentMethod}</p>
            <p><span className="form-label">Origin Address: </span>{originAddress}</p>
            <p><span className="form-label">Delivery Address: </span>{deliveryAddress}</p>
            <p><span className="form-label">Estimated Delivery Time: </span>{requestData.estimatedArrivalDate}</p>
            <p><span className="form-label">Estimated Pick Up Date: </span>{requestData.departureDate}</p>
            <p><span className="form-label">Distance Pricing: </span>{`CAD ${requestData.distancePricing}`}</p>
            <p><span className="form-label">Volume Pricing: </span>{`CAD ${requestData.volumePricing}`}</p>
            <p><span className="form-label">Weight Pricing: </span>{`CAD ${requestData.weightPricing}`}</p>
            <p><span className="form-label">Flat Rate: </span>{`CAD ${requestData.flatRate}`}</p>
            <p><span className="form-label">Taxes: </span>{`CAD ${requestData.taxes}`}</p>
            <p><span className="form-label">Total Amount: </span>{`CAD ${requestData.total}`}</p>
          </>
            )}

<Link to="/" className="link">
  <button
    className="btn"
    style={{
      backgroundColor: '#016846',
      color: 'white',
      transition: 'box-shadow 0.3s ease',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    }}
    onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0px 16px 16px rgba(0, 0, 0, 0.5)')}
    onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)')}
    onClick={handleButtonClick}
  >
    Checkout
  </button>
</Link>

    
   
  </div>
      </div>
    
  );
};

export default PopupWindow;