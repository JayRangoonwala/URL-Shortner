import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Secret_key = process.env.SECRET_KEY;

export const setToken = (payload,option) => {
    return jwt.sign(payload , Secret_key , option);
}

export const getToken = (req,res) => {

    const token = req.cookies?.uid;
    
    if(!token){
        console.log("No Token");
        return res.status(400).json({LoginError:"Please Login !!!"});
    }
    try {
        const decoded = jwt.verify(token, Secret_key);
        console.log("Token verified:", decoded);
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error.message);
        throw new Error("Invalid token!");
    }
}