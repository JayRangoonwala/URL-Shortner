import { Router } from 'express';
import { handleUserSignup,handleUserLogin } from '../controller/auth.js';
import { handleAuth } from '../middlewares/auth.js';
import { getUser } from '../controller/getUser.js';
import { handleLogout } from '../controller/userLogout.js';

export const userrouter = Router();

userrouter.post("/signup", handleUserSignup);

userrouter.post("/login",handleUserLogin);

userrouter.get("/getuser",handleAuth,getUser);

userrouter.post("/loggout",handleAuth,handleLogout);