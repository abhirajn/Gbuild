import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';

export default function Chart({present , total , name}) {
    const percentage = ((present/total)*100 )
  return (
    <div style={{border : 'solid' , width: '30%'}}>
            <Typography sx={{mx : 2}}>{name}</Typography>
    <PieChart
    name={name}
      series={[
        {
          data: [
            { id: 0, value: present, label: 'Present',color: 'green' },
            { id: 1, value: total, label: 'Absent',color: 'red' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
     <Typography sx={{mx : 2}} align='right'>{percentage.toFixed(2)}{" %"}</Typography>
    </div>
  );
}
