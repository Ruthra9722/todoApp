import mongoose from 'mongoose';

const todoSchema= new mongoose.Schema({
    ID:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    activity:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','ongoing','completed'],
        default:'pending'
    },
    time:{
        type:String
    }
})

var Todo=mongoose.model('Todo',todoSchema)

export default Todo