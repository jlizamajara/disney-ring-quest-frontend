import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LogoutButton from "../LogoutButton/LogoutButton";
import { AuthContext } from "../../auth/authContext";

function Navbar() {
  const { token } = useContext(AuthContext);
  const [isResponsive, setIsResponsive] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <ul className={isResponsive ? "navbar-items-dropdown" : "navbar-items-container"}
          onClick={() => setIsResponsive(false)}>
          <li className="navbar-item">
            <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link name" : "navbar-link"}>
              <FontAwesomeIcon icon={faHouse} size="lg" /> Home
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/about" className={({ isActive }) => isActive ? "navbar-link name" : "navbar-link"}>
              About Us
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/rules" className={({ isActive }) => isActive ? "navbar-link name" : "navbar-link"}>
              Rules
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="profile" className={({ isActive }) => isActive ? "navbar-link name" : "navbar-link"}>
              Profile
            </NavLink>
          </li>
        </ul>
        {!token ?  (
          <NavLink to="signup-login" className="navbar-login">
            <FontAwesomeIcon icon={faCircleUser} size="lg" /> Log in
          </NavLink>
        ) : (
          <LogoutButton />
        )}
        <button className="dropdown-navbar-icon"
          onClick={() => setIsResponsive(!isResponsive)}>
          {isResponsive ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
