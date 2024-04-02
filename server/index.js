const express = require('express')
const {db} = require('./firebaseConfig')
const {firedb} = require('./firebaseConfig')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const { getAuth } = require('firebase/auth')
const cors = require('cors')

const app = express();
const auth = getAuth();

app.use(cors())
app.use(express.json())


app.use('/api' , authRoutes)
app.use('/user' , userRoutes)



app.get('/protected' , (req,res,next)=>{
// console.log(auth.currentUser)
    res.send(auth.currentUser)
})
app.get('/*' , (req, res, next)=>{
    res.send("<h1>404 ERROR</h1>")
})
app.listen(3000, ()=>{
    console.log("port listening")
});