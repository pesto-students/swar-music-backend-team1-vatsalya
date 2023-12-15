import Songs from "../models/Songs.js";
import {s3} from "../index.js";
import Users from "../models/Users.js";
import PlayList from "../models/PlayList.js";
import PlayListSongs from "../models/PlayListSongs.js";


const bucketName = "swar-app"

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

export const createPlayList = async(req, res, next) =>{
    console.log("This is the PlayList");
    const newPlayList = new PlayList(req.body);
    try{
        const savedPlayList = await newPlayList.save();
        res.status(200).json(savedPlayList);
    }catch(err){
        next(err);
    }
}

export const updatePlayList = async(req, res, next) =>{
    try{
        const playList = await PlayList.findByIdAndUpdate(req.params.id, 
            {$set: {'name': req.body.name}},
            {new: true});
            res.status(200).json(playList)
    }catch(err){
        next(err);
    }
}

export const deletePlayList= async(req, res, next) =>{
    try{
        await PlayList.findByIdAndDelete(
            req.params.id);
        res.status(200).json("PlayList Has been deleted");
    }catch(err){
        next(err);
    }
}

export const createPlayListSongs = async(req, res, next) =>{
    console.log("Create all the playList songs");
    const newPlayListSongs = new PlayListSongs(req.body);
    try{
        const savedPlayList = await newPlayListSongs.save();
        res.status(200).json(savedPlayList);
    }catch(err){
        next(err);
    }
}

export const addSongToPlayList = async(req,res,next) =>{
    try{
        return await PlayList.findByIdAndUpdate(
            {_id: req.params.id}, {$push: {songs : req.body}},
            {new: true}).then(function(dbPlayList){
             console.log("dbPlayList---")
             console.log(dbPlayList)
             res.json(dbPlayList);
            })
       
     }catch(err){
        next(err);
    }
  
};

export const getSongsByPlayList = async(req,res,next) =>{
    try{
        let playListSongs = [];
        const playList = await PlayList.findById(req.params.id);
        console.log("playList-------")
        console.log(playList.songs)
        for(let i = 0; i < playList.songs.length; i++){
            const songs = await Songs.findById(playList.songs[i]);
            playListSongs.push(songs)
        }
        console.log(playListSongs);
        const playLists = onlyUnique(playListSongs);
        res.json(playLists);
     }catch(err){
        next(err);
    }
  
};

export const getAllPlayListByUserId = async(req, res, next) =>{
    console.log("This is the PlayList");
    try{
        const getPlayList = await PlayList.find({'user_id':req.params.id});
        res.status(200).json(getPlayList);
    }catch(err){
        next(err);
    }
}

export const getAllSongsByPlayListId = async(req, res, next) =>{
    console.log("This is the PlayList");
    try{
        const getAllSongsByPlayList = await Songs.find({'song_id':req.params.song_id, 'id': req.params.id});
        res.status(200).json(getAllSongsByPlayList);
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

const onlyUnique = (array) => {
    return array.filter((v,i,a)=>a.findIndex(v2=>(JSON.stringify(v2) === JSON.stringify(v)))===i)

  }
