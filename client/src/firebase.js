
import { initializeApp }   from "firebase/app";
import {getFirestore}  from 'firebase/firestore'
import { getMessaging, isSupported } from "firebase/messaging"
// const mess = require('@firebase/messaging')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwcr84e3YoSa8cede3N7ynuL_7y93BYU8",
  authDomain: "gbuild-283ce.firebaseapp.com",
  projectId: "gbuild-283ce",
  storageBucket: "gbuild-283ce.appspot.com",
  messagingSenderId: "656811490813",
  appId: "1:656811490813:web:a676f35c30eabb97ab2d94"
};

// Initialize Firebase
 export  const db = initializeApp(firebaseConfig);
  export const firedb = getFirestore(db);
  export const messaging = getMessaging(db);
    
 

//    module.exports = {db , firedb , messaging };

   