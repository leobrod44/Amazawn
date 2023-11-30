import React,{ useState } from "react";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrackingDataPage from "../components/TrackingDataPage";
import "../styling/index.css";
import "../styling/Tracking.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const TrackingPage = () => {
  //const [showTracking, setShowTracking] = useState(false);
  const [deliveryID, setDeliveryID] = useState("");
  const navigate = useNavigate();
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

  //const handleCloseTracking = () => {
  //  setShowTracking(false);
  //};

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
      //console.log("showTracking before:", showTracking);
      //setShowTracking(true);
      //console.log("showTracking after:", showTracking);
     
      //go to trackingdata pag
      //{showTracking && <TrackingDataPage onClick={handleCloseTracking} diD={deliveryID} prog={trackingData.progress}  eta={trackingData.eta} progStatus={progressStatus}/>}
      navigate('/trackingdata?dID=${deliveryID}&prog=${trackingData.progress}&eta=${trackingData.eta}&progStatus=${progressStatus}');

    } catch (error) {
      console.log('ERROR INSIDE CATCH',error);
      toast.error('Invalid delivery ID.'); //does not mean that ID is invalid for now, just shows that backend isnt reached
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
