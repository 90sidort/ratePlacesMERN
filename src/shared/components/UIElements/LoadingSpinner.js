import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div
      className={`${props.asOverlay && "loading-spinner__overlay"}`}
      data-test="spinner"
    >
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
