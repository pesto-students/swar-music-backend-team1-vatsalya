import Songs from "../models/Songs.js";
import aws  from "aws-sdk";
import crypto from "crypto"
import {s3} from "../index.js";
import { promisify } from "util";
import Users from "../models/Users.js";


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

export const postAllSongsByPlaylist = async(req, res, next) =>{
    try{
        const user = await Users.findById(req.body.userId);
        const existingPlaylists = user.playlists;
        existingPlaylists.push({
            name: req.body.name,
            songs: req.body.songs,
    });
    const updateUser = await Users.findByIdAndUpdate(req.body.userId, {
        playlists: existingPlaylists
    })
         res.status(200).json(updateUser);
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
            duration: req.body.duration,
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

export const getAllSongByName = async(req, res, next) =>{
    try{
        const Song =  await Songs.find({name: req.params.name});
         console.log(Song[0].name)
         const url = getUrlFromBucket(Song[0].name);
         console.log("url---")
         console.log(url);
         res.status(200).json(url);
     }catch(err){
         next(err);
     }
}

export const countAllSongs = async(req, res, next) =>{
    try{
        const allSongs = await Songs.count();
        res.status(200).json(allSongs);
    }catch(err){
        next(err);
    }
}

const getUrlFromBucket =(fileName) => {
    return `https://swar-app.s3.ap-south-1.amazonaws.com/${fileName}`
};
//https://swar-app.s3.ap-south-1.amazonaws.com/56d87377147365cbbd96e44d00847daa
//https://swar-app.s3.ap-south-1.amazonaws.com/Kesari01