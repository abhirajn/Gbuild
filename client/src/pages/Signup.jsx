import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [name , setName] = useState('');
    const [sem , setSem] = useState();
    const navigate = useNavigate();

const handleclick = async() => {
    const res = await axios.post('http://localhost:3000/api/signup', {
        "name" : name,
    "email" : email,
    "password" : password
    })
    console.log(res)
    localStorage.setItem("sem" , sem)
    navigate('/')
}

  return (
    <div style={{marginLeft: '25%' , marginRight: '25%'}}>

<TextField id="outlined-basic" label="Display Name" variant="outlined"  name="name" value={name} onChange={(e)=>setName(e.target.value)} fullWidth  sx={{margin : 1}}/>
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
           <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sem</InputLabel>
        <Select
         sx={{margin : 1}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // defaultValue={defsem}
          value={sem}
          label="Sem"
          name='sem'
          onChange={(e)=>{
            setSem(e.target.value)
          
          }}
        >
          <MenuItem value={'1'}>1</MenuItem>
          <MenuItem value={'2'}>2</MenuItem>
          <MenuItem value={'3'}>3</MenuItem>
          <MenuItem value={'4'}>4</MenuItem>
          <MenuItem value={'5'}>5</MenuItem>
          <MenuItem value={'6'}>6</MenuItem>
          <MenuItem value={'7'}>7</MenuItem>
          <MenuItem value={'8'}>8</MenuItem>
        </Select>
      </FormControl>
         <Button
         
          variant='contained'
          color='success'
                key="login"
                onClick={handleclick}
                sx={{ mx: 2,my:1, color: 'white', display: 'block' }}
              >
                Sign Up
              </Button>


    </div>
  )
}
