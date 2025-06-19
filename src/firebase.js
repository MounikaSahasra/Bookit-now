// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAd8uiIPRVIagmYFFdlv0SkIl6B0NMRhEQ",
  authDomain: "bookit-now-18330.firebaseapp.com",
  projectId: "bookit-now-18330",
  storageBucket: "bookit-now-18330.firebasestorage.app",
  messagingSenderId: "58166274510",
  appId: "1:58166274510:web:909053d412aeece527639f",
  measurementId: "G-SK1T6Y42TD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);