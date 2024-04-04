import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Fab, TableFooter, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import Modal from '@mui/material/Modal';
import TestModal from '../components/TestModal';
import ExpenseModel from '../components/ExpenseModel';
import Transaction from '../components/Transaction';

export default function Expense() {
const [trans , setTrans] = useState([]);
const [total, setTotal] = useState(0);

useEffect(()=>{
  const fun = async() => {
    let arr = [];
    const res = await axios.get('http://localhost:3000/user/expense').then((dd)=>{
      (dd.data).map((d)=>{
        console.log(d)
        setTotal(total + Number(d.money))
        arr.push(d);
      })
    }).then(()=>{
      setTrans(arr);
    })
    
  }
  fun();
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
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ExpenseModel/>
        </Box>
      </Modal>
   <div style={{}} >
   <StyledFab  onClick={handleOpen} color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab>
   </div>

   <Typography>Total transaction = {total}</Typography>
   {trans.map((d)=>{
    return(<Transaction  from={d.from} to={d.to} money={d.money} check={d.type} />)
   })}


    </div>
  )
}