// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: String(process.env.REACT_APP_APIKEY),
  authDomain:String(process.env.REACT_APP_AUTHDOMAIN),
  projectId: String(process.env.REACT_APP_PROJECTID),
  storageBucket:String(process.env.REACT_APP_STORAGEBUCKET),
  messagingSenderId: String(process.env.REACT_APP_MESSAGESENDERID),
  appId:String( process.env.REACT_APP_APPID),
  measurementId:String(process.env.REACT_APP_MEASUREMENTID),
};



//console.log("here to");
//console.log(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const database = getFirestore(app);
