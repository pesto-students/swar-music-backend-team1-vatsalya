import express from "express";
import { createUser,updateUser, getUserById, getAllUser, deleteUser} from "../controller/UsersController.js";
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

export default userrouter;