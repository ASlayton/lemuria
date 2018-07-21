import firebase from 'firebase';

const registerUser = (user) => {
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
};

const loginUser = (user) => {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
};

const logoutUser = () => {
  return firebase.auth().signOut();
};

const getUid = () => {
  return firebase.auth().currentUser.uid;
};

let myCharacterId = '';

const setCharacterId = (id) => {
  myCharacterId = id;
  console.error('Character Id set to:', id);
};
const getCharacterId = () => {
  return (myCharacterId);
};

export default {getUid, loginUser, logoutUser, registerUser, setCharacterId, getCharacterId};
