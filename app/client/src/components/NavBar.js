import React, {Component} from 'react';
import logo from '../resources/logo.svg';

// Firebase Authentification
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebase, auth } from '../firebase';

// React Routing
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

var Recaptcha = require('react-recaptcha');

class NavBar extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="membership">Membership</Link>
        </li>
        <li>
          <Link to="news">Content & News</Link>
        </li>
        <li>
          <Link to="signup">Signup</Link>
        </li>
        <li>
          <Link to="login">Login</Link>
        </li>
      </ul>
      </div>
    );
  }
}

export default (NavBar);
