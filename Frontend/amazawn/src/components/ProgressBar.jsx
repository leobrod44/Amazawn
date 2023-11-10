import React from "react";
import "../styling/index.css";

const ProgressBar = ({progress}) => {

    return (
        <div>
        <label className="progress-label">Progression</label>
            <div className="progressbar-container">
                <div width={`${progress*100}%`} role="progressbar" /* progress width still not working well, will edit in the next commit*/
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