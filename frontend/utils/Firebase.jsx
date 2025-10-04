// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "magin-pin.firebaseapp.com",
  projectId: "magin-pin",
  storageBucket: "magin-pin.firebasestorage.app",
  messagingSenderId: "558977468985",
  appId: "1:558977468985:web:aa74478abfe7c0bbaf5be8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}

