import express from 'express';
import {register,login,addtodo,updatetodo,getme, updatestatus} from '../controller/userController.js';
import auth from '../middleware/auth.js';

const route=express.Router()

route.post('/register',register)
route.post('/login',login)
route.post('/addtodo',auth,addtodo)
route.post('/updatetodo',updatetodo)
route.get('/getme',auth,getme)
route.put('/updatestatus',updatestatus)

export default route;