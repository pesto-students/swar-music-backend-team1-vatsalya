import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userrouter from "./routes/UsersRoute.js";
import authrouter from "./routes/AuthRouter.js";


const app = express();
dotenv.config();
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
    }catch(error){
        throw error;
    }
    };
//middlewares
app.use(express.json());

app.get("/",(req, res) => {

    res.end("Hello Howdy!")
})

app.use("/api/users",userrouter)
app.use("/api/auth",authrouter)
const port = process.env.PORT || 8900
app.listen(port, ()=>{
    connect();
    console.log("Connected to backend!");
});