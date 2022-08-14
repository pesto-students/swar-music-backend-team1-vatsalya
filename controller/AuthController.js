import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error/error.js";
import jwt from "jsonwebtoken";

export const register = async(req, res, next) =>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            gender:req.body.gender
        })
        await newUser.save();
        res.status(200).send("User has been created");
    }catch(err){
        next(err);
    }
}

export const login = async(req, res, next) =>{
    try{
        const user = await Users.findOne({username:req.body.username})
        if(!user){
            return next(createError(404,"User not found!"))}
        const isPassword = await bcrypt.compare(req.body.password, user.password);
        console.log(isPassword);
        if(!isPassword){
            return next(createError(404,"Wrong password or username!"))}
        
        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin, username: user.username}, process.env.JWT, {
            expiresIn: '2hr'
 
       });
        res.send(token);
    }catch(err){
        next(err);
    }
}