import express from "express";
import { createAudioBooks, getAudioBooksById, getAllAudioBooks, deleteAudioBooks, retrieveURL, getAllAudioBooksByName, countAllAudioBooks} from "../controller/AudioBookController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const audioBooksrouter = express.Router();


//CREATE
audioBooksrouter.post("/",verifyUser,createAudioBooks);

//DELETE
audioBooksrouter.delete("/:id",verifyUser,deleteAudioBooks);

//GET
audioBooksrouter.get("/:id",verifyUser,getAudioBooksById);

//GET ALL
audioBooksrouter.get("/",verifyAdmin,getAllAudioBooks);


audioBooksrouter.put("/upload/retrieve",retrieveURL);

//GET ALL BY NAME
audioBooksrouter.get("/name/:name",verifyUser,getAllAudioBooksByName);

//COUNT ALL BY AUDIOBOOKS
audioBooksrouter.get("/count/all",verifyUser,countAllAudioBooks);

export default audioBooksrouter;