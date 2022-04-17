// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';
 
// These imports load individual services into the firebase namespace.
require ('firebase/auth');
require ('firebase/database');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB3J4DuC98yFk_n85UfE5dCGYd6SVjxWiE",
    authDomain: "kktu-74acb.firebaseapp.com",
    databaseURL: "https://kktu-74acb.firebaseio.com",
    projectId: "kktu-74acb",
    storageBucket: "kktu-74acb.appspot.com",
    messagingSenderId: "242339926358",
    appId: "1:242339926358:web:dc8968488ccefbcc6786f7"
  };
  // Initialize Firebase
  let firebaseApp  = firebase.initializeApp(firebaseConfig);
  let firebaseAuth = firebaseApp.auth()
  let firebaseDb = firebaseApp.database()

  export { firebaseAuth, firebaseDb }
  