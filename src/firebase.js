import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAZ-8APEjMLI3w1wjvtPtfaIB5LOsIw1Vs",
    authDomain: "videohost-35c78.firebaseapp.com",
    projectId: "videohost-35c78",
    storageBucket: "videohost-35c78.appspot.com",
    messagingSenderId: "686690306362",
    appId: "1:686690306362:web:fa0fecb10f3ace9ea8a803",
    measurementId: "G-WWMP4FZK20"
  };


  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const storage = firebase.storage(); 
  const auth = getAuth(app);

  export { database, storage, auth };
