// Import the functions you need from the SDKs you need
const { initializeApp } =  require("firebase/app");
const {getFirestore} = require('firebase/firestore')
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
   const db = initializeApp(firebaseConfig);
   const firedb = getFirestore(db);

   module.exports = {db , firedb};

   