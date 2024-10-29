// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg1poLqc12UMYpjWNUi5idpiKtae1c1FI",
  authDomain: "chatapp-723aa.firebaseapp.com",
  projectId: "chatapp-723aa",
  storageBucket: "chatapp-723aa.appspot.com",
  messagingSenderId: "1066569731969",
  appId: "1:1066569731969:web:9b5577e87f9bb0f4e1a280"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);