import React from "react";
import Logo from "../components/Logo";
import "../styling/index.css";

const TrackingPage = () => {

    /* 
    const handleInputChange = (e) => {
        setDeliveryId(e.target.value);
    };

    const handleTrackDelivery = async () => {
        // Assuming you have an API endpoint to fetch delivery information
        try {
          const response = await fetch(`https://api.example.com/delivery/${deliveryId}`);
          const data = await response.json();
          setDeliveryInfo(data);
        } catch (error) {
          console.error('Error fetching delivery information', error);
        }
    }; */

    return(
        <div>
            <div style={{ textAlign: "center" }} className="trackdelivery">
                <div>
                    <Logo style={{ margin: "0 auto" }} />
                </div>
                <h3 style={{ marginBottom: "3rem"}}>Track you Package</h3>

                <label style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35"}}>Enter you delivery ID: </label>
                <input type="text" className="form-input"/>
                <div>
                    <button
                    type="button"
                    className="btn"
                    onClick={() => {}}
                    style={{ marginTop: "1.5rem" }}
                    >
                    Track Delivery
                    </button>
                </div>
            </div>
            
            <div style={{ textAlign: "center" }} className="displaytrackinfo">
                <div>
                    <Logo style={{ margin: "0 auto" }} />
                </div>
                <h3 style={{ marginBottom: "3rem"}}>Track you Package</h3>
                <div style={{ textAlign: "left" }} className="deliveryinfo">
                    <h4>Delivery Information</h4>
                    <p>Status: {}</p>
                    <p>Estimated Delivery Time: {}</p>
                    <p>Delivery Address: {}</p>
                    <p>Customer support contact: {}</p>

                    <label>PROGRESSION BAR</label>
                    <progress max="1" value={0.5} className="progressbar">
                        <div></div>
                    </progress>
                </div>
            </div>

        </div>
    );
};

export default TrackingPage;

//value={deliveryId} onChange={handleInputChange}
//onClick={handleTrackDelivery}