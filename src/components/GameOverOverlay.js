import React from "react";
import { Link } from "react-router-dom";
import "../styling/GameOver.css"; // External CSS for styling

const GameOver = ({ score }) => {
  return (
    <div className="game-over-container">
      <div className="game-over-content">
        <h1 className="game-over-title">Game Over</h1>
        <p className="game-over-message">You have run out of chances!</p>
        {score !== undefined && (
          <p className="game-over-score">Your final score: {score}</p>
        )}
        <div className="game-over-buttons">
          <Link to="/start-play">
            <button className="game-over-button retry">Retry</button>
          </Link>
          <Link to="/">
            <button className="game-over-button home">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
