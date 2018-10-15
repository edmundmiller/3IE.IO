import React, {Component} from 'react'
import {firebase} from '../firebase'
class SignUp extends Component {

  render() {
    return(
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/updateUsername',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => {}
  }
}

export default SignUp