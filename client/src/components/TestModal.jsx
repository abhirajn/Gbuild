import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import axios from 'axios';
// import { set } from 'mongoose';

export default function TestModal({modalsubmit , setModalsubmit}) {
    const [sub, setSub] = React.useState([]);
    const [Changesub, setChangesub] = React.useState(false);
    const [data, setData] = React.useState({});
    const [num , setNum] = React.useState(0);
   const[defsem , setDefsem] = React.useState();
   
  React.useEffect(()=>{
    const local =  localStorage.getItem("sem");
    if(local){
      setDefsem(local)
      console.log(local)
    }
    // console.log(data)
  },[])
    
React.useEffect(()=>{
    const fun = async()=>{
      var temp;
      if(data.sem){
temp = data.sem;
      }else{
        temp = defsem
      }
        let arr = [];
        const resp = await axios.post('https://gbuild.onrender.com/user/getallsub',{
          sem :temp 
        });
        Object.keys(resp.data).map((d)=>{
            arr.push(d)
        })
        setSub(arr);
    }
    fun()
    
},[Changesub])

 
// console.log(num)
  const handleChange= (e)=>{
    // console.log(e.target)
    setData(prevData => ({
        ...prevData,
        [e.target.name]: e.target.value
      }));
      console.log(data)
  }

  const handlesubmit = () => {
    const fun = async()=>{
      const resp = await axios.post('https://gbuild.onrender.com/user/testresult', {data});
      console.log(resp)
  }
  fun()
  setModalsubmit(!modalsubmit)
  }

  

// console.log(data.sem)
  return (
    <div>
        <Box  >
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sem</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={defsem}
          value={data.sem}
          label="Sem"
          name='sem'
          onChange={handleChange}
        >
          <MenuItem value={'1'}>1</MenuItem>
          <MenuItem value={'2'}>2</MenuItem>
          <MenuItem value={'3'}>3</MenuItem>
          <MenuItem value={'4'}>4</MenuItem>
          <MenuItem value={'5'}>5</MenuItem>
          <MenuItem value={'6'}>6</MenuItem>
          <MenuItem value={'7'}>7</MenuItem>
          <MenuItem value={'8'}>8</MenuItem>
        </Select>
      </FormControl>
    <TextField id="outlined-basic" label="Test Name" variant="outlined" onChange={handleChange} name="name" value={data.name} fullWidth />
    <Button variant="outlined" sx={{width : '50%'}} 
    onClick={()=>{
      setChangesub(!Changesub)
    }} > Click to populate sujects </Button>
    {sub.map((d)=>{
        console.log(d)
        return(<div style={{display:'flex' , flexDirection : 'row' , margin:'3px'}} key={d}>
            <div style={{width : '50%'}}>
            <TextField id="outlined"  variant="outlined"  InputProps={{
            readOnly: true,
          }} value={d}  />
            </div>
            <div>
    <TextField id="outlined" label="Marks" variant="outlined"  onChange={handleChange} name={d} value={data.d}  />

            </div>
        </div>)
    })}
     <Button variant="outlined" sx={{width : '50%'}} 
    onClick={handlesubmit} > final submit </Button>
  </Box>
  {sub.length == 0 ? <><Typography color={'error'} variant='h4' sx={{m : 4}}>Fill Time table and Calendar of events to see subjects and attendance....</Typography></>: <></>}
  </div>
  )
}
