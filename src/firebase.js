// src/firebase.js — Firebase init + Auth + Firestore exports

import { initializeApp }              from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore }               from "firebase/firestore";

const firebaseConfig = {
  apiKey:            "AIzaSyBIGW7X-Tka09tS-KfzavURdWy0i2tIQq8",
  authDomain:        "relieffit-911.firebaseapp.com",
  projectId:         "relieffit-911",
  storageBucket:     "relieffit-911.firebasestorage.app",
  messagingSenderId: "612583554379",
  appId:             "1:612583554379:web:d013f6c723b487ed5abcce",
};

const app      = initializeApp(firebaseConfig);
export const auth     = getAuth(app);
export const db       = getFirestore(app);
export const provider = new GoogleAuthProvider();
