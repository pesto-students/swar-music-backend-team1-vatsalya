import express from "express";
import { createSong, getSongById, getAllSongs, deleteSong, retrieveURL, getAllSongByName, createPlayList, countAllSongs,getAllPlayListByUserId,
    getAllSongsByPlayListId,
    createPlayListSongs, addSongToPlayList, getSongsByPlayList, deletePlayList, updatePlayList} from "../controller/SongsController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const songsrouter = express.Router();

songsrouter.get("/checkauthentication",verifyToken,(req, res) =>{
    res.send("You are logged in!");
})

//CREATE
songsrouter.post("/",verifyUser,createSong);

//DELETE
songsrouter.delete("/:id",verifyUser,deleteSong);

//GET
songsrouter.get("/:id",verifyUser,getSongById);

//GET ALL
songsrouter.get("/",getAllSongs);

//UPLOAD RETRIEVE
songsrouter.put("/upload/retrieve",retrieveURL);

//GET ALL BY NAME
songsrouter.get("/name/:name",verifyUser,getAllSongByName);

//COUNT ALL SONGS
songsrouter.get("/count/all",verifyUser,countAllSongs);

//CREATE PLAYLIST
songsrouter.post("/post/playlist",verifyUser,createPlayList);

//UPDATE PLAYLIST
songsrouter.put("/update/playlist/:id",updatePlayList);

//DELETE PLAYLIST
songsrouter.delete("/playList/:id",deletePlayList);

//GET ALL PLAYLIST
songsrouter.get("/get/playlist/:id",verifyUser,getAllPlayListByUserId);

//GET ALL PLAYLIST BY ID
songsrouter.get("/get/songs/playlist/:song_id/:id",verifyUser,getAllSongsByPlayListId);

//CREATE ALL PLAYLIST BY SONGS
songsrouter.post("/create/playlist/songs",verifyUser,createPlayListSongs);

//GET ALL PLAYLIST BY SONGS
songsrouter.get("/find/playlist/songs/:id",verifyUser,getSongsByPlayList);

//GET ALL PLAYLIST BY SONGS
songsrouter.post("/add/playlist/songs/:id",addSongToPlayList);

export default songsrouter;