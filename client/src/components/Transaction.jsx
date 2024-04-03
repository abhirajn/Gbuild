import { Chip, Typography } from '@mui/material'
import React from 'react'

export default function Transaction({from , to , money , check }) {
    console.log(check)
  return (
    <div style={{display : 'flex', border:'solid' ,width: '50%' , height:'40px' , padding:'5px' , margin:'4px'}}>

        <Typography sx={{marginRight:8}} variant='h5' align='center'width={35} >{from}</Typography>
        <Typography sx={{marginRight:8}} variant='h5' align='center'width={35}>---</Typography>
        <Typography sx={{marginRight:8}} variant='h5' align='center'width={35}>{to}</Typography>
        <Chip label={check} sx={{marginRight:8}} width={65} color={check === "Debit" ? 'error' : 'success'}  />
        <Typography sx={{marginRight:0}} variant='h5' align='left'>{money}</Typography>
    </div>
  )
}
