import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import "../styling/Leaderboard.css"; // Import Leaderboard CSS file

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize useNavigate hook for navigating

  useEffect(() => {
    // Fetch leaderboard data from localStorage
    const fetchLeaderboardData = () => {
      try {
        const data = JSON.parse(localStorage.getItem("leaderboard")) || [];
        // Sort the leaderboard data by score in descending order
        const sortedLeaderboard = data.sort((a, b) => b.score - a.score);
        setLeaderboard(sortedLeaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard data", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    // Fetch the logged-in user's email from localStorage
    const userEmail = localStorage.getItem("loggedInUserEmail");
    setLoggedInUser(userEmail); // Update logged-in user state

    fetchLeaderboardData(); // Get the leaderboard data
  }, []);

  // Function to handle back button click
  const handleBackClick = () => {
    navigate("/start-play"); // Navigate to the start-play page
  };

  if (loading) {
    return <div>Loading leaderboard...</div>; // Loading state message
  }

  return (
    <div className="leaderboard-container">
      {/* Back Button */}
      <button onClick={handleBackClick} className="back-button" aria-label="Back to Start Play">
        Back to Start-Play
      </button>

      <h2>Leaderboard</h2>
      <table className="leaderboard-table" role="table">
        <thead>
          <tr role="row">
            <th role="columnheader">Rank</th>
            <th role="columnheader">Username/Email</th>
            <th role="columnheader">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr
              key={index}
              className={entry.username === loggedInUser ? "highlighted" : ""}
              role="row"
            >
              <td role="cell">{index + 1}</td>
              <td role="cell">
                {entry.username === loggedInUser
                  ? "You"
                  : entry.email || `Player ${index + 1}`}
              </td>
              <td role="cell">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
