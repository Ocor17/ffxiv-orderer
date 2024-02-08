// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_APP_APIKEY),
  authDomain: String(import.meta.env.VITE_APP_AUTHDOMAIN),
  projectId: String(import.meta.env.VITE_APP_PROJECTID),
  storageBucket: String(import.meta.env.VITE_APP_STORAGEBUCKET),
  messagingSenderId: String(import.meta.env.VITE_APP_MESSAGESENDERID),
  appId: String(import.meta.env.VITE_APP_APPID),
  measurementId: String(import.meta.env.VITE_APP_MEASUREMENTID),
};

//console.log("here to");
//console.log(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
export { auth };
export const database = getFirestore(app);
