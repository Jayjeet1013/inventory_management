// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "inventory-e731a.firebaseapp.com",
  projectId: "inventory-e731a",
  storageBucket: "inventory-e731a.appspot.com",
  messagingSenderId: "948189011432",
  appId: "1:948189011432:web:9cb5eccb2844d04e30d85d",
  measurementId: "G-MRSZH2SPNR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore =getFirestore(app)

export {firestore}