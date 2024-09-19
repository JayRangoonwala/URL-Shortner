import mongoose from "mongoose";

export async function Connect(url){
    mongoose.connect(url);
};