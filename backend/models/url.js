import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortid : {
        type : String,
        required : true,
        unique : true,
    },
    redirecturl:{
        type : String,
        required : true
    },
    visited:[{
        timestamp:{
            type:Number
        }
    }]
},
{timestamps: true,}
);

export const URL = mongoose.model("url",urlSchema);
