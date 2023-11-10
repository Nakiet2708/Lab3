import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYo4dyJcRMFzfOLg0uoDw3eZe326WnxnA",
  authDomain: "test-3bfff.firebaseapp.com",
  projectId: "test-3bfff",
  storageBucket: "test-3bfff.appspot.com",
  messagingSenderId: "527425677290",
  appId: "1:527425677290:web:9855790bdde9e013503493",
  measurementId: "G-VXG1XVZT10"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };