import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDdXFt17wGl_RT2L25SxHFvPxnwTSjHFas",
  authDomain: "automagic-list.firebaseapp.com",
  databaseURL: "https://automagic-list.firebaseio.com",
  projectId: "automagic-list",
  storageBucket: "automagic-list.appspot.com",
  messagingSenderId: "350268015388"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseApp
//module.exports.constants = firebaseApp;