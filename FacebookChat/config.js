// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import 'firebase/compat/messaging';
import 'firebase/compat/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1Fx9qS9NFFsLaMTJIfpQRA8d8hYr9Uhk",
  authDomain: "facebookchat-f8fb6.firebaseapp.com",
  projectId: "facebookchat-f8fb6",
  storageBucket: "facebookchat-f8fb6.appspot.com",
  messagingSenderId: "29641992166",
  appId: "1:29641992166:web:0298e8a87992567caed827",
  measurementId: "G-PZN96VHZ9S",
  databaseURL: "https://facebookchat-f8fb6-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export {firebase};