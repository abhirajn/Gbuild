import { Chip, Table, TableCell } from '@mui/material'
import React from 'react'

export default function Transaction({from , to , money , check }) {
    console.log(check)
  return (
 <>

        <TableCell sx={{marginRight:8}} variant='h5' align='center'width={35} >{from}</TableCell>
        <TableCell sx={{marginRight:8}} variant='h5' align='center'width={35}>---</TableCell>
        <TableCell sx={{marginRight:8}} variant='h5' align='center'width={35}>{to}</TableCell>
        <Chip label={check} sx={{marginRight:8}} width={65} color={check === "Debit" ? 'error' : 'success'}  />
        <TableCell sx={{marginRight:0}} variant='h5' align='left'>{money}</TableCell>
        </>
  )
}
