import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userrouter from "./routes/UsersRoute.js";
import authrouter from "./routes/AuthRouter.js";
import cookieParser from "cookie-parser";
import songsrouter from "./routes/SongsRouter.js";
import aws  from "aws-sdk";
import cors from "cors";




const app = express();
app.use(cors());
dotenv.config();

const region = "ap-south-1"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

export const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
    }catch(error){
        throw error;
    }
    };

app.get("/",(req, res) => {

    res.end("Hello Howdy!")
})

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use("/api/users",userrouter)
app.use("/api/auth",authrouter)
app.use("/api/songs",songsrouter)

app.use((err,req,res,next) =>{
    const errorMessage = err.message || "Hello error from handler";
    const errorStatus = err.status || 500;
    return res.status(errorStatus).json({
        success: false,
        message:errorMessage 
    }
    )
 })
 
const port = process.env.PORT || 8900
app.listen(port, ()=>{
    connect();
    console.log("Connected to backend!");
});