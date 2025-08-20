// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRj6g-xH8qUGN6pB2y91fu0O3tyqiQKBM",
  authDomain: "senterej3.firebaseapp.com",
  databaseURL: "https://senterej3-default-rtdb.firebaseio.com",
  projectId: "senterej3",
  storageBucket: "senterej3.firebasestorage.app",
  messagingSenderId: "20212591906",
  appId: "1:20212591906:web:0bfba8338e2e9873efc97b",
  measurementId: "G-LX8JJPQHCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
const analytics = getAnalytics(app);