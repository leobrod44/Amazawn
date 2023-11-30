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

 // const [progressStatus, setProgressSatus] = useState("");
 //cannot be constant or else you cant reassign it inside ur try
  let progressStatus='';

  const handleInputChange = (event) => {
    setDeliveryID(event.target.value);
  };

  const handleContentChange = async () => {
    if (deliveryID == "") {
      console.log("Required fields are not filled");
      toast.error("Please enter a delivery ID.");
      return;
    }

    try {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      const formattedCurrentDate = currentDate.toISOString();

      const requestData = {
        shipmentID: deliveryID,
        currentDate: formattedCurrentDate,
      };
      console.log('DELIVERY ID INSIDE THE TRY',deliveryID);
      console.log('REQUEST DATA INSIDE THE TRY',requestData);

      const response = await axios.post(
        "http://localhost:8080/tracking/trackShipment",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('THIS IS THE BACKEND RESPONSE DATA',response.data);

      console.log('PROGESS',response.data.progress)
      console.log('TRACKING DATA', trackingData);

      if (response.data.progress == 1) {
        progressStatus = "order creater at " + trackingData.lastMilestone && new Date(trackingData.lastMilestone).toLocaleString();
      
      } else if (response.data.progress == 2) {
        progressStatus = "package picked up " + trackingData.lastMilestone && new Date(trackingData.lastMilestone).toLocaleString();
     
      } else if (response.data.progress == 3) {
        progressStatus = "package arrived at center 1 " + trackingData.lastMilestone && new Date(trackingData.lastMilestone).toLocaleString();
      
      } else if (response.data.progress == 4) {
        progressStatus = "package arrived at center 2 " + trackingData.lastMilestone && new Date(trackingData.lastMilestone).toLocaleString();
      
      } else if (response.data.progress == 5) {
        progressStatus = "arrived at destination " + trackingData.lastMilestone && new Date(trackingData.lastMilestone).toLocaleString();
     
      } else {
        progressStatus = "No update yet";
      }

      console.log("MADE IT PASSED THE TRY");
      console.log(progressStatus);
      
      ///testing to see if setshowtracking works, it doesnt. it stayts false even after setting it  to true
      console.log("showTracking before:", showTracking);
      setShowTracking(true);
      console.log("showTracking after:", showTracking);
     

    } catch (error) {
      console.log('ERROR INSIDE CATCH',error);
      toast.error('Invalid delivery ID.'); // how are you checking that the id is valid?
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
              <p>{progressStatus}</p>
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

            <ProgressBar progression={trackingData.progress / 5} />
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
