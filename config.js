import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyAB2s1WUbRcgf8zZdjBP-mm5S_FCNmQ0Gg",
  authDomain: "booksantalatest.firebaseapp.com",
  projectId: "booksantalatest",
  storageBucket: "booksantalatest.appspot.com",
  messagingSenderId: "430088622447",
  appId: "1:430088622447:web:819064314323dbd7f3189a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase.firestore();