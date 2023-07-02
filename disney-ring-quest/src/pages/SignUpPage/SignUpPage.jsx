import React, { useState } from "react";
import axios from "axios";
import "./SignUpPage.css";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg("Password and Confirm Password must match.");
      setError(true);
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Registration successful! You can now go back and log in.");
        setError(false);
        setMsg("Registration successful! You can now go back and log in.");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        if (error.response && error.response.data) {
          const { status, data } = error.response;

          if (status === 400) {
            if (data.includes("already exists")) {
              setErrorMsg("The user with the provided email already exists.");
            } else if (data.includes("Please fill in all the fields")){
              setErrorMsg("Please fill in all the fields")
            } else if (data.includes("Invalid username")){
              setErrorMsg("Username should be alphanumeric (4 - 20 characters)")
            } else if (data.includes("Invalid email address")) {
              setErrorMsg("Invalid email address")
            } else if (data.includes("Invalid password ")){
              setErrorMsg("Password length between 4 and 20 characters")
            } else {
              setErrorMsg("There was an error with the registration, please try again.");
            }
          } else {
            setErrorMsg("An error occurred during registration, please try again.");
          }
        }
        setError(true);
      });
  };

  return (
    <div className="login-container">
      {msg.length > 0 && <div className="successMsg">{msg}</div>}
      {error && <div className="error">{errorMsg}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default SignUpPage;
