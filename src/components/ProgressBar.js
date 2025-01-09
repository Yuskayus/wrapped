import React from "react";
import "./ProgressBar.css"; // Untuk styling (opsional)

const ProgressBar = ({ totalSteps, activeStep }) => {
 

  return (
    <div className="progress-bar">

      <div className="progress-bar-steps">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`progress-bar-step ${
              index <= activeStep ? "active" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
