import Users from "../models/Users.js";
import { createError } from "../utils/error/error.js";

export const createUser = async(req, res, next) =>{
    const newUser = new Users(req.body);
    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }catch(err){
        next(err);
    }
}

export const updateUser = async(req, res, next) =>{
    try{
        const update = await Users.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body},
            {new: true});
        res.status(200).json(update);
    }catch(err){
        next(err);
        res.status(500).json(err);
    }
}

export const getUserById = async(req, res, next) =>{
    try{
        const User =  await Users.findById(
             req.params.id);
         res.status(200).json(User);
     }catch(err){
         next(err);
     }
}

export const getAllUser = async(req, res, next) =>{
    try{
        const User =  await Users.find();
        res.status(200).json(User);
        // if(req.user.isAdmin){
        //     const User =  await Users.find();
        //     res.status(200).json(User);
        // }else{
        //     return next(createError(403, "You are forbidden!"));
        // }
     }catch(err){
         next(err);
     }
}


export const deleteUser= async(req, res, next) =>{
    try{
        await Users.findByIdAndDelete(
            req.params.id);
        res.status(200).json("User Has been deleted");
    }catch(err){
        next(err);
    }
}