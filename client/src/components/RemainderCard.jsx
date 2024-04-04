import { Autocomplete, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

export default function RemainderCard({prop , handleedit, handledone}) {
  return (
    <div style={{margin:'5px' , border:'dashed'}}>
         <Card sx={{ minWidth: 250 , minHeight : 100 , maxHeight:300}}>
      {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {prop.obj.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
        {prop.obj.description}
        </Typography>
        <Typography variant="h6" color="text.secondary" >
        {prop.obj.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='outlined' onClick={()=>{handleedit(prop)}}>Edit</Button>
        <Button size="small" color='success' variant='outlined' onClick={()=>{handledone(prop)}}>Done</Button>
      </CardActions>
    </Card>
    </div>
  )
}
