import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook for navigation
import "../styling/Profile.css"; // Import Profile CSS file

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();  // Initialize useNavigate hook

  // Function to update profile data (e.g., after a game is played)
  const updateProfile = (newData) => {
    setUserProfile((prevProfile) => {
      const updatedProfile = { ...prevProfile, ...newData };
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile)); // Save to localStorage
      return updatedProfile;
    });
  };

  // Function to simulate game completion and profile update (to test)
  const simulateGameUpdate = () => {
    if (userProfile) {
      // Simulated data after a game is played
      const newGameData = {
        highestScore: 5000, // New highest score (simulated)
        timesPlayed: userProfile.timesPlayed + 1, // Increment times played
        totalTimeSpent: userProfile.totalTimeSpent + 20, // Add 20 minutes to total time
      };

      updateProfile(newGameData);
    }
  };

  // Back button handler to navigate to the StartGame (Start-Play) page
  const handleBackClick = () => {
    navigate("/start-play"); // Navigate to the StartGame page
  };

  useEffect(() => {
    // Fetch user profile data from localStorage or default if not available
    const userData = JSON.parse(localStorage.getItem("userProfile")) || {
      username: "Guest",
      highestScore: 0,
      timesPlayed: 0,
      totalTimeSpent: 0,
    };

    // Set the profile and stop loading
    setUserProfile(userData);
    setLoading(false);
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {loading ? (
        <p>Loading profile...</p> // Show loading message while fetching data
      ) : (
        userProfile && (
          <div className="profile-content">
            <div>
              <strong>User Name/Email:</strong> {userProfile.username}
            </div>
            <div>
              <strong>Highest Score:</strong> {userProfile.highestScore}
            </div>
            <div>
              <strong>Times Played:</strong> {userProfile.timesPlayed}
            </div>
            <div>
              <strong>Total Time Spent:</strong> {userProfile.totalTimeSpent}{" "}
              minutes
            </div>
          </div>
        )
      )}

      {/* Simulate Game Update Button */}
      <button onClick={simulateGameUpdate} className="update-button">
        Simulate Game Update (for testing)
      </button>

      {/* Back Button */}
      <button onClick={handleBackClick} className="back-button">
        Back to Start-Play
      </button>
    </div>
  );
};

export default Profile;
