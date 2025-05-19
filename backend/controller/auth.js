import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import {setToken} from './jwt.js';

export const handleUserSignup = async (req, res) => {
  const { email, username, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const createUser = await User.create({
      email,
      username,
      password: hashPassword,
    });
    return res.status(200).json({ success: true, data: createUser });
  } catch (error) {
    if (error.name === "ValidationError") {

      const messages = Object.values(error.errors).map((err) => err.message);

      res.status(400).json({ success: false, errors: messages });
    } else {

      res
        .status(500)
        .json({ success: false, errors: "Email Already Exist !!" });
    }
  }
};

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid Email !!" });
    }

    const checkpassword = await bcrypt.compare(password, user.password);

    if (!checkpassword) {
      return res.status(400).json({ error: "Invalid Password !!" });
    }

    const token = setToken({id: user._id , username: user.username},{expiresIn:"1h"})

    if(!token){
        return res.status(400).json({ error: "Problem In Login" });
    }
    res.cookie("uid",token,{
      httpOnly: false,  // Prevent client-side access
      secure: true,  // Set to true in production (requires HTTPS) 
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    return res
      .status(200)
      .json({ message: "Login Successful !!", token: token });
  } catch (error) {
    if (error.name === "ValidationError") {

      const messages = Object.values(error.errors).map((err) => err.message);

      res.status(400).json({ error: messages });
    }else{
      return res.status(500).json({ error: error });
    }
  }
};