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
    }],
    createdby:{
        type: String,
        required : true
    }
},
{timestamps: true,}
);

export const URL = mongoose.model("url",urlSchema);
