// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgogeQkEXrPqQZEGk04-pvOiEAKZdyyHE",
  authDomain: "stacks-c8fe3.firebaseapp.com",
  projectId: "stacks-c8fe3",
  storageBucket: "stacks-c8fe3.appspot.com",
  messagingSenderId: "171090061274",
  appId: "1:171090061274:web:600a408432f455820fc2e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);
export const db = getFirestore(app);
