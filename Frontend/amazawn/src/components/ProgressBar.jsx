import React from "react";
import "../styling/Tracking.css";

const ProgressBar = ({progress}) => {

    return (
        <div style={{marginTop: "20px"}}>
        <label className="progress-label">Progression</label>
            <div className="progressbar-container">
                <div style={{width: "250px" }} role="progressbar" /* progress width still not working well, will edit in the next commit*/
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={1}
                    className="progressbar">
                    <span className="progressbar-label">{`${progress*100}%`}</span>
                </div>
            </div>
        </div>
    );
};
  
export default ProgressBar;