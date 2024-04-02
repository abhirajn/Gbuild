import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function TestScore() {

 const [cols , setCols] = useState([]);   
 const [result , setResult] = useState([]);  

useEffect(()=>{
    const fun = async()=>{
        const resp = await axios.get('http://localhost:3000/user/getallsub');
        // console.log(typeof resp.data[0])
        var arr= [];
        arr.push("Name")
        Object.keys(resp.data).forEach(d => {
            arr.push(d);
    })
        setCols(arr)
        // console.log(cols)
        // console.log(typeof cols)
    }
    fun();
},[])

useEffect(()=>{
    const fun = async()=>{
        const resp = await axios.get('http://localhost:3000/user/testresult');
        // console.log(typeof resp.data[0])
        // var arr= [];
        // arr.push("Name")
        setResult(resp.data)
        Object.keys(resp.data).forEach(d => {
            
    })
      
    }
    fun();
},[])

  return (
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
            return(<TableRow key={d.id} >
                 
                     <TableCell align="center"> {d.obj.name} </TableCell>
                     <TableCell align="center"> {d.obj.python} </TableCell>
                     <TableCell align="center"> {d.obj.Automata} </TableCell>
                     <TableCell align="center"> {d.obj.CN} </TableCell>
                     <TableCell align="center"> {d.obj.DMS} </TableCell>
                     <TableCell align="center"> {d.obj.DBMS} </TableCell>
                     <TableCell align="center"> {d.obj.cnlab} </TableCell>
                     <TableCell align="center"> <Button>edit</Button>  </TableCell>
            
            </TableRow>)
         })}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  )
}
