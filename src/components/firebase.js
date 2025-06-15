// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBDQqFKHNnByaZy63n33XZDx_TJdi68Yr0",
  authDomain: "bookit--now.firebaseapp.com",
  projectId: "bookit--now",
  storageBucket: "bookit--now.appspot.com", // ✅ fixed: should be .appspot.com not .firebasestorage.app
  messagingSenderId: "11639238739",
  appId: "1:11639238739:web:83b7a7b7989ff6675016a6",
  measurementId: "G-9M18N4L7L1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ✅ use this in your Login/Signup
export const db = getFirestore(app);