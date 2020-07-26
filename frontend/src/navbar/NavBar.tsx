import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import { useAuth, useAuthUpdate } from "../context/AuthContext";

export const NavBar = () => {
  const isLoggedIn = useAuth();
  const updateLogin = useAuthUpdate();

  const handleLogOutClick = (event: any) => {
    event.preventDefault();
    updateLogin && updateLogin(isLoggedIn);
  }

  const authorizedLinks = (
    <>
      <li>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li>
        <Link to="/add" className="nav-link">
          Add cards
        </Link>
      </li>
      <li>
        <Link to="/study" className="nav-link">
          Study
        </Link>
      </li>
      <li>
        <Link to="/" className="nav-link" onClick={handleLogOutClick}>
          Log Out
        </Link>
      </li>
    </>
  );

  const notAuthorizedLinks = (
    <>
      <li>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li>
        <Link to="/login" className="nav-link">
          Log In
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar navbar-dark bg-dark">
      <div className="container-md">
        <ul className="nav">
          {isLoggedIn ? authorizedLinks : notAuthorizedLinks}
        </ul>
      </div>
    </div>
  );
};
