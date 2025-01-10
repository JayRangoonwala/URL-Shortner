import mongoose from 'mongoose';
import validator from 'validator';

const userSchma = new mongoose.Schema({
    email:{
        type: String,
        required : true,
        unique : true,
        validate : [validator.isEmail]
    },
    username:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true,
    }
},{timestamps:true})

export const User = mongoose.model('User',userSchma);