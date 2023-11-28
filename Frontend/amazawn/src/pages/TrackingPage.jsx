import React from "react";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styling/Tracking.css";

const TrackingPage = () => {
    
    const [showTracking, setshowTracking] = useState(true);
    const toggleButton = () => {
        setshowTracking(!showTracking);
    }

    return(
        <div>
            <nav>
                <Header />
            </nav>
            {showTracking &&
            <div style={{ textAlign: "center", display: "block" }} className="trackdelivery">
                <div>
                    <Logo style={{ margin: "0 auto" }} />
                </div>
                <h3 style={{ marginBottom: "3rem"}}>Track your Package</h3>

                <label style={{ marginBottom: "0.3rem",  marginTop: "2rem", color:"#024f35"}}>Enter your delivery ID: </label>
                <div><input type="text" className="id-input"/></div>
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
                    <p style={{fontWeight: "bold"}}> Status :&nbsp;</p><p>In Transit{}</p>
                    </div>
                    <div style={{display: "flex", marginBottom: "0rem"}} className="form-label">
                    <p style={{fontWeight: "bold"}}>Estimated Delivery Date :&nbsp;</p><p>Monday, November 20th, 2023{}</p>
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
            <nav>
                <Footer />
            </nav>
        </div>
    );
};

export default TrackingPage;