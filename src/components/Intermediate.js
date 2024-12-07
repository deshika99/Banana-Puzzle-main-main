import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import GameLevel from "./GameLevel";
import "../styling/Intermediate.css"; // Import the CSS file for Intermediate styling

const Intermediate = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle the back button click and navigate to the previous page
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="intermediate-container">
      {/* Back Button with accessibility enhancements */}
      <button
        onClick={handleBackClick}
        className="back-button"
        aria-label="Go back to the previous page"
      >
        Back
      </button>

      {/* GameLevel component with necessary props */}
      <GameLevel
        difficulty="Intermediate"
        initialTimerDuration={30}
        initialChances={3}
        maxQuestions={15}
      />
    </div>
  );
};

export default Intermediate;
