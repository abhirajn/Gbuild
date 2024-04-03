import React, { useEffect } from 'react'
import axios from 'axios'
import { getMessaging, getToken } from "firebase/messaging";
import {messaging} from '../firebase'
import Navbar from '../components/Navbar';
import { Typography } from '@mui/material';

export default function Home() {
  useEffect(()=>{
    async function requestfun(){
      const permission = await Notification.requestPermission();
      if( permission === "granted"){
        getToken(messaging, { vapidKey: 'BPX44gc0vwFfIMTU2vKmAcM9Lf7AqQd2HZD50cy96SjBsnYuyjRsahnTmWm8lDC4xzLLEZQq10fShlzBtXHXZPc' }).then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log(currentToken)
            //  axios.post('http://localhost:3000/user/granted', {
            //   "token" : currentToken,
            //  })
          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // ...
        });
      }
    }
    requestfun()
  },[])


  

  return (
    <div>
      <Typography>Welcome to Student Management</Typography>




    </div>
  )
}
