import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import StartPlay from "./components/StartPlay";
import Beginner from "./components/Beginner";
import Expert from "./components/Expert";
import Intermediate from "./components/Intermediate";

import HowToPlay from "./components/HowToPlay";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";

import { auth } from "./firebase";

const Root = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate loading time for the splash screen
    setTimeout(() => {                          
      setShowLoading(false);
    }, 2000); // Adjust the duration as needed

    // Check authentication status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/start-play" element={<StartPlay />} />
        <Route path="/beginner" element={<Beginner />} />
        <Route path="/intermediate" element={<Intermediate />} />
        <Route path="/expert" element={<Expert />} />
        <Route path="/howtoplay" element={<HowToPlay />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

reportWebVitals();
