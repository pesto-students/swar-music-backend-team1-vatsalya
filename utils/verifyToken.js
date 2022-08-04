import jwt from "jsonwebtoken";
import { createError } from "./error/error.js";

export function verifyToken(req,res,next){
    const token = req.header('Authorization');
    if(token) {
        return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT, (err, user) =>{
        if(err){
            return res.status(403).send("You are not authenticated!");
            // return next(createError(403, "Token is not valid!"));
        }
        req.user = user;
        next();
    })

};

export function verifyUser(req, res,next){
    verifyToken(req,res,next, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "You are forbidden!"));
        }
    })
}

export function verifyAdmin(req, res,next){
    verifyToken(req,res,next, () =>{
        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "You are forbidden!"));
        }
    })
}


