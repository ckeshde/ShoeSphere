// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoPoHRoGvrWMvgE4GMuj5pHMmPo8RK27I",
  authDomain: "shoesphere-d37fd.firebaseapp.com",
  projectId: "shoesphere-d37fd",
  storageBucket: "shoesphere-d37fd.firebasestorage.app",
  messagingSenderId: "753223705668",
  appId: "1:753223705668:web:ca543976b26b172bc80811",
  measurementId: "G-69LDCC81ZK"
};


// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig): getApp();
// const analytics = getAnalytics(app);
export const auth = getAuth(app);