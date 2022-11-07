import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    userName:{type:String,required:true},
    password:{type:String,required:true},
})

var User=mongoose.model('User',userSchema)

export default User