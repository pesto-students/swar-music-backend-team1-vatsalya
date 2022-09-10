import mongoose from "mongoose";
const {Scheme} = mongoose;

const AudioBookSchmema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    language:{
        type:String,
        required: true
    },
    writter:{
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
export default mongoose.model("AudioBooks", AudioBookSchmema);