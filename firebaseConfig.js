// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTtwaq5xITfyRPsEd2unmDj1FkkAHn_ng",
  authDomain: "stockbuddy-58bf0.firebaseapp.com",
  projectId: "stockbuddy-58bf0",
  storageBucket: "stockbuddy-58bf0.appspot.com",
  messagingSenderId: "533924366065",
  appId: "1:533924366065:web:e8a22c243bbc1918930b50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};