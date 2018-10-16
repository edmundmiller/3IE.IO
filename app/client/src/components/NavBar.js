import React, {Component} from 'react';
import logo from '../resources/3ie.io.svg';

import "../css/Navbar.css";
// Firebase Authentification

// React Routing
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="navBar">
        <ul clasName="nav-bar">
          <li>
            <Link className="nav-item" to="/">
              <img className="logo" src={logo} alt="logo" />
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/projects">
              Projects
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="membership">
              Membership
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="news">
              Content & News
            </Link>
          </li>
          <div className="auth-base">
            <li>
              <Link className="nav-item" to="signup">
                Signup
              </Link>
            </li>
            <li>
              <Link className="nav-item" to="login">
                Login
              </Link>
            </li>
          </div>
        </ul>
      </div>
    );
  }
}

export default NavBar;
