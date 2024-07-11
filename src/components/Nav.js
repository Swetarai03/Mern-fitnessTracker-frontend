import React from "react";
import { Link } from "react-router-dom";
import './Nav.css';

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
      <Link to="/" className="navbar-brand">
        TRACKFIT
      </Link>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/create-user" className="nav-link">
              USER
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user-list" className="nav-link">
              DASHBOARD
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
