import PoadCasts from "../models/PoadCasts.js";
import aws  from "aws-sdk";
import crypto from "crypto"
import {s3} from "../index.js";
import { promisify } from "util";
import Users from "../models/Users.js";


const bucketName = "swar-app"
const randomBytes = promisify(crypto.randomBytes)
export const createPoadCasts = async(req, res, next) =>{
    console.log("hello");
    const newPoadCasts = new PoadCasts(req.body);
    try{
        const savedPoadCasts = await newPoadCasts.save();
        res.status(200).json(savedPoadCasts);
    }catch(err){
        next(err);
    }
}

export const getPoadCastsById = async(req, res, next) =>{
    try{
        const getPoadCasts =  await PoadCasts.findById(
             req.params.id);
         res.status(200).json(getPoadCasts);
     }catch(err){
         next(err);
     }
}

export const getAllPoadCasts = async(req, res, next) =>{
    try{
        const getPoadCasts =  await PoadCasts.find();
         res.status(200).json(getPoadCasts);
     }catch(err){
         next(err);
     }
}

export const deletePoadCasts= async(req, res, next) =>{
    try{
        await PoadCasts.findByIdAndDelete(
            req.params.id);
        res.status(200).json("PoadCasts Has been deleted");
    }catch(err){
        next(err);
    }
}
export const retrieveURL = async(req, res, next) =>{
    try{
        const poadCastsName = req.body.name;
        const newPoadCasts = new PoadCasts({
            name: poadCastsName,
            language: req.body.language,
            speaker: req.body.speaker,
            duration: req.body.duration,
            bucket: bucketName

        });
        const params  = ({
            Bucket: bucketName,
            Key: poadCastsName,
            Expires: 60000
        })
        await newPoadCasts.save();
        const uploadURL = await s3.getSignedUrlPromise('putObject',params)
        console.log(uploadURL);
        res.status(200).json(uploadURL);
     }catch(err){
         next(err);
     }
}

export const getAllPoadCastsByName = async(req, res, next) =>{
    try{
        const getAllPoadCasts =  await PoadCasts.find({name: req.params.name});
         console.log(getAllPoadCasts[0].name)
         const url = getUrlFromBucket(getAllPoadCasts[0].name);
         console.log("url---")
         console.log(url);
         res.status(200).json(url);
     }catch(err){
         next(err);
     }
}

export const countAllPoadCast = async(req, res, next) =>{
    try{
        const allPoadCasts = await PoadCasts.count();
        res.status(200).json(allPoadCasts);
    }catch(err){
        next(err);
    }
}

const getUrlFromBucket =(fileName) => {
    return `https://swar-app.s3.ap-south-1.amazonaws.com/${fileName}`
};
//https://swar-app.s3.ap-south-1.amazonaws.com/56d87377147365cbbd96e44d00847daa
//https://swar-app.s3.ap-south-1.amazonaws.com/Kesari01