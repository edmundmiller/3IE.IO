import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
require('firebase/firestore')

const config = {
  apiKey: 'AIzaSyBjIKgsK8yPUGUtOwbcAAFHAClkiAZQ0zY',
  authDomain: 'hedera18-1be26.firebaseapp.com',
  databaseURL: 'https://hedera18-1be26.firebaseio.com',
  projectId: 'hedera18-1be26',
  storageBucket: 'hedera18-1be26.appspot.com',
  messagingSenderId: '3997116526',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

export { auth, firestore, firebase }
