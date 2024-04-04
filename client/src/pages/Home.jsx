import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getMessaging, getToken } from "firebase/messaging";
import {messaging} from '../firebase'
import Navbar from '../components/Navbar';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, TextField, Typography, fabClasses } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import RemainderCard from '../components/RemainderCard';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const[sDate , setSDate] = useState()
  const [value, setValue] = useState();
  const [click, setClick] = useState(false);
  const [title , setTitle] = useState('');
  const [des , setDes] = useState('');
  const[data , setData] = useState([])
  const[id , setId] = useState("")

  const navigate = useNavigate();
  useEffect(()=>{
    async function requestfun(){
      const permission = await Notification.requestPermission();
      if( permission === "granted"){
        getToken(messaging, { vapidKey: 'BPX44gc0vwFfIMTU2vKmAcM9Lf7AqQd2HZD50cy96SjBsnYuyjRsahnTmWm8lDC4xzLLEZQq10fShlzBtXHXZPc' }).then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log(currentToken)
            //  axios.post('http://localhost:3000/user/granted', {
            //   "token" : currentToken,
            //  })
          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // ...
        });
      }
    }
    // requestfun()
  },[])



  const handlesubmit = async() =>{
    const date = new Date();
    const d = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const obj = {
      "date" : sDate,
      "title" : title,
      "description" : des,
      "done" : false
    }

    if(id.length> 0){
      const res = await axios.post(`http://localhost:3000/user/gettodo/${id}`,{obj}).then(()=>{
        setId("");
      }).then(()=>{
        setClick(!click)
      })

console.log(id)
    }else{
      const res = await axios.post('http://localhost:3000/user/addtodo',{obj}).then(()=>{
        setClick(!click)
      })
      console.log(res);
    }
   
  }

  useEffect(()=>{
    const fun = async() =>{
      let arr = [];
      const res = await axios.get('http://localhost:3000/user/gettodo').then((d)=>{
        Object.keys(d.data).map((dd)=>{
          arr.push(d.data[dd]);
        })
      }).then(()=>{
        setData(arr)
      })
      
    }
    fun();
  },[click])

  const handleedit = async(data) =>{
    const d = new Date(data.obj.date)
    console.log(d , typeof d)
    setTitle(data.obj.title)
    setDes(data.obj.description)
    setValue(dayjs(d))
    setSDate(data.obj.date)
        setId(data.id)
  //  const res = await axios.post(`http://localhost:3000/user/gettodo/${data.id}`,{});
  //  console.log(res) 
  }

  const handledone = async(data) =>{
    const obj = {
      "date" : data.obj.date,
      "title" : data.obj.description,
      "description" : des,
      "done" : true
    }

   
      const res = await axios.post(`http://localhost:3000/user/gettodo/${data.id}`,{obj}).then(()=>{
        setId("");
      }).then(()=>{
        setClick(!click)
      })
  //  const res = await axios.post(`http://localhost:3000/user/gettodo/${data.id}`,{});
  //  console.log(res) 
  }

  return (
    <div>
      <Typography>Welcome to Student Management</Typography>
      <Typography variant='h2' align='center' sx={{fontFamily:'sans-serif'}} >YOUR REMAINDERS</Typography>
      <div style={{marginLeft : '25%' , marginRight : '25%', marginTop : '30px', display:'flex'}}> 
<div style={{width:'100%'}}>
<TextField label="Enter todo" align='center' fullWidth color="secondary" onChange={(e)=>{setTitle(e.target.value)}} value={title} required />
<TextField label="Enter description" align='center' fullWidth color="secondary" onChange={(e)=>{setDes(e.target.value)}} value={des} sx={{mt:1}} required />
<LocalizationProvider dateAdapter={AdapterDayjs}   value={value}>
      <DemoContainer components={['DatePicker']}   value={value}>
        <DatePicker label="Enter due date" onChange={(e)=>{
            const s = `${e.$y}-${Number(e.$M+1)}-${e.$D}`
            setSDate(s);
            setValue(e)
        }} 
        
        value={value}
        />
      </DemoContainer>
    </LocalizationProvider>

</div>




      <Button  sx={{marginLeft:2}} size="small" color='success' variant='outlined'  onClick={handlesubmit}>ADD Remainder</Button>
      {/* <Button  sx={{marginLeft:2}} size="small" color='success' variant='outlined'  onClick={handleupdate}>Update Remainder</Button> */}
      
      </div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m:2}}>
    {data.map((d)=>{
      // console.log(d)
      return(<RemainderCard prop={d} handleedit={handleedit} handledone={handledone}/>)
     })}
    </Grid>


    </div>
  )
}
