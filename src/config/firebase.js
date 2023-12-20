import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcsCB1PsgriqWTSggEmIer9_YGTllM8_U",
  authDomain: "mid-project-57117.firebaseapp.com",
  projectId: "mid-project-57117",
  storageBucket: "mid-project-57117.appspot.com",
  messagingSenderId: "652530403153",
  appId: "1:652530403153:web:e00e4c92d2804f07073570",
  measurementId: "G-BMD8F7463M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
