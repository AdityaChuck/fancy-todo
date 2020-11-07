
import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA_RuifKKnA8PWzx3Srx7itnMpQHxatrHw",
    authDomain: "fancy-todo-7dd1d.firebaseapp.com",
    databaseURL: "https://fancy-todo-7dd1d.firebaseio.com",
    projectId: "fancy-todo-7dd1d",
    storageBucket: "fancy-todo-7dd1d.appspot.com",
    messagingSenderId: "849490580081",
    appId: "1:849490580081:web:24540361de6d1fa70d81d0",
    measurementId: "G-00Q9WEY81C"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()


  export default db