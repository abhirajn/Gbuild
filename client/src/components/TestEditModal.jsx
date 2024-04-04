import { Button, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

export default function TestEditModal({editdata}) {
    // console.log(typeof editdata.obj)
    const[data , setData] = useState(editdata.obj)
    const handleChange= (e)=>{
        // console.log(e.target)
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
          }));
          console.log(data)
      }

      const handleditsubmit =async()=>{
        const resp = await axios.post(`https://gbuild.onrender.com/user/updatete/${editdata.id}`,{
            data
        })
        console.log(resp)
      }
  return (
    <div>
      {Object.keys(editdata.obj).map((d)=>{
        // console.log(d)
       if(d.includes("stud")){

       }else{
        return(  <div style={{display:'flex' , flexDirection : 'row' , margin:'3px'}} key={d}>
        <div style={{width : '50%'}}>
        <TextField id="outlined"  variant="outlined"  InputProps={{
        readOnly: true,
      }} value={d}  />
        </div>
        <div>
<TextField id="outlined" label="Marks" variant="outlined"  onChange={handleChange}  name={d} value={data[d]}  />

        </div>
    </div>)
       }
      })}
      <Button onClick={()=>{handleditsubmit()}} >Submit</Button>
    </div>
  )
}
