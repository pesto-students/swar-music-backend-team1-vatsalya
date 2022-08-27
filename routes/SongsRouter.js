import express from "express";
import { createSong, getSongById, getAllSongs, deleteSong, retrieveURL, getAllSongByName, postAllSongsByPlaylist} from "../controller/SongsController.js";
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
songsrouter.get("/",verifyAdmin,getAllSongs);

//GET ALL SONGS BY PLAYLIST
songsrouter.post("/post/playlist",verifyUser,postAllSongsByPlaylist);

songsrouter.put("/upload/retrieve",retrieveURL);

//GET ALL BY NAME
songsrouter.get("/name/:name",getAllSongByName);

export default songsrouter;