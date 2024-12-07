import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameLevel from './GameLevel';
import '../styling/Beginner.css';

const Beginner = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [gameOver, setGameOver] = useState(false); // State to track game over

  // Define the conditions for the Beginner level
  const initialTimerDuration = 50; // Initial timer duration in seconds
  const initialChances = 3; // Initial number of chances
  const maxQuestions = 15; // Maximum number of questions

  // Function to handle back
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  // Function to handle when the game ends
  const handleGameOver = () => {
    setGameOver(true);
    navigate('/game-over'); // Navigate to the Game Over page
  };

  return (
    <div className="beginner-container">
      {/* Back Button */}
      <button onClick={handleBackClick} className="back-button">
        Back
      </button>

      {/* Only show the game if it's not over */}
      {!gameOver ? (
        <GameLevel
          difficulty="Beginner"
          initialTimerDuration={initialTimerDuration}
          initialChances={initialChances}
          maxQuestions={maxQuestions}
          onGameOver={handleGameOver} // Pass the onGameOver handler to the GameLevel component
        />
      ) : null}
    </div>
  );
};

export default Beginner;
