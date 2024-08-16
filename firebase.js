// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "inventory-management-3c8ea.firebaseapp.com",
  projectId: "inventory-management-3c8ea",
  storageBucket: "inventory-management-3c8ea.appspot.com",
  messagingSenderId: "498682706450",
  appId: "1:498682706450:web:c430913563ed77ce3d36cb",
  measurementId: "G-Y3F9R01CD2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore =getFirestore(app)

export {firestore}