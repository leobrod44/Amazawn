import React from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "./Logo";
import Header from "./Header";
import Footer from "./Footer";
import ProgressBar from "../components/ProgressBar";
import "../styling/Tracking.css";
import ProgressionBar from "./ProgressionBar";


const TrackingDataPage = () => {
    const { deliveryID, progress, ETA, progressStatus } = useParams();
  
    console.log(deliveryID);
    console.log(progress);
    console.log(ETA);
    console.log(' PROGRESS STATUS IN TR5ACKING DATA PAGE' , progressStatus);

return (
    <div>
      <nav>
        <Header />
      </nav>
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
            <p>{ETA && new Date(ETA).toLocaleString()}</p>
        </div>
        <div
            style={{ display: "flex", marginBottom: "0rem" }}
            className="form-label"
        >
            <p style={{ fontWeight: "bold" }}>
            Customer support contact :&nbsp;
            </p>
            <p>amazawnlogistics@gmail.com</p>
        </div>
        <div style={{ marginTop: "2.5rem", justifyContent: "left" }}>
            <ProgressionBar currentStage={progress} />
        </div>
        <div
            style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3rem",
            }}
        >
            <div>
            <Link
                to="/tracking"
                className="track-btn"
                onClick={() => {
                window.scroll(0, 0);
                }}
            >
                Track another package
            </Link>
            </div>
            <div>
            <Link
                to="/"
                className="track-btn"
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
        <nav>
        <Footer />
      </nav>
    </div>
)
};
export default TrackingDataPage;