import { FormControl, Grid, InputLabel, MenuItem, Select, useScrollTrigger } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import PieChart from '../components/PieChart';
import Chart from '../components/PieChart';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import Modal from '@mui/material/Modal';
import TestModal from '../components/TestModal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Fab, TableFooter, Box, Typography } from '@mui/material';
import AttendanceModal from '../components/AttendanceModal';

 
export default function Attendance() {
  var defsem = null;
  const [sem, setSem] = React.useState();
  const local =  localStorage.getItem("sem");
  if(local){
    defsem  = local
  }
const[total ,setTotal]  =useState([]);
const[present ,setPresent]  =useState([]);
  useEffect(()=>{
    const fun = async()=>{
      var temp;
      if(sem){
temp = sem;
      }else{
        temp = defsem
      }
      var arr = [];
        const resp = await axios.post('https://gbuild.onrender.com/user/totalclasses',{
          sem : temp
        }).then((ans)=>{
          setTotal(ans.data)
          console.log(ans.data)
        })
        // console.log(resp.data)
        // Object.keys(resp.data).map((d)=>{
          // arr/.push({key : });
        // })
        // console.log(resp.data)
        // setTotal(resp.data)
       
    }
    
    fun();
},[sem])

useEffect(()=>{
  const fun = async()=>{
    var temp;
    if(sem){
temp = sem;
    }else{
      temp = defsem
    }
    // var arr = [];
      const resp = await axios.post('https://gbuild.onrender.com/user/attendancepresent',{
        sem : temp
      }).then((ans)=>{
        setPresent(ans.data);
      })
      // Object.keys(resp.data).map((d)=>{
        // arr.push(d);
      // })/
      // console.log(resp.data)
      
  }
  fun();
},[sem])

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledFab = styled(Fab)({
  position: 'absolute',
 zIndex:100,
  // top: "100%",
  bottom : 25,
  // left:1400,
  right: 25,
  margin: '0 auto',
});
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
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
          <MenuItem value={"1"}>1</MenuItem>
          <MenuItem value={'2'}>2</MenuItem>
          <MenuItem value={'3'}>3</MenuItem>
          <MenuItem value={'4'}>4</MenuItem>
          <MenuItem value={'5'}>5</MenuItem>
          <MenuItem value={'6'}>6</MenuItem>
          <MenuItem value={'7'}>7</MenuItem>
          <MenuItem value={'8'}>8</MenuItem>
        </Select>
      </FormControl>
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m:2}}>
{Object.keys(total).map((d , i)=>{
  
  if(present[d]){
    // console.log(present[d])
    return( <Chart present={Number(present[d])} total={Number(total[d])} name={d} key={d} />)
  }
  return(<Chart present={0} total={Number(total[d])} name={d} key={d} />)
})}

      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AttendanceModal/>
        </Box>
      </Modal>
   <div style={{}} >
   <StyledFab  onClick={handleOpen} color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab>
   </div>
   <div>
    
   </div>
   <Typography variant='h6' sx={{m : 4}} color={'error'}>Note : Fill Time table and Calendar of events to see subjects and attendance....</Typography>
   {(present.length == 0) || (total.length == 0) ? <><Typography color={'error'} variant='h4' sx={{m : 4}}>Fill Time table and Calendar of events to see subjects and attendance....</Typography></> : <></>}
    </div>
  )
}
