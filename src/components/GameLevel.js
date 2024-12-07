import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styling/GameLevel.css';
import GameOverOverlay from './GameOverOverlay';
import Leaderboard from './Leaderboard'; // Import Leaderboard component

const GameLevel = ({ difficulty, initialTimerDuration, initialChances }) => {
  // State variables
  const [question, setQuestion] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [answer, setAnswer] = useState('');
  const [timer, setTimer] = useState(initialTimerDuration);
  const [chances, setChances] = useState(initialChances);
  const [score, setScore] = useState(0);
  const [roundOver, setRoundOver] = useState(false);
  

  // Function to fetch question and image URL from the API
  const fetchQuestion = async () => {
    try {
      const response = await fetch('https://marcconrad.com/uob/banana/api.php');
      const data = await response.json();
      setQuestion(data.question);
      // Extract the image URL from the question object
      const imageUrlMatch = data.question.match(/https:\/\/.+\.png/);
      if (imageUrlMatch) {
        setImageUrl(imageUrlMatch[0]);
      } else {
        console.error('No valid image URL found in the question.');
        // Optionally, handle this case by fetching another question or ending the game
      }
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  // Function to handle user's answer submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the answer is correct
    const lastDigitMatch = imageUrl.match(/\d(?=\.png)/);
    if (lastDigitMatch && answer.trim() === lastDigitMatch[0]) {
      // Handle correct answer
      console.log('Correct answer!');
      
      // Award 5 points for correct answer
      setScore((prevScore) => prevScore + 5);
    } else {
      // Handle wrong answer
      console.log('Wrong answer!');
      
      // Decrement chances
      setChances((prevChances) => {
        const updatedChances = prevChances - 1;
        if (updatedChances <= 0) {
          // Handle game over
          console.log('Game over!');
          setRoundOver(true);
          handleGameOver(); // Update leaderboard on game over
        }
        return updatedChances;
      });
    }
    // Clear the input field
    setAnswer('');
    // Reset timer for the next question
    setTimer(initialTimerDuration);
    // Fetch a new question if the game is not over
    if (!roundOver) {
      fetchQuestion();
    }
  };

  // Function to handle timer countdown
  useEffect(() => {
    if (roundOver) return; // Do not start timer if the game is over

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        } else {
          // Time's up
          
          console.log('Time\'s up!');
          // Decrement chances
          setChances((prevChances) => {
            const updatedChances = prevChances - 1;
            if (updatedChances <= 0) {
              // Handle game over
              console.log('Game over!');
              setRoundOver(true);
              handleGameOver(); // Update leaderboard on game over
            }
            return updatedChances;
          });
          // Reset timer for the next question
          setTimer(initialTimerDuration);
          // Fetch a new question if the game is not over
          if (chances - 1 > 0) {
            fetchQuestion();
          }
          return initialTimerDuration;
        }
      });
    }, 1000);

    // Cleanup function
    return () => clearInterval(countdown);
  }, [roundOver, initialTimerDuration, chances]);

  

  // Function to handle retry
  const handleRetry = () => {
    setRoundOver(false);
    setChances(initialChances);
    setScore(0);
    setTimer(initialTimerDuration);
    fetchQuestion();
    
  };

  // Function to handle cancel
  const handleCancel = () => {
    // Navigate to home or start game
    // Implement your navigation logic here, e.g., using React Router
    console.log('Navigate to home or start game');
  };

  // Function to handle game over
  const handleGameOver = () => {
    // Update leaderboard with the player's score
    const leaderboardEntry = { username: 'Player', score };
    updateLeaderboard(leaderboardEntry);
  };

  // Function to update leaderboard
  const updateLeaderboard = (newEntry) => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => b.score - a.score); // Sort leaderboard entries by score descending
    // Optionally, limit the leaderboard to top N entries
    const topN = 10;
    const updatedLeaderboard = leaderboard.slice(0, topN);
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
  };

  

  // Fetch question on component mount
  useEffect(() => {
    fetchQuestion();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${difficulty.toLowerCase()}-container`}>
      
      

      {!roundOver && (
        <>
          <div className="timer-container">
            <h3 className="timer">Time left: {timer} seconds</h3>
            <h3 className="chances">Chances left: {chances}</h3>
            <h3 className="score">Score: {score}</h3>
            
          </div>
          <div className="question-container">
            {imageUrl && <img src={imageUrl} alt="Question" className="question-image" />}
          </div>
          <div className="answer-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="answer-input"
                required
              />
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </>
      )}
      {roundOver && (
        <GameOverOverlay onRetry={handleRetry} onCancel={handleCancel} score={score} />
      )}
  
      </div>

  );
};

GameLevel.propTypes = {
  difficulty: PropTypes.oneOf(['Easy', 'Intermediate', 'Hard']).isRequired,
  initialTimerDuration: PropTypes.number.isRequired,
  initialChances: PropTypes.number.isRequired,
};

export default GameLevel;
