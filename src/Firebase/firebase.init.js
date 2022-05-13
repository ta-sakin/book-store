// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey:process.env.REACT_APP_apiKey,
  // authDomain:process.env.REACT_APP_authDomain,
  // projectId:process.env.REACT_APP_projectId,
  // storageBucket:process.env.REACT_APP_storageBucket,
  // messagingSenderId:process.env.REACT_APP_messagingSenderId,
  // appId:process.env.REACT_APP_appId,
  // measurementId:process.env.REACT_APP_measurementId,
  apiKey: "AIzaSyDCdr1i1UDbMMtLqn6aDzrrvJN-uGGSJCM",
  authDomain: "book-store-8d028.firebaseapp.com",
  projectId: "book-store-8d028",
  storageBucket: "book-store-8d028.appspot.com",
  messagingSenderId: "125078348780",
  appId: "1:125078348780:web:28915baa9911c4a5a616c9",
  measurementId: "G-B2WLDVF28P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
