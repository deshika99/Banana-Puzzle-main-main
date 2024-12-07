import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import { auth } from "../firebase";
import "../styling/Login.css";
import logo from "../Images/logo.png"; // Import the banana logo image

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for login process
  const navigate = useNavigate(); // For programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true); // Start loading indicator
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setLoading(false);
      navigate("/home"); // Navigate to Home after successful login
    } catch (error) {
      setLoading(false);
      setError(error.message); // Show error message
    }
  };

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <div className="login-box">
        <img src={logo} alt="Bananapuzzle Logo" className="login-logo" />
        <h2 className="login-title">Welcome to BananaPuzzle</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="login-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"} {/* Show loading text */}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="login-text">
          Don't have an account?{" "}
          <Link className="login-link" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
