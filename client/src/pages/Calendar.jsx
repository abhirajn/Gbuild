import React, { useState } from 'react'
// import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

export default function Calendar() {
    const[sDate , setSDate] = useState()
    const[eDate , setEDate] = useState()
    const[osDate , setOsDate] = useState()
    const[oeDate , setOeDate] = useState()
    const[tsDate , setTsDate] = useState()
    const[teDate , setTeDate] = useState()
    const[thsDate , setThsDate] = useState()
    const[theDate , setTheDate] = useState()
    const[sem , setSem] = useState()

    const handlesubmit = async() => {
        const obj = {}
        if(sDate){
            obj["sDate"] = sDate
        }
        if(eDate){
            obj["eDate"] = eDate
        }
        if(osDate){
            obj["i1start"] = osDate
        }
        if(oeDate){
            obj["i1end"] = oeDate
        }
        if(tsDate){
            obj["i2start"] = tsDate
        }
        if(teDate){
            obj["i2end"] = teDate
        }
        if(thsDate){
            obj["i3start"] = thsDate
        }
        if(theDate){
            obj["i3end"] = theDate
        }
        if(sem){
            obj["sem"] = sem
        }
        console.log(obj)

        const resp = await axios.post('http://localhost:3000/user/calendarofevents',{
            obj
        })

    }
  return (
    <div style={{marginLeft: '25%' , marginRight: '25%'}}>
 <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}  >
      <DemoContainer components={['DatePicker']} >
        <DatePicker label="Start Date" onChange={(e)=>{
            const s = `${e.$y}-${Number(e.$M+1)}-${e.$D}`
            setSDate(s);
        }} />
      </DemoContainer>
    </LocalizationProvider>
        </div>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="End Date" onChange={(e)=>{
            const s = `${e.$y}-${Number(e.$M+1)}-${e.$D}`
            setEDate(s);
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
          onChange={(e)=>{
            setSem(e.target.value)
          }}
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
        <div>
           <Typography>Internals 1</Typography>
        <div style={{display:'flex' }}>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Start Date" name='1start' onChange={(e)=>{
            const s = `${e.$y}-${Number(e.$M+1)}-${e.$D}`
            setOsDate(s);
        }} />
      </DemoContainer>
    </LocalizationProvider>
        </div>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="End Date" name='1end'  onChange={(e)=>{
            const s = `${e.$y}-${Number(e.$M+1)}-${e.$D}`
            setOeDate(s);
        }}/>
      </DemoContainer>
    </LocalizationProvider>
        </div>
        </div>
        </div>

        <div>
           <Typography>Internals 2</Typography>
        <div style={{display:'flex' }}>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Start Date" name='2start' onChange={(e)=>{
            const s = `${e.$y}-${Number(e.$M+1)}-${e.$D}`
            setTsDate(s);
        }} />
      </DemoContainer>
    </LocalizationProvider>
        </div>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="End Date" name='2end' onChange={(e)=>{
            const s = `${e.$y}-${Number(e.$M+1)}-${e.$D}`
            setTeDate(s);
        }} />
      </DemoContainer>
    </LocalizationProvider>
        </div>
        </div>
        </div>

        <div>
           <Typography>Internals 3</Typography>
        <div style={{display:'flex' }}>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Start Date" name='3start' onChange={(e)=>{
            const s = `${e.$y}-${Number(e.$M+1)}-${e.$D}`
            setThsDate(s);
        }}/>
      </DemoContainer>
    </LocalizationProvider>
        </div>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="End Date" name='3end' onChange={(e)=>{
            const s = `${e.$y}-${Number(e.$M+1)}-${e.$D}`
            setTheDate(s);
        }}/>
      </DemoContainer>
    </LocalizationProvider>
        </div>
        </div>
        </div>
        <div>
        <Button variant="outlined" sx={{width : '50%'}} onClick={handlesubmit}
    > Submit </Button>
        </div>
    </div>
  )
}
