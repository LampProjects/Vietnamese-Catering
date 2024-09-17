// Login.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";  // Make sure this path is correct
import "./Login.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Check if the server sent a token
        if (data.token) {
          auth.login(data.token);
          setMessage("Login successful. Redirecting...");
          setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
        } else {
          setMessage("Login successful, but no token received. Please try again.");
        }
      } else {
        setMessage(data.msg || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <main>
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </main>
  );
}

export default LoginPage;