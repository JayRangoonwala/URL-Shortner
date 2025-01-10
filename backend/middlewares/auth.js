import { getToken } from "../controller/jwt.js";

export const handleAuth = (req,res,next) => {
    try{
        const user = getToken(req,res)
        req.user = user;
        next();
    }
    catch(error) {
        res.status(401).json({ error: error.message });
    }
}