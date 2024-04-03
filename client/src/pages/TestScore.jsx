import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Fab, TableFooter, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import Modal from '@mui/material/Modal';
import TestModal from '../components/TestModal';
export default function TestScore() {

 const [cols , setCols] = useState([]);   
 const [result , setResult] = useState([]);  

useEffect(()=>{
    const fun = async()=>{
        const resp = await axios.get('http://localhost:3000/user/getallsub');
        // console.log(typeof resp.data[0])
        var arr= [];
        arr.push("name")
        Object.keys(resp.data).forEach(d => {
            arr.push(d);
    })
        setCols(arr)
        // console.log(/cols)
        // console.log(typeof cols)
    }
    fun();
},[])

useEffect(()=>{
    const fun = async()=>{
        const resp = await axios.get('http://localhost:3000/user/testresult');
        console.log(resp.data)
        // var arr= [];
        // arr.push("Name")
        setResult(resp.data)

        Object.keys(resp.data).forEach(d => {
            
    })
      
    }
    fun();
},[])

const StyledFab = styled(Fab)({
  position: 'absolute',
 zIndex:1,
  // top: "100%",
  bottom : 25,
  // left:1400,
  right: 25,
  margin: '0 auto',
});

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


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div style={{display:'flex' , flexDirection: "column"}}>
   <div>
   <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="beautiful table">
        <TableHead>
          <TableRow>
            {cols.map((d)=>{
                return(<TableCell align="center">{d}</TableCell>)
            })}
            <TableCell align="center">   </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {result.map((d,i)=>{
          // console.log(typeof d.obj)
            return(<TableRow key={d.id} >
                 {cols.map((dd)=>{
                  // console.log(dd)
                  return (<TableCell align='center'>{d.obj[dd]}</TableCell>)
                 })}
                              
            </TableRow>)
         })}
        </TableBody>
        <TableFooter>
      
        </TableFooter>
      </Table>
    </TableContainer>
   </div>
   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TestModal/>
        </Box>
      </Modal>
   <div style={{}} >
   <StyledFab  onClick={handleOpen} color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab>
   </div>

    </div>
  )
}
