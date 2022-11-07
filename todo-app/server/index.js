import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import user from './routes/user.js'

const app=express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// mongoose.connect('mongodb://localhost/banking')

mongoose.connect('mongodb+srv://Ruthra:9787@cluster0.bscpdse.mongodb.net/?retryWrites=true&w=majority')

.then(()=>console.log('db connected'))
.catch((e)=>console.log('error'))


app.use('/api/user',user);
app.get('/',(req,res)=>{res.send('server connected')})
const port=process.env.PORT || 3002
app.listen(port,()=>{
    console.log(`server running at ${port}`);
})