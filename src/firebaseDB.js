// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ3FeOFkqVR35Tzccv2CKiu3k5BwvCRNg",
  authDomain: "aulavue-project.firebaseapp.com",
  projectId: "aulavue-project",
  storageBucket: "aulavue-project.appspot.com",
  messagingSenderId: "553552783220",
  appId: "1:553552783220:web:2310cad779b0c9259f2e21"
};
// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export default db