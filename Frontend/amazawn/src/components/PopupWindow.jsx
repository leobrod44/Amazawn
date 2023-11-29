import React, { useState } from 'react';
import '../styling/Popup.css';
import axios from 'axios';

  
  const PopupWindow = ({ onClose }) => {
    const [requestData, setRequestData] = useState(null);
    const handleButtonClick = async () => {
      try {
        // Send the POST request to the backend using Axios
        console.log("data");
        console.log(requestData);
        const response = await axios.post('http://localhost:8080/logistics/startShipment', requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
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
        <h3 style={{ textAlign: "center" }}>Quotation Details</h3>

        {requestData && (
        
          <>
            <p><span className="form-label">Delivery Method: </span>{requestData.deliveryMethod}</p>
            <p><span className="form-label">Delivery Address: </span>{requestData.deliveryAddress}</p>
            <p><span className="form-label">Estimated Delivery Time: </span>{requestDataestimatedDeliveryTime}</p>
            <p><span className="form-label">Estimated Pick Up Date: </span>{requestData.estimatedPickUpDate}</p>
            <p><span className="form-label">Distance Pricing: </span>{`CAD ${requestData.distancePricing.toFixed(2)}`}</p>
            <p><span className="form-label">Volume Pricing: </span>{`CAD ${requestData.volumePricing.toFixed(2)}`}</p>
            <p><span className="form-label">Weight Pricing: </span>{`CAD ${requestData.weightPricing.toFixed(2)}`}</p>
            <p><span className="form-label">Flat Rate: </span>{`CAD ${requestData.flatRate.toFixed(2)}`}</p>
            <p><span className="form-label">Taxes: </span>{`CAD ${requestData.taxes.toFixed(2)}`}</p>
            <p><span className="form-label">Total Amount: </span>{`CAD ${requestData.totalAmount.toFixed(2)}`}</p>
          </>
            )}
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
      </div>
    </div>
  );
};

export default PopupWindow;
