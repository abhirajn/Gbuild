import React from 'react'
// import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

export default function Calendar() {
  return (
    <div style={{marginLeft: '25%' , marginRight: '25%'}}>
 <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Start Date" />
      </DemoContainer>
    </LocalizationProvider>
        </div>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="End Date" />
      </DemoContainer>
    </LocalizationProvider>
        </div>
        <div>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sem</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={""}
          label="Sem"
          name='sem'
        //   onChange={handleChange}
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
        <DatePicker label="Start Date" name='1start' />
      </DemoContainer>
    </LocalizationProvider>
        </div>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="End Date" name='1end'/>
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
        <DatePicker label="Start Date" name='2start' />
      </DemoContainer>
    </LocalizationProvider>
        </div>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="End Date" name='2end' />
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
        <DatePicker label="Start Date" name='2start' />
      </DemoContainer>
    </LocalizationProvider>
        </div>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="End Date" name='2end' />
      </DemoContainer>
    </LocalizationProvider>
        </div>
        </div>
        </div>
        <div>
        <Button variant="outlined" sx={{width : '50%'}} 
    > Submit </Button>
        </div>
    </div>
  )
}
