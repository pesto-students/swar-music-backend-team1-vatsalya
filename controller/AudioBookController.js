import AudioBooks from "../models/AudioBooks.js";
import {s3} from "../index.js";

const bucketName = "swar-app"
export const createAudioBooks = async(req, res, next) =>{
    console.log("hello");
    const newAudioBooks = new AudioBooks(req.body);
    try{
        const savedAudioBooks = await newAudioBooks.save();
        res.status(200).json(savedAudioBooks);
    }catch(err){
        next(err);
    }
}

export const getAudioBooksById = async(req, res, next) =>{
    try{
        const getAudioBooks =  await AudioBooks.findById(
             req.params.id);
         res.status(200).json(getAudioBooks);
     }catch(err){
         next(err);
     }
}

export const getAllAudioBooks = async(req, res, next) =>{
    try{
        const getAudioBooks =  await AudioBooks.find();
         res.status(200).json(getAudioBooks);
     }catch(err){
         next(err);
     }
}

export const deleteAudioBooks= async(req, res, next) =>{
    try{
        await AudioBooks.findByIdAndDelete(
            req.params.id);
        res.status(200).json("AudioBooks Has been deleted");
    }catch(err){
        next(err);
    }
}
export const retrieveURL = async(req, res, next) =>{
    try{
        const audioBooksName = req.body.name;
        const newAudioBooks = new AudioBooks({
            name: audioBooksName,
            language: req.body.language,
            writter: req.body.writter,
            duration: req.body.duration,
            bucket: bucketName

        });
        const params  = ({
            Bucket: bucketName,
            Key: audioBooksName,
            Expires: 60000
        })
        await newAudioBooks.save();
        const uploadURL = await s3.getSignedUrlPromise('putObject',params)
        console.log(uploadURL);
        res.status(200).json(uploadURL);
     }catch(err){
         next(err);
     }
}

export const getAllAudioBooksByName = async(req, res, next) =>{
    try{
        const getAllAudioBooks =  await AudioBooks.find({name: req.params.name});
         console.log(getAllAudioBooks[0].name)
         const url = getUrlFromBucket(getAllAudioBooks[0].name);
         console.log("url---")
         console.log(url);
         res.status(200).json(url);
     }catch(err){
         next(err);
     }
}

export const countAllAudioBooks = async(req, res, next) =>{
    try{
        const allAudioBooks = await AudioBooks.count();
        res.status(200).json(allAudioBooks);
    }catch(err){
        next(err);
    }
}

const getUrlFromBucket =(fileName) => {
    return `https://swar-app.s3.ap-south-1.amazonaws.com/${fileName}`
};
//https://swar-app.s3.ap-south-1.amazonaws.com/56d87377147365cbbd96e44d00847daa
//https://swar-app.s3.ap-south-1.amazonaws.com/Kesari01