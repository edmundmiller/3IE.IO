import { firestore } from './firebase'
import moment from 'moment'

export const checkIfUserExists = async username => {
  return firestore
    .collection('usernames')
    .doc(username)
    .get()
}

export const getUserInfoByUID = async uid => {
  return firestore
    .collection('users')
    .doc(uid)
    .get()
}

export const createNewUserInfo = (user, username) => {
  let userInformation = {
    uid: user.uid,
    username: username,
    userDisplayName: user.displayName,
    email: user.email,
    dateCreated: moment().format(),
  }
  firestore.collection('users').doc(user.uid).set(userInformation)
  firestore.collection('usernames').doc(username).set({exists: true})
  return userInformation
}

export const addUsername = (username) => {
  firestore.collection('usernames').doc(username).set({exists: true})
}

export const getTournaments = () => {
  return firestore.collection('tournaments').get()
}

export const getSubmissionsFromTournament = tournamentID => {
  return firestore
    .collection('tournamentSubmissions')
    .where('tournamentID', '==', tournamentID)
    .get()
}

export const createTournamentSubmission = (submission, callback) => {
  firestore
    .collection('tournamentSubmissions')
    .doc(submission.tournamentID + submission.userID)
    .set(submission)
    .then(() => {
      getSubmissionsFromTournament(submission.tournamentID)
      callback(submission)
    })
}

export default firestore
