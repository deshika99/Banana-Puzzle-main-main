import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Add react-router-dom for navigation
import logo from "../Images/logo.png";  // Import the image from the src folder
import "../styling/Loading.css";

function Loading() {
  const navigate = useNavigate();  // Initialize navigate from react-router-dom

  useEffect(() => {
    // Navigate to the login page after 4000 milliseconds (4 seconds)
    const timeoutId = setTimeout(() => {
      navigate("/login");  // Use navigate from react-router-dom for routing
    }, 4000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, [navigate]);  // Added navigate to the dependency array for safety

  return (
    <div className="loading">
      <div className="logo-container">
        {/* Use the imported logo with a fallback image */}
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onError={(e) => e.target.src = "../Images/default-logo.png"}  // Fallback image in case logo fails to load
        />
      </div>
      <h1 className="game-name">BananaPuzzle</h1>
      <div className="loading-text">
        Loading...
        <div className="spinner"></div>  {/* Loading spinner */}
      </div>
    </div>
  );
}

export default Loading;
