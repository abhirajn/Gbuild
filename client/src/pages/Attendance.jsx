import { useScrollTrigger } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import PieChart from '../components/PieChart';
import Chart from '../components/PieChart';
 
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
    
    fun();
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
  fun();
},[])


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
    </div>
  )
}
