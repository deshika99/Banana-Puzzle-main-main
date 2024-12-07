import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import StartPlay from "./components/StartPlay";
import Beginner from "./components/Beginner";
import Intermediate from "./components/Intermediate";
import Expert from "./components/Expert";
import HowToPlay from "./components/HowToPlay";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import GameOver from "./components/GameOverOverlay";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Loading />} /> {/* Default Route */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/start-play" element={<StartPlay />} />
          <Route path="/beginner" element={<Beginner />} />
          <Route path="/intermediate" element={<Intermediate />} />
          <Route path="/expert" element={<Expert />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gameover" element={<GameOver />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
