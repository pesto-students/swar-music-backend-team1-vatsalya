import Songs from "../models/Songs.js";
import aws  from "aws-sdk";
import crypto from "crypto"
import {s3} from "../index.js";
import { promisify } from "util";


const bucketName = "swar-app"
const randomBytes = promisify(crypto.randomBytes)
export const createSong = async(req, res, next) =>{
    console.log("hello");
    const newSongs = new Songs(req.body);
    try{
        const savedSong = await newSongs.save();
        res.status(200).json(savedSong);
    }catch(err){
        next(err);
    }
}

export const getSongById = async(req, res, next) =>{
    try{
        const Song =  await Songs.findById(
             req.params.id);
         res.status(200).json(Song);
     }catch(err){
         next(err);
     }
}

export const getAllSongs = async(req, res, next) =>{
    try{
        const Song =  await Songs.find();
         res.status(200).json(Song);
     }catch(err){
         next(err);
     }
}

export const deleteSong= async(req, res, next) =>{
    try{
        await Songs.findByIdAndDelete(
            req.params.id);
        res.status(200).json("Song Has been deleted");
    }catch(err){
        next(err);
    }
}
export const retrieveURL = async(req, res, next) =>{
    try{
        const songsName = req.body.name;
        const newSongs = new Songs({
            name: songsName,
            language: req.body.language,
            artist: req.body.artist,
            bucket: bucketName

        });
        const params  = ({
            Bucket: bucketName,
            Key: songsName,
            Expires: 60000
        })
        await newSongs.save();
        const uploadURL = await s3.getSignedUrlPromise('putObject',params)
        console.log(uploadURL);
        res.status(200).json(uploadURL);
     }catch(err){
         next(err);
     }
}