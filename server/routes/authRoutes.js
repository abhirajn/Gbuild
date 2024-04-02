const express = require('express');
const { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile, signOut} = require("firebase/auth");
const router = express.Router();
const auth = getAuth();


router.post('/signup' , (req,res,next)=>{
    const{email , password , name} = req.body
   
    createUserWithEmailAndPassword(auth, email, password )
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(userCredential)
    res.send(user)
  }).then (()=>{
     updateProfile(auth.currentUser, { displayName: name }).catch(
        (err) => console.log(err)
      );
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    res.send(errorMessage)
  });

})

router.post('/login' , (req,res,next)=>{
    const{email , password} = req.body
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    res.send(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.send(errorMessage)
  });
})

router.get("/logout" , (req,res)=>{
    signOut(auth).then(() => {
        res.send("logout successfull")
      }).catch((error) => {
        res.send(error.message)
      });
})


module.exports = router