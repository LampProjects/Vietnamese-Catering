// Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.msg);
        // Redirect to login page after successful registration
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.msg || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
    </main>
  );
}

export default RegisterPage;