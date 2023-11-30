import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Header from "./Header";
import Footer from "./Footer";
import ProgressBar from "../components/ProgressBar";

const TrackingDataPage = ({
    dID,
    prog,
    eta,
    progStatus
}) => (
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
            <p>{dID}</p>
        </div>
        <div
            style={{ display: "flex", marginBottom: "0rem" }}
            className="form-label"
        >
            <p style={{ fontWeight: "bold" }}> Status :&nbsp;</p>
            <p>{progStatus}</p>
        </div>
        <div
            style={{ display: "flex", marginBottom: "0rem" }}
            className="form-label"
        >
            <p style={{ fontWeight: "bold" }}>
            Estimated Delivery Date :&nbsp;
            </p>
            <p>{eta && new Date(eta).toLocaleString()}</p>
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

        <ProgressBar progression={prog / 5} />
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
                className="btn"
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
        <nav>
        <Footer />
      </nav>
    </div>
)

export default TrackingDataPage;