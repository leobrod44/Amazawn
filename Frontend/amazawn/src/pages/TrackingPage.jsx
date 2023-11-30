import React, { useState } from "react";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styling/Tracking.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const TrackingPage = () => {
  const [deliveryID, setDeliveryID] = useState("");
  const navigate = useNavigate();
  const [trackingData, setTrackingData] = useState({
    progress: 0,
    eta: null,
    lastMilestone: null,
  });

  let progressStatus = "";

  const handleInputChange = (event) => {
    setDeliveryID(event.target.value);
  };

  const handleContentChange = async () => {
    console.log("hi, entering this method");
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
      console.log("DELIVERY ID INSIDE THE TRY", deliveryID);
      console.log("REQUEST DATA INSIDE THE TRY", requestData);

      const response = await axios.post(
        "http://localhost:8080/tracking/trackShipment",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("THIS IS THE BACKEND RESPONSE DATA", response.data);

      console.log("PROGESS", response.data.progress);
      console.log("TRACKING DATA", trackingData);

      if (response.data.progress == 1) {
        progressStatus = "Out for pickup at " + response.data.lastMilestoneDate;
      } else if (response.data.progress == 2) {
        progressStatus =
          "Package on it's way to origin delivery center at " +
          response.data.lastMilestoneDate;
      } else if (response.data.progress == 3) {
        progressStatus =
          "Package on it's way to destination delivery center at " +
          response.data.lastMilestoneDate;
      } else if (response.data.progress == 4) {
        progressStatus =
          "Out for delivery at " + response.data.lastMilestoneDate;
      } else if (response.data.progress == 5) {
        progressStatus = "Delivered at " + response.data.lastMilestoneDate;
      } else {
        progressStatus = "No update yet";
      }

      console.log("MADE IT PASSED THE TRY");
      console.log("PROGRESS STATUS IN TRACKING PAGE", progressStatus);

      navigate(
        `/trackingdata/${deliveryID}/${response.data.progress}/${response.data.ETA}/${progressStatus}`
      );
    } catch (error) {
      console.log("ERROR INSIDE CATCH", error);
      toast.error("Invalid delivery ID.");
    }
  };

  return (
    <div>
      <nav>
        <Header />
      </nav>
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
        <div>
          <input
            type="text"
            className="id-input"
            value={deliveryID}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button
            type="button"
            className="track-btn"
            style={{ marginTop: "1.5rem" }}
            onClick={handleContentChange}
          >
            Track Delivery
          </button>
        </div>
      </div>
      <nav>
        <Footer />
      </nav>
    </div>
  );
};

export default TrackingPage;
