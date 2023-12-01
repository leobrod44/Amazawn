import React from "react";
import "../styling/ProgressionBar.css";

const ProgressionBar = ({ currentStage }) => {
  
    return (
        <div className="stepper-wrapper">
            {[1, 2, 3, 4, 5].map((step) => (
                <div
                    key={step}
                    id={step}
                    className={`stepper-item ${step < currentStage ? 'completed' : ''} ${step === currentStage ? 'active' : ''}`}
                >
                    <div className="step-counter">{step}</div>
                    <div className="step-name">{getStepName(step)}</div>
                </div>
            ))}
        </div>
    );

};

const getStepName = (step) => {
    switch (step) {
        case 1:
            return "Picking up";
        case 2:
            return "Picked up";
        case 3:
            return "In transit";
        case 4:
            return "Out for delivery";
        case 5:
            return "Delivered";
        default:
            return "";
    }
};
export default ProgressionBar;
