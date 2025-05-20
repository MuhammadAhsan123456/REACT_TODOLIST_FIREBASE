// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1uKSdD7ftnjUK82ixfzLcRYVBLsE4b_Q",
  authDomain: "react-redux-todolist-9cb85.firebaseapp.com",
  projectId: "react-redux-todolist-9cb85",
  storageBucket: "react-redux-todolist-9cb85.firebasestorage.app",
  messagingSenderId: "119152638107",
  appId: "1:119152638107:web:38afab3c0e329da4e2ae3e",
  measurementId: "G-WY44ZMDSZW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
