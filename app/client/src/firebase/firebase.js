import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
require('firebase/firestore')

const config = {
  apiKey: 'AIzaSyAu7lb88gvOWSej6Zd8Wym1gug4LTuDQD8',
  authDomain: 'rotohive-development.firebaseapp.com',
  databaseURL: 'https://rotohive-development.firebaseio.com',
  projectId: 'rotohive-development',
  storageBucket: 'rotohive-development.appspot.com',
  messagingSenderId: '981200810360'
}
// const config = {
//   apiKey: 'AIzaSyAjvEHcbmUbChjSqet92QiTHVMzRREgl3s',
//   authDomain: 'rotohive.firebaseapp.com',
//   databaseURL: 'https://rotohive.firebaseio.com',
//   projectId: 'rotohive',
//   storageBucket: 'rotohive.appspot.com',
//   messagingSenderId: '193098595651'
// }

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

export {
  auth,
  firestore,
  firebase
}