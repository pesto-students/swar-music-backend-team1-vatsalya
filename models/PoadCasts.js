import mongoose from "mongoose";
const {Scheme} = mongoose;

const PoadCasts = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required: true
    },
    speaker:{
        type:String,
        required: true
    },
    duration:{
        type:String,
        required: true
    },
    bucket:{
        type:String,
    }
},
{timestamps:true});
export default mongoose.model("PoadCasts", PoadCasts);