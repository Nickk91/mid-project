import React, { useEffect } from "react";
import "../stylesheets/navbar-styling.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
const NavbarComponent = ({ handleLogout, setIsLogged, isLogged }) => {
  const navigate = useNavigate();
  const { logout, setIsLoggedIn } = useAuth();
  // useEffect(() => {
  //   if (isLogged) {
  //     navigate("/");
  //   }
  // }, [isLogged]);
  function handleLogout1() {
    setIsLoggedIn(null);
    navigate("/");
  }
  return (
    <nav>
      <ul>
        <Link to="/home">
          <li>Home</li>
        </Link>
        {/* <Link to="/stats">
          <li>Stats</li>
        </Link> */}
        <Link to="/comments">
          <li>Comments</li>
        </Link>

        {/* <Link to="/"> */}
        <li onClick={handleLogout1}>Logout</li>
        {/* </Link> */}
      </ul>
    </nav>
  );
};

export default NavbarComponent;
