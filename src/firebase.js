import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA00Jdk6HwEZJ-9PyVGek09tkbFTipJA2U",
  authDomain: "chat-42a6a.firebaseapp.com",
  projectId: "chat-42a6a",
  storageBucket: "chat-42a6a.appspot.com",
  messagingSenderId: "123599518193",
  appId: "1:123599518193:web:7fa03e0ded4c6bd623ec50",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
