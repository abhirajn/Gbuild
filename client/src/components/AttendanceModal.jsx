import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl, InputLabel, MenuItem, Select , Button, TextField} from '@mui/material';
import axios from 'axios';

export default function AttendanceModal() {
  const[sDate , setSDate] = useState()
  const[sem , setSem] = useState()
  const[sub , setSub] = useState([])
  const[data , setData] = useState({})

const handlechange =async(e) => {

  const obj = {
    "date" : sDate,
    "sem" : sem
  }
  console.log(obj)
  let arr = [];
  const res =  await axios.post('https://gbuild.onrender.com/user/getdaysub',{
    obj
  })
  Object.keys(res.data.sub).map((d, i)=>{
    arr.push(res.data.sub[i])
  })
  setSub(arr);
}

const handlesubmit = async() =>{
 
 const res = await axios.post('https://gbuild.onrender.com/user/attendance', {
  data
 })
  console.log(data)
}

const handleChange= (e)=>{
  // console.log(e.target)
  setData(prevData => ({
      ...prevData,
      "date": sDate,
      "sem" : sem,
      [e.target.name]: e.target.value
    }));
    console.log(data)
}

  return (
    <div>

        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Enter date" onChange={(e)=>{
            const s = `${e.$y}-${Number(e.$M+1)}-${e.$D}`
            setSDate(s);
        }} />
      </DemoContainer>
    </LocalizationProvider>
        </div>
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
      <Button onClick={handlechange}>submit</Button>
      {sub.map((d)=>{
        console.log(d)
        return(<div style={{display:'flex' , flexDirection : 'row' , margin:'3px'}} key={d}>
        <div style={{width : '50%'}}>
        <TextField id="outlined"  variant="outlined"  InputProps={{
        readOnly: true,
      }} value={d}  />
        </div>
        <div>
<TextField id="outlined" label="Attendance" variant="outlined"  onChange={handleChange} name={d} value={data.d}  />

        </div>

    </div>)
      })}
      <Button onClick={handlesubmit}>submit Attendance</Button>
        </div>
    </div>
  )
}
