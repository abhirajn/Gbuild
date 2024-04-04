import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl, InputLabel, MenuItem, Select , Button, TextField} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ExpenseModel({click ,setClick}) {
    const[sDate , setSDate] = useState()
    const[from , setFrom] = useState()
    const[to , setTo] = useState()
    const[money , setMoney] = useState()
    const[type , setType] = useState()
const navigate = useNavigate();
    const handlesubmit = async() => {
        const obj = {
            "date" : sDate,
            "from" : from,
            "to"  : to,
            "money" : money,
            "type" : type
        }
        const res = await axios.post('http://localhost:3000/user/expense', {obj});
        console.log(res)
        setClick(!click)
        navigate('/expense')
    }
  return (
    <div style={{}}>
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
        <div style={{display:'flex' , flexDirection : 'row' , margin:'3px'}} key={"from"}>
        <div style={{width : '50%'}}>
        <TextField id="outlined"  variant="outlined"  InputProps={{
        readOnly: true,
      }} value={"From"}  />
        </div>
        <div>
<TextField id="outlined" label="Attendance" variant="outlined"  onChange={(e)=>{setFrom(e.target.value)}} name={"from"} value={from}  />

        </div>

    </div>
    <div style={{display:'flex' , flexDirection : 'row' , margin:'3px'}} key={"to"}>
        <div style={{width : '50%'}}>
        <TextField id="outlined"  variant="outlined"  InputProps={{
        readOnly: true,
      }} value={"to"}  />
        </div>
        <div>
<TextField id="outlined" label="Attendance" variant="outlined"  onChange={(e)=>{setTo(e.target.value)}} name={"from"} value={to}  />

        </div>

    </div>
    <div style={{display:'flex' , flexDirection : 'row' , margin:'3px'}} key={"money"}>
        <div style={{width : '50%'}}>
        <TextField id="outlined"  variant="outlined"  InputProps={{
        readOnly: true,
      }} value={"money"}  />
        </div>
        <div>
<TextField id="outlined" label="Attendance" variant="outlined"  onChange={(e)=>{setMoney(e.target.value)}} name={"from"} value={money} />

        </div>

    </div>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sem</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Sem"
          name='sem'
          onChange={(e)=>{setType(e.target.value)}}
        >
          <MenuItem value={"Credit"}>Credit</MenuItem>
          <MenuItem value={"Debit"}>Debit</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={handlesubmit}>submit</Button>

    </div>
  )
}
