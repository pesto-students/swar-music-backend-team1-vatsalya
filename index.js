import express from "express";
import mongoose from "mongoose";

const app = express();


//middlewares
app.use(express.json());

app.get("/howdy",(req, res) => {

    res.end("Hello Howdy!")
})
const port = process.env.PORT || 8800
app.listen(port, ()=>{
    console.log("Connected to backend!");
});