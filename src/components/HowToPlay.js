import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import "../styling/HowToPlay.css"; // Import the stylesheet for HowToPlay component

const HowToPlay = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to navigate back to start-play page
  const goHome = () => {
    navigate("/start-play"); // Redirect to the start-play page
  };

  return (
    <div className="how-to-play-container">
      <div className="how-to-play-content">
        {/* Back button */}
        <button
          onClick={goHome}
          className="back-button"
          aria-label="Back to start page"
        >
          Back to Start
        </button>

        {/* Header section */}
        <div className="how-to-play-header">
          <h1>How to Play BananaPuzzle</h1>
          <p>Welcome to BananaPuzzle! Below are the instructions on how to get started:</p>
        </div>

        {/* Instructions section */}
        <div className="how-to-play-instructions">
          <h2>Instructions:</h2>
          <ol>
            <li>
              <strong>Account Creation and Login:</strong> 
              First, users create an account using their email address and password. They are immediately logged in after successfully registering. Returning users only need to enter their login credentials to log in.
            </li>
            <li>
              <strong>Game Menu:</strong> 
              After logging in, users are taken to the game menu. Here, they can choose from a number of alternatives such as launching a new game, viewing their profile, signing out, and checking the leaderboard.
            </li>
            <li>
              <strong>Choosing Difficulty:</strong> 
              Users are presented with four difficulty levels when they decide to start a new game: Beginner, Intermediate, and Expert.
            </li>
            <li>
              <strong>Game Play:</strong> 
              After selecting a difficulty level, the game begins. A series of questions with accompanying images are presented. Users have a limited amount of time and chances to answer correctly. Incorrect answers reduce the score and chances.
            </li>
            <li>
              <strong>Leaderboard:</strong> 
              After completing a round, users can visit the leaderboard to compare their scores with other players. The leaderboard updates in real-time after each round.
            </li>
            <li>
              <strong>User Profile:</strong> 
              Users can view their profile to check information such as their username, email address, highest score, and times played.
            </li>
            <li>
              <strong>Replaying or Exiting:</strong> 
              After completing a round, players are given the option to play again or return to the game menu to start a new round.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
