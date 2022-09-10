import express from "express";
import { createUser,updateUser, getUserById, getAllUser, deleteUser, countAllUsers,countUsersByCountry,submitFeedBack} from "../controller/UsersController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const userrouter = express.Router();

userrouter.get("/checkauthentication",verifyToken,(req, res) =>{
    res.send("You are logged in!");
})

userrouter.post("/",verifyUser,createUser);

// UPDATE
userrouter.put("/:id",verifyUser,updateUser);

//DELETE
userrouter.delete("/:id",verifyUser,deleteUser);

//GET
userrouter.get("/:id",verifyUser,getUserById);

//GET ALL
userrouter.get("/",verifyAdmin,getAllUser);

//COUNT ALL USERS
userrouter.get("/count/all",verifyUser,countAllUsers);

//COUNT ALL USERS By COUNTRY
userrouter.get("/country/count/all",verifyUser,countUsersByCountry);

//Fill FEEDBACK
userrouter.post("/feedBack/:id",submitFeedBack);

export default userrouter;