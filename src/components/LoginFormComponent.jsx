import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const LoginFormComponent = ({ onLogin }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const signIn = async () => {
    try {
      const response = await fetch(
        "https://657ed6ec3e3f5b1894643d06.mockapi.io/users"
      );

      if (response.ok) {
        const users = await response.json();
        const user = users.find(
          (user) =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
        );

        if (user) {
          // setIsLoggedIn(true);
          await login(email);
          navigate("/home");
          // onLogin({ email, password });
        } else {
          console.error("Invalid login credentials");
          setMessage("Invalid login credentials");
        }
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="login-inputs-container">
          <label className="login-label">Email: </label>
          <input
            type="email"
            value={email}
            placeholder="Enter Email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="login-label">Password: </label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            name="password"
            required
          />
        </div>
        <br />
        <div className="login-buttons-container">
          <button className="login-button" type="submit">
            Login
          </button>
          <br />
          <div className="remember-me-container">
            {" "}
            <p id="remember-me">Remember me</p>
            <input
              className="memory"
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked((prevState) => !prevState)}
            />{" "}
          </div>
          <button className="login-button" type="button">
            Cancel
          </button>
          <br />
          <a className="memory" id="forgot" href="#">
            {" "}
            Forgot password?{" "}
          </a>
        </div>
      </form>
      {message && <p className="wrong-cred">{message}</p>}
    </div>
  );
};

export default LoginFormComponent;
