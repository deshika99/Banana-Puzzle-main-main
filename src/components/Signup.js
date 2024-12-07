import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import { auth } from "../firebase";
import "../styling/Signup.css";
import logo from "../Images/logo.png"; // Import the banana logo image

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [userCreated, setUserCreated] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for signup process
  const navigate = useNavigate(); // Initialize navigate for redirecting

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 6) { // Password strength check
      setError("Password should be at least 6 characters");
      return;
    }

    setLoading(true); // Set loading to true while processing

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Optionally set the username after the account is created
      await user.updateProfile({ displayName: username });

      setUserCreated(true); // Mark the user as created successfully
      setLoading(false); // Set loading to false after the user is created
    } catch (error) {
      setError(error.message);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  // Redirect to login page if user is created successfully
  if (userCreated) {
    navigate("/login");
  }

  return (
    <div className="signup-container">
      <div className="background-image"></div>
      <div className="signup-box">
        <img src={logo} alt="Bananapuzzle Logo" className="signup-logo" />
        <h2 className="signup-title">Welcome to BananaPuzzle</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            className="signup-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="signup-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="signup-button" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="signup-text">
          Already have an account?{" "}
          <Link className="signup-link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
