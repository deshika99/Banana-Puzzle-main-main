import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMcBU6har9up6wtWLxbzgVK8f9y-AXpZ0",
  authDomain: "banana-puzzle.firebaseapp.com",
  projectId: "banana-puzzle",
  storageBucket: "banana-puzzle.firebasestorage.app",
  messagingSenderId: "1086688961126",
  appId: "1:1086688961126:web:fe243f184e607b1fe403a7",
  measurementId: "G-DX103NMW75",
};

// Initialize Firebase app
const app = firebase.initializeApp(firebaseConfig);

// Export Firebase services
export const auth = app.auth();
export const firestore = app.firestore();

// Export the Firebase app itself
export default app;
