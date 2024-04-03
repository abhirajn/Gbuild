import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { Button, FormControl, TextField } from '@mui/material';
import axios from 'axios';
// import { set } from 'mongoose';

export default function TestModal() {
    const [sub, setSub] = React.useState([]);
React.useEffect(()=>{
    const fun = async()=>{
        let arr = [];
        const resp = await axios.get('http://localhost:3000/user/getallsub');
        Object.keys(resp.data).map((d)=>{
            arr.push(d)
        })
        setSub(arr);
    }
    fun()
    
},[])

    const [data, setData] = React.useState({});
    const [num , setNum] = React.useState(0);
console.log(num)
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
      const resp = await axios.post('http://localhost:3000/user/testresult', {data});
      console.log(resp)
  }
  fun()
  }
  return (
    <div>
        <Box  >
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sem</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data.sem}
          label="Sem"
          name='sem'
          onChange={handleChange}
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
    <TextField id="outlined-basic" label="Test Name" variant="outlined" onChange={handleChange} name="name" value={data.name} fullWidth />
   
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
    onClick={handlesubmit} > Submit </Button>
  </Box>
  </div>
  )
}
