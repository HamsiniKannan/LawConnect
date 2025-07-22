// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your Firebase config here
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe5MhAxgQPnj4fXbJNyF5JwqOJlwW-e9I",
  authDomain: "lawconnect-f15d7.firebaseapp.com",
  projectId: "lawconnect-f15d7",
  storageBucket: "lawconnect-f15d7.firebasestorage.app",
  messagingSenderId: "1003108868188",
  appId: "1:1003108868188:web:ccbad6fd3a2bdbf7664699",
  measurementId: "G-G3C98W5QEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
