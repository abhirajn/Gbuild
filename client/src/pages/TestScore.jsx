import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Fab, TableFooter, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import Modal from '@mui/material/Modal';
import TestModal from '../components/TestModal';
import TestEditModal from '../components/TestEditModal';
export default function TestScore() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const [cols , setCols] = useState([]);   
 const [result , setResult] = useState([]);  
 const [modalsubmit , setModalsubmit] = useState(false);  
 var defsem = null;
 const local =  localStorage.getItem("sem");
 if(local){
   defsem  = local
 }
 const[sem , setSem] = useState();
useEffect(()=>{
    const fun = async()=>{
      var temp;
      if(sem){
temp = sem;
      }else{
        temp = defsem
      }
        const resp = await axios.post('https://gbuild.onrender.com/user/getallsub',{
          sem:temp
        });
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
    handleClose()
},[sem , modalsubmit])

useEffect(()=>{
    const fun = async()=>{
      var temp;
      if(sem){
temp = sem;
      }else{
        temp = defsem
      }
        const resp = await axios.post('https://gbuild.onrender.com/user/testresults',{
          sem:temp
        });
        console.log(resp.data)
        // var arr= [];
        // arr.push("Name")
        setResult(resp.data)

        Object.keys(resp.data).forEach(d => {
            
    })
      
    }
    fun();
    handleClose();
    
},[sem,modalsubmit])

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




  const [opene, setOpene] = React.useState(false);
  const handleOpene = () => setOpene(true);
  const handleClosee = () => setOpene(false);

  const[editdata , setEditdata] = useState({});
const handleeditclick = (d) =>{
  handleOpene();
  setEditdata(d)
}
  return (
    <div style={{display:'flex' , flexDirection: "column"}}>
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
          // console.log(d)
            return(<TableRow key={d.id} >
                 {cols.map((dd)=>{
                  // console.log(dd)
                  return (<TableCell align='center'>{d.obj[dd]}</TableCell>)
                 })}
                     <TableCell><Button onClick={()=>{handleeditclick(d)}} >Edit</Button></TableCell>         
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
          <TestModal modalsubmit={modalsubmit} setModalsubmit={setModalsubmit}/>
        </Box>
      </Modal>
      <Modal
  open={opene}
  onClose={handleClosee}
  aria-labelledby="modal-modal-titlew"
  aria-describedby="modal-modal-descriptiwon"
>
  <Box sx={style}>
    <TestEditModal editdata={editdata}/>
  </Box>
</Modal>
   <div style={{}} >
   <StyledFab  onClick={handleOpen} color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab>
   </div>
{cols.length == 0 || result.length == 0 ? <><Typography color={'error'} variant='h4' sx={{m : 4}}>Fill Time table and Calendar of events to see subjects and attendance....</Typography></>: <></>}
    </div>
  )
}
