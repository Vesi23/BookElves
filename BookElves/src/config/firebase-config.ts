// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApMbH5jQ8yG6tyDASY33DHlOGnXYLZAMc",
  authDomain: "bookelves-23.firebaseapp.com",
  projectId: "bookelves-23",
  storageBucket: "bookelves-23.appspot.com",
  messagingSenderId: "319260511869",
  appId: "1:319260511869:web:d5f7ba4f7f7fa0cd50ab14",
  measurementId: "G-W4V2QE7EPJ",

  //add
  databaseURL: "https://bookelves-23-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getDatabase(app);
