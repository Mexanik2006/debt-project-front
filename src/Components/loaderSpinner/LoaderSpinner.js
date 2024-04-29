import React from "react";
import "./spinner.css";

function LoadingSpinner({ boolean }) {

    return (
        <div style={boolean === false ? { display: "none" } : { display: "flex" }} className="spinner-container">
            <div className="loading-spinner" >
            </div>
        </div >
    );
}
export default LoadingSpinner