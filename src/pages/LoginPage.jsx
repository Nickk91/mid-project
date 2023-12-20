import React, { useState } from "react";
import LoginFormComponent from "../components/LoginFormComponent";
import "../stylesheets/page-styling.css";
import "../stylesheets/login-page-styling.css";
import logo from "../assets/waether-app-logo.png";

const LoginPage = ({ onLogin, setIsLogged }) => {
  return (
    <section className="page">
      <h1 id="login-title">Weather App</h1>
      <br />
      <div className="login-container">
        <img className="applogo" src={logo} alt="app-logo" />
        <br />
        <LoginFormComponent onLogin={onLogin} setIsLoggedIn={setIsLogged} />
      </div>
    </section>
  );
};

export default LoginPage;
