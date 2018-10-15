import React, {Component} from 'react'
import logo from '../resources/logo.svg'

import '../css/Navbar.css'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { firebase, auth } from '../firebase'
import { withRouter } from 'react-router'
var Recaptcha = require('react-recaptcha')

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <h1>Hello</h1>
    )
  }
}

export default withRouter(NavBar)