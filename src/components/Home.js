import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate for redirecting
import "../styling/Home.css"; // Adjust the import path
import logo from "../Images/logo.png"; // Import the banana logo image
import { auth } from "../firebase"; // Import your authentication module

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook for programmatic navigation

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
      } else {
        // No user is signed in
        setUser(null);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // Render username or email if user is logged in
  const usernameOrEmail = user ? user.displayName || user.email : "Guest";

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Redirect to the root/home page after logout
        navigate("/");  // Navigate to the root path ("/")
      })
      .catch((error) => {
        // Handle logout error
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="home-container">
      <div className="background-image"></div>
      <div className="content-wrapper">
        <div className="game-info">
          <img src={logo} alt="Bananapuzzle Logo" className="game-logo" />
          <p className="welcome-note">
            Hello, <span className="username">{usernameOrEmail}</span>!
          </p>
        </div>
        <div className="navigation">
          <Link to="/start-play" className="nav-link start-play highlighted">
            Start Play
          </Link>
          <Link to="/howtoplay" className="nav-link how-to-play">
            How to Play
          </Link>
          <Link to="/leaderboard" className="nav-link leaderboard">
            Leaderboard
          </Link>
          <Link to="/profile" className="nav-link profile">
            Profile
          </Link>
          <button className="nav-button logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
