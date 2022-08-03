import express from "express";
import { createUser,updateUser, getUserById, getAllUser, deleteUser} from "../controller/UsersController.js";

const userrouter = express.Router();

userrouter.get("/checkauthentication",(req, res) =>{
    res.send("You are logged in!");
})

userrouter.post("/",createUser);

// UPDATE
userrouter.put("/:id",updateUser);

//DELETE
userrouter.delete("/:id",deleteUser);

//GET
userrouter.get("/:id",getUserById);

//GET ALL
userrouter.get("/",getAllUser);

export default userrouter;