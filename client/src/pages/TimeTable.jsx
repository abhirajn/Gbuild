import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { l } from 'vite/dist/node/types.d-aGj9QkWt';

export default function TimeTable() {
const[sem , setSem] = useState();
    const [mon , setMon] = useState("");
    const [tue , setTue] = useState("");
    const [wed , setWed] = useState("");
    const [thu , setThu] = useState("");
    const [fri , setFri] = useState("");
    const [sat , setSat] = useState("");
    const navigate = useNavigate();

    const handleclick = async() => {
        const obj = {}
        obj["sem"] = sem
        if(mon.length>0){
            obj["monday"] = mon.split(",");
        }
        if(tue.length>0){
            obj["tuesday"] = tue.split(",");
        }
        if(wed.length>0){
            obj["wednesday"] = wed.split(",");
        }
        if(thu.length>0){
            obj["thursday"] = thu.split(",");
        }
        if(fri.length>0){
            obj["friday"] = fri.split(",");
        }
        if(sat.length>0){
            obj["saturday"] = sat.split(",");
        }
        console.log(obj)
        const rep = await axios.post('http://localhost:3000/user/addsubjects', {obj})
        console.log(rep)
        if(rep){
          navigate('/')
        }else{
          alert("error")
        }

    }
  return (
    <div style={{marginLeft: '25%' , marginRight: '25%'}}>
        <div>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sem</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sem}
          label="Sem"
          name='sem'
          onChange={(e)=>{setSem(e.target.value)}}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
        </Select>
      </FormControl>
        </div>
        <div style={{display : 'flex'}}>
            <div><TextField id="outlined"  variant="outlined" sx={{m : 1}}  InputProps={{
            readOnly: true,
          }} value={"Monday"}  /></div>
            <div><TextField id="outlined"  variant="outlined" sx={{m : 1}}  value={mon} onChange={(e)=>{setMon(e.target.value)}} label={'enter subjects comms separated'} /></div>
        </div>
        
        <div style={{display : 'flex'}}>
            <div ><TextField id="outlined"  variant="outlined" sx={{m : 1}} InputProps={{
            readOnly: true,
          }} value={"Tuesday"}  /></div>
            <div><TextField id="outlined"  variant="outlined" sx={{m : 1}}  value={tue} onChange={(e)=>{setTue(e.target.value)}} label={'enter subjects comms separated'} /></div>
        </div>
        <div style={{display : 'flex'}}>
            <div><TextField id="outlined"  variant="outlined" sx={{m : 1}}  InputProps={{
            readOnly: true,
          }} value={"Wednesday"}  /></div>
            <div><TextField id="outlined"  variant="outlined" sx={{m : 1}}  value={wed} onChange={(e)=>{setWed(e.target.value)}} label={'enter subjects comms separated'} /></div>
        </div>
        <div style={{display : 'flex'}}>
            <div><TextField id="outlined"  variant="outlined" sx={{m : 1}}  InputProps={{
            readOnly: true,
          }} value={"Thursday"}  /></div>
            <div><TextField id="outlined"  variant="outlined" sx={{m : 1}}  value={thu} onChange={(e)=>{setThu(e.target.value)}} label={'enter subjects comms separated'} /></div>
        </div>
        <div style={{display : 'flex'}}>
            <div><TextField id="outlined"  variant="outlined" sx={{m : 1}}  InputProps={{
            readOnly: true,
          }} value={"Friday"}  /></div>
            <div><TextField id="outlined"  variant="outlined" sx={{m : 1}}  value={fri} onChange={(e)=>{setFri(e.target.value)}} label={'enter subjects comms separated'} /></div>
        </div>
        <div style={{display : 'flex'}}>
            <div><TextField id="outlined"  variant="outlined" sx={{m : 1}}  InputProps={{
            readOnly: true,
          }} value={"Saturday"}  /></div>
            <div><TextField id="outlined"  variant="outlined" sx={{m : 1}}  value={sat} onChange={(e)=>{setSat(e.target.value)}} label={'enter subjects comms separated'} /></div>
        </div>
        <div>
        <Button
         
         variant='contained'
         color='success'
               key="login"
               onClick={handleclick}
               sx={{ mx: 2,my:1, color: 'white', display: 'block' }}
             >
               Submit
             </Button>
        </div>


    </div>
  )
}
