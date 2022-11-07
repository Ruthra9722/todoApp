import User from "../model/UserSchema.js"
import Todo from "../model/TodoSchema.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const getr=async(req,res)=>{
    res.send('route working')
}

const register=async(req,res)=>{
    let name=req.body.name;
    let userName=req.body.userName;
    let password=req.body.password;

    try {
        const edata=await User.findOne({userName:userName})
        if(edata) return res.send("User Name is already used")
        const salt_routes=10;
        bcrypt.hash(password,salt_routes,async function(err,hash){
            const data= await User.insertMany({
                name,
                userName,
                password:hash,
            })
            if(data) return res.send('User Addedd')
        })
    } catch (error) {
        return res.send(error.message)
    }
}

const login=async(req,res)=>{
    let userName=req.body.userName;
    let pwd=req.body.pwd;
    try {
        const data= await User.findOne({userName:userName})
        if(data){
        bcrypt.compare(pwd,data.password,async function(err, result){
            if(result==true){
                const token=jwt.sign({_id:data._id},''+process.env.SECRET)
                // return res.header({'x-auth-token':token}).send('welcome '+data.name)
                // localStorage.setItem(token)
                return res.send(token)
                // return res.send(data)
            }
            return res.send("Please enter correct id and password")
        })
    }
    else{
        return res.send("No user on that name")
    }
    } catch (error) {
       return res.send(error.message)
    }
}

const addtodo=async(req,res)=>{
    const user=req.user._id
    const activity=req.body.activity
    let ID
    
    try {
        let tid=await Todo.find().count()
        if(tid==0) ID=1;
        else{
            let tid1=await Todo.findOne().sort({ID:-1})
            // console.log(tid1.ID);
            ID=Number(tid1.ID)+1
        }
        let data=await Todo.insertMany({
            ID,
            user,
            activity
        })
        if(data) return res.send(data)
    } catch (error) {
        return res.send(error.message)
    }
}

const updatetodo=async(req,res)=>{
    const time=req.body.time
    const ID=req.body.ID

    try {
        const ftodo=await Todo.findOne({ID:ID})
        if (!ftodo) return res.send("no activity on that ID")
        const data=await Todo.updateOne({ID:ID},{$set:{
            time,
            status:'completed'
        }})
        if(data) return res.send('updated successfully')

    } catch (error) {
        return res.send(error.message)
    }
}

const updatestatus=async(req,res)=>{
    const ID=req.body.ID

    try {
        const ftodo=await Todo.findOne({ID:ID})
        if (!ftodo) return res.send("no activity on that ID ")
        const data=await Todo.updateOne({ID:ID},{$set:{
            status:'ongoing'
        }})
        if(data) return res.send('updated successfully')

    } catch (error) {
        return res.send(error.message)
    }
}

const getme=async(req,res)=>{
    let _id=req.user._id

    try {
        const data=await User.findOne({_id:_id})
        const todos=await Todo.find({user:_id})
        if(data){
            if(todos) return res.send({name:data.name,todo:todos})
        }
    } catch (error) {
        return res.send(error.message)
    }
}

export {getme,register,login,addtodo,updatetodo,updatestatus}