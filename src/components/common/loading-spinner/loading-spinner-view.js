import React from "react";
import "./loading-spinner-styles.css";

function LoadingSpinner() {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingSpinner;
