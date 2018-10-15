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

export const createNewUserInfo = (user, username, ethAddress, emailChecked) => {
  let userInformation = {
    uid: user.uid,
    username: username,
    userDisplayName: user.displayName,
    email: user.email,
    dateCreated: moment().format(),
    ethBalance: 0,
    rotoBalance: 0,
    rank: 0,
    performancePercentage: '0%',
    ethereumAddress: ethAddress,
    allowsMarketingEmails: emailChecked
  }
  firestore.collection('users').doc(user.uid).set(userInformation)
  firestore.collection('usernames').doc(username).set({exists: true})
  firestore.collection('ethAddresses').doc(ethAddress).set({exists: true})
  return userInformation
}

export const addUsername = (username) => {
  firestore.collection('usernames').doc(username).set({exists: true})
}

export const addEthAddress = (address) => {
  firestore.collection('ethAddresses').doc(address).set({exists: true})
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

export const getPlayers = sport => {
  return firestore
    .collection('sports')
    .doc(sport)
    .collection('active-players')
    .get()
}

export const getTeams = sport => {
  return firestore
    .collection('sports')
    .doc(sport)
    .collection('active-teams')
    .get()
}

export const getTournamentsJoined = userID => {
  return firestore
    .collection('tournamentSubmissions')
    .where('userID', '==', userID)
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

export const updateUsernameAndEthAddress = (user, username, ethAddress) => {
  let data = {}
  if (username) { data['username'] = username }
  if (ethAddress) { data['ethereumAddress'] = ethAddress }
  return firestore.collection('users').doc(user.uid).update(data)
}

export const checkIfEthAddressHasBeenUsed = (address) =>
  firestore.collection('ethAddresses').get()

export default firestore
