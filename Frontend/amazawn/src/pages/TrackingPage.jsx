import React from "react";
import Logo from "../components/Logo";

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
            <div style={{ textAlign: "center" }}>
                <Logo style={{ margin: "0 auto" }} />
            </div>
            <h3 style={{ textAlign: "center" }}>Track you Package</h3>


            <label>
                Enter Delivery ID:
                <input type="text" />
            </label>
            <button >Track Delivery</button>


                <div>
                <h2>Delivery Information</h2>
                <p>Status: {}</p>
                <p>Estimated Delivery Time: {}</p>
                {/* Add more information based on your API response */}
                </div>

        </div>
    );
};

export default TrackingPage;

//value={deliveryId} onChange={handleInputChange}
//onClick={handleTrackDelivery}