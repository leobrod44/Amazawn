import React from 'react';
import '../styling/Popup.css' 



const PopupWindow = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button
         className = "close-button"
         onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.5)')}
         onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0px 0px 0px rgba(0, 0, 0, 0.1)')}
         style={{ backgroundColor: '#016846', color: 'white' }}
         onClick={onClose}>
          X
          </button>
         <br></br>
         <br></br>
         <h3>Quotation Details</h3>
         <br></br>
         <p >
          <span className="form-label">Delivery Method: </span> {'Ground shipping'} 
          </p>
         <br></br>
         <p> <span className="form-label">Estimated Delivery Time: </span> {'11/20/2023 by 8.30PM'}  </p>
         <br></br>
         <p> <span className="form-label">Delivery Address: </span> {'1234 Rue Jean Mance'}  </p>
         <br></br>
         <p> <span className="form-label">Total Amount </span> {'CAD 24.59'} </p>

    
         <button
    style={{
        backgroundColor: '#016846',
        color: 'white',
        transition: 'box-shadow 0.3s ease', 
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
    }}
    onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0px 16px 16px rgba(0, 0, 0, 0.5)')} // Box shadow on hover
    onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)')} // Reset box shadow when not hovering
>
    Checkout
       </button>
             
        
      </div>
      

    </div>
  );

};

export default PopupWindow;