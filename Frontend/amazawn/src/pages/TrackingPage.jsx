import React from "react";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styling/index.css";
import "../styling/Tracking.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrackingPage = () => {
  const [showTracking, setShowTracking] = useState(false);
  const [deliveryID, setDeliveryID] = useState("");
  const [trackingData, setTrackingData] = useState({
    progress: 0,
    eta: null,
    lastMilestone: null
  });
  
  const handleInputChange = (event) => {
    setDeliveryID(event.target.value);
  };

  const handleContentChange = async () => {
    if (deliveryID == "") {
      console.log("Required fields are not filled");
      toast.error("Please enter a delivery ID.");
      return;
    }
    setShowTracking(true);
    try {
      //get the current date
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      const formattedCurrentDate = currentDate.toISOString();

      const requestData = {
        shipmentID: deliveryID,
        currentDate: formattedCurrentDate,
      };
      console.log(deliveryID);
      console.log(requestData);

      const response = await axios.post(
        "http://localhost:8080/tracking/trackShipment",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setTrackingData({
        progress: response.data.progress,
        eta: new Date(response.data.eta),
        lastMilestone: new Date(response.data.lastMilestone),
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle errors if the request fails
      toast.error('Invalid delivery ID.'); 
    }
  };
  
  return (
    <div>
      <nav>
        <Header />
      </nav>
      {!showTracking && (
        <div
          style={{ textAlign: "center", display: "block" }}
          className="trackdelivery"
        >
          <div>
            <Logo style={{ margin: "0 auto" }} />
          </div>
          <h3 style={{ marginBottom: "3rem" }}>Track your Package</h3>

          <label
            style={{
              marginBottom: "0.3rem",
              marginTop: "2rem",
              color: "#024f35",
            }}
          >
            Enter your delivery ID:{" "}
          </label>
          <input
            type="text"
            className="form-input"
            value={deliveryID}
            onChange={handleInputChange}
          />
          <div>
            <button
              type="button"
              className="btn"
              onClick={handleContentChange}
              style={{ marginTop: "1.5rem" }}
            >
              Track Delivery
            </button>
          </div>
        </div>
      )}

      {showTracking && (
        <div
          style={{ textAlign: "center", display: "block" }}
          className="displaytrackinfo"
          id="track2"
        >
          <div>
            <Logo style={{ margin: "0 auto" }} />
          </div>
          <h3 style={{ marginBottom: "3rem" }}>Track your Package</h3>
          <div style={{ textAlign: "left" }} className="deliveryinfo">
            <h4
              style={{
                marginBottom: "0.3rem",
                marginTop: "2rem",
                color: "#024f35",
              }}
            >
              Delivery Information
            </h4>

            <div
              style={{ display: "flex", margin: "0" }}
              className="form-label"
            >
              <p style={{ fontWeight: "bold" }}> Delivery ID :&nbsp;</p>
              <p>{deliveryID}</p>
            </div>
            <div
              style={{ display: "flex", marginBottom: "0rem" }}
              className="form-label"
            >
              <p style={{ fontWeight: "bold" }}> Status :&nbsp;</p>
              <p>{trackingData.progress} at {trackingData.lastMilestone && new Date(trackingData.lastMilestone).toLocaleString()}</p>
            </div>
            <div
              style={{ display: "flex", marginBottom: "0rem" }}
              className="form-label"
            >
              <p style={{ fontWeight: "bold" }}>
                Estimated Delivery Date :&nbsp;
              </p>
              <p>{trackingData.eta && new Date(trackingData.eta).toLocaleString()}</p>
            </div>
            <div
              style={{ display: "flex", marginBottom: "0rem" }}
              className="form-label"
            >
              <p style={{ fontWeight: "bold" }}>Delivery Address :&nbsp;</p>
              <p> 1455, Blvd. De Maisonneuve Ouest, Montreal, H3G 1M8{}</p>
            </div>
            <div
              style={{ display: "flex", marginBottom: "0rem" }}
              className="form-label"
            >
              <p style={{ fontWeight: "bold" }}>
                Customer support contact :&nbsp;
              </p>
              <p>customersupport@amazawn.com</p>
            </div>

            <ProgressBar progress={0.4} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "3rem",
              }}
            >
              <div>
                <button type="button" className="btn" onClick={setShowTracking(false)}>
                  Track another package
                </button>
              </div>
              <div>
                <Link
                  to="/"
                  className="btn"
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                >
                  Go Back To Home Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <nav>
        <Footer />
      </nav>
    </div>
  );
};

export default TrackingPage;
