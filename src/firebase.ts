// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQPXXtVdlCqGZzBzNl8I_hMMCjXoaB38k",
  authDomain: "senterej-e351c.firebaseapp.com",
  projectId: "senterej-e351c",
  storageBucket: "senterej-e351c.firebasestorage.app",
  messagingSenderId: "248874306261",
  appId: "1:248874306261:web:bce3add297c5f90d7ef05c",
  measurementId: "G-EHG3BVH74D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);