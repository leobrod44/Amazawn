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
          x
          </button>
         <br></br>
         <br></br>
         <h3 style={{ textAlign: "center" }}>Quotation Details</h3>
    
         <p><span className="form-label">Delivery Method: </span> {'Ground shipping'}  </p>
         <p> <span className="form-label">Delivery Address: </span> {'1455, Blvd. De Maisonneuve Ouest, Montreal, H3G 1M8'}  </p>
         <p> <span className="form-label">Estimated Delivery Time: </span> {'Monday, November 20th, 2023'}  </p>
         <p> <span className="form-label">Estimated Pick Up Date: </span> {'Friday, November 17th, 2023'} </p>
         <p> <span className="form-label">Distance Pricing: </span> {'CAD 44.19'} </p>
         <p> <span className="form-label">Volume Pricing: </span> {'CAD 1.98'} </p>
         <p> <span className="form-label">Weight Pricing: </span> {'CAD 8.55'} </p>
         <p> <span className="form-label">Flat Rate: </span> {'CAD 5.0'} </p>
         <p> <span className="form-label">Taxes: </span> {'CAD 8.96'} </p>
         
         
         <p> <span className="form-label">Total Amount: </span> {'CAD 60.14'} </p>


         <button classname="btn"
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