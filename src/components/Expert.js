import React from "react";
import { useNavigate } from "react-router-dom";
import GameLevel from "./GameLevel";
import "../styling/Expert.css";

const Expert = () => {
  const navigate = useNavigate();

  // Function to handle the back button click with confirmation
  const handleBackClick = () => {
    if (window.confirm("Are you sure you want to leave? Your progress will be lost.")) {
      navigate(-1);
    }
  };

  // Expert level configuration
  const levelConfig = {
    difficulty: "Expert",
    initialTimerDuration: 15, // 15 seconds for the timer
    initialChances: 2, // 2 chances for Expert level
    maxQuestions: 15, // Total number of questions
  };

  return (
    <div className="expert-container">
      {/* Back Button */}
      <button onClick={handleBackClick} className="back-button">
        Back
      </button>

      {/* GameLevel component */}
      <GameLevel
        difficulty={levelConfig.difficulty}
        initialTimerDuration={levelConfig.initialTimerDuration}
        initialChances={levelConfig.initialChances}
        maxQuestions={levelConfig.maxQuestions}
      />
    </div>
  );
};

export default Expert;
