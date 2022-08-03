import express from "express";
import mongoose from "mongoose";

const app = express();


//middlewares
app.use(express.json());

app.get("/howdy",(req, res) => {

    res.end("Hello Howdy!")
})

app.listen(8800, ()=>{
    console.log("Connected to backend!");
});