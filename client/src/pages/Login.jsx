import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

export default function Login() {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    // const [name , setName] = useState('');

    const handleclick = async() => {
        const res = await axios.post('http://localhost:3000/api/login', {
        "email" : email,
        "password" : password
        })
        console.log(res)
    }

  return (
    <div style={{marginLeft: '25%' , marginRight: '25%'}}>

{/* <TextField id="outlined-basic" label="Display Name" variant="outlined"  name="name" value={name} onChange={(e)=>setName(e.target.value)} fullWidth  sx={{margin : 1}}/> */}
<TextField id="outlined-basic" label="Email" variant="outlined"  name="email" value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth  sx={{margin : 1}}/>
<TextField
fullWidth
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          sx={{margin : 1}}
        />
         <Button
         
          variant='contained'
          color='success'
                key="login"
                onClick={handleclick}
                sx={{ mx: 2,my:1, color: 'white', display: 'block' }}
              >
                Login
              </Button>


    </div>
  )
}
