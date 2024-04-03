import { useScrollTrigger } from '@mui/material';
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
const[total ,setTotal]  =useState([]);
const[present ,setPresent]  =useState([]);
  useEffect(()=>{
    const fun = async()=>{
      var arr = [];
        const resp = await axios.get('http://localhost:3000/user/totalclasses');
        // Object.keys(resp.data).map((d)=>{
          // arr/.push({key : });
        // })
        setTotal(resp.data)
        // console.log(total)
    }
    
    // fun();
},[])

useEffect(()=>{
  const fun = async()=>{
    // var arr = [];
      const resp = await axios.get('http://localhost:3000/user/attendance');
      // Object.keys(resp.data).map((d)=>{
        // arr.push(d);
      // })
      setPresent(resp.data);
  }
  // fun();
},[])

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
 zIndex:1,
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

      <div style={{display : 'flex' , flexDirection : 'row'}}>
{Object.keys(total).map((d , i)=>{
  
  if(present[d]){
    // console.log(present[d])
    return(<Chart present={Number(present[d])} total={Number(total[d])} name={d} key={d} />)
  }
  return(<Chart present={0} total={Number(total[d])} name={d} key={d} />)
})}

      </div>
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
    </div>
  )
}
