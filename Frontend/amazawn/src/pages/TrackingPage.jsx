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

      const response = await axios.post(
        "http://localhost:8080/tracking/trackShipment",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      navigate(
        `/trackingdata/${deliveryID}/${response.data.progress}/${response.data.ETA}/${response.data.lastMilestoneDate}`
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
