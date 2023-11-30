import React from "react";
import "../styling/ProgressionBar.css";

const ProgressionBar = ({ currentStage }) => {
    
    /*
    return (
        <div className="stepper-wrapper">
        <div id="1" className="stepper-item completed">
            <div className="step-counter">1</div>
            <div className="step-name">Shipped</div>
        </div>
        <div id="2" className="stepper-item completed">
            <div className="step-counter">2</div>
            <div className="step-name">Center 1</div>
        </div>
        <div id="3" className="stepper-item active">
            <div className="step-counter">3</div>
            <div className="step-name">Center 2</div>
        </div>
        <div id="4" className="stepper-item">
            <div className="step-counter">4</div>
            <div className="step-name">Out for delivery</div>
        </div>
        <div id="5" className="stepper-item">
            <div className="step-counter">5</div>
            <div className="step-name">Delivered</div>
        </div>
        </div>
    ) */
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

// Define a function to get step names based on step number
const getStepName = (step) => {
    switch (step) {
        case 1:
            return "Shipped";
        case 2:
            return "Center 1";
        case 3:
            return "Center 2";
        case 4:
            return "Out for delivery";
        case 5:
            return "Delivered";
        default:
            return "";
    }
};
export default ProgressionBar;
