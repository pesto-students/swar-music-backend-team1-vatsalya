import express from "express";
import { createPoadCasts, getPoadCastsById, getAllPoadCasts, deletePoadCasts, retrieveURL, getAllPoadCastsByName, countAllPoadCast} from "../controller/PoadCastController.js";
import { verifyAdmin,verifyUser } from "../utils/verifyToken.js";

const poadCastRouter = express.Router();


//CREATE
poadCastRouter.post("/",verifyUser,createPoadCasts);

//DELETE
poadCastRouter.delete("/:id",verifyUser,deletePoadCasts);

//GET
poadCastRouter.get("/:id",verifyUser,getPoadCastsById);

//GET ALL
poadCastRouter.get("/",getAllPoadCasts);


poadCastRouter.put("/upload/retrieve",retrieveURL);

//GET ALL BY NAME
poadCastRouter.get("/name/:name",getAllPoadCastsByName);

//COUNT ALL POADCAST
poadCastRouter.get("/count/all",verifyUser,countAllPoadCast);

export default poadCastRouter;