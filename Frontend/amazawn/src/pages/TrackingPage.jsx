import React from "react";
import Logo from "../components/Logo";
import ProgressBar from "../components/ProgressBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styling/index.css";

const TrackingPage = () => {
    
    const [showTracking, setshowTracking] = useState(true);
    const toggleButton = () => {
        setshowTracking(!showTracking);
    }

    return(
        <div>
            {showTracking &&
            <div style={{ textAlign: "center", display: "block" }} className="trackdelivery">
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
                <h3 style={{ marginBottom: "3rem"}}>Track you Package</h3>
                <div style={{ textAlign: "left" }} className="deliveryinfo">
                    <h4 style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35"}}>Delivery Information</h4>
                    <p className="form-label">Status: {}</p>
                    <p className="form-label">Estimated Delivery Time: {}</p>
                    <p className="form-label">Delivery Address: {}</p>
                    <p className="form-label">Customer support contact: {}</p>

                    <ProgressBar progress={0.4}/>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem" }}>
                    <div>
                    <button
                        type="button"
                        className="btn"
                        onClick={toggleButton}>
                            Track another package
                    </button>
                    </div>
                    <div><Link to="/" className="btn" onClick={() => {window.scroll(0, 0);}}>Go Back To Home Page</Link></div>
                    </div>
                </div>
            </div>
            }

        </div>
    );
};

export default TrackingPage;