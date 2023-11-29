import React, { useState } from "react";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";
import "../styling/Tracking.css";

const TrackingPage = () => {

    const [showTracking, setShowTracking] = useState(true);
    const [trackingId, setTrackingId] = useState('');
    const [trackingInfo, setTrackingInfo] = useState({
        progress: 0,
        eta: null,
        lastMilestone: null,
      });

    const toggleButton = async () => {
        // Get the current date
        const currentDate = new Date();
    
        //Data to send to the backend
        const requestData = {
          trackingId: trackingId,
          currentDate: currentDate.toISOString(), // Convert to ISO string format
        };

        try {
            // Make a POST request to the backend with the tracking ID and current date
            const response = await fetch('your_backend_api_endpoint', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestData),
            });
      
            // Handle the response from the backend (you can customize this part based on your backend)
            if (response.ok) {
                const responseData = await response.json();
                // Update the state with the received tracking information
                setTrackingInfo({
                    progress: responseData.progress,
                    eta: new Date(responseData.eta),
                    lastMilestone: new Date(responseData.lastMilestone),
                });

                // Toggle the tracking display
                setShowTracking(!showTracking);
            } else {
              // Handle errors or display a message to the user
              //console.error('Error sending tracking request to the backend');
            }
          } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error:', error);
          }
    };

    return(
        <div>
            <Header />
            {showTracking &&
            <div style={{ textAlign: "center", display: "block" }} className="trackdelivery">
                <div>
                    <Logo style={{ margin: "0 auto" }} />
                </div>
                <h3 style={{ marginBottom: "3rem"}}>Track your Package</h3>

                <label style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35"}}>Enter your delivery ID: </label>
                <div><input 
                        type="text" 
                        className="id-input" 
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                    />
                </div>
                <div>
                    <button
                    type="button"
                    className="track-btn"
                    onClick={toggleButton}
                    style={{ marginTop: "1.5rem" }}
                    >
                    Track Delivery
                    </button>
                </div>
            </div>
            }
            
            {!showTracking &&
            <div style={{ textAlign: "center", display: "block" }} className="displaytrackinfo" id="track2">
                <div>
                    <Logo style={{ margin: "0 auto" }} />
                </div>
                <h3 style={{ marginBottom: "3rem"}}>Track your Package</h3>
                <div style={{ textAlign: "left" }} className="deliveryinfo">

                    <h4 style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35"}}>Delivery Information</h4>

                    <div style={{display: "flex", margin: "0"}} className="form-label">
                    <p style={{fontWeight: "bold"}}> Delivery ID :&nbsp;</p><p>12345{}</p>
                    </div>
                    <div style={{display: "flex", marginBottom: "0rem"}} className="form-label">
                    <p style={{fontWeight: "bold"}}> Status :&nbsp;</p><p>In Transit{/*{trackingInfo.progress}*/}</p>
                    </div>
                    <div style={{display: "flex", marginBottom: "0rem"}} className="form-label">
                    <p style={{fontWeight: "bold"}}>Estimated Delivery Date :&nbsp;</p><p>Monday, November 20th, 2023{/*{trackingInfo.eta.toLocaleString()}*/}</p>
                    </div>
                    <div style={{display: "flex", marginBottom: "0rem"}} className="form-label">
                    <p style={{fontWeight: "bold"}}>Delivery Address :&nbsp;</p><p> 1455, Blvd. De Maisonneuve Ouest, Montreal, H3G 1M8{}</p>
                    </div>
                    <div style={{display: "flex", marginBottom: "0rem"}} className="form-label">
                    <p style={{fontWeight: "bold"}}>Customer support contact :&nbsp;</p><p>customersupport@amazawn.com</p>
                    </div>

                    <ProgressBar progress={0.4}/>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem" }}>
                    <div>
                    <button
                        type="button"
                        className="track-btn"
                        onClick={toggleButton}>
                            Track another package
                    </button>
                    </div>
                    <div><Link to="/" className="track-btn" onClick={() => {window.scroll(0, 0);}}>Go Back To Home Page</Link></div>
                    </div>
                </div>
            </div>
            }
            <Footer />
        </div>
    );
};

export default TrackingPage;