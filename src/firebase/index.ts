// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKW4bBG94x6oYwRhdE353PwgY4etrBJ8s",
  authDomain: "stock-tracking-v0.firebaseapp.com",
  projectId: "stock-tracking-v0",
  storageBucket: "stock-tracking-v0.appspot.com",
  messagingSenderId: "828729784044",
  appId: "1:828729784044:web:25bd148d2d51a3d86d57c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
