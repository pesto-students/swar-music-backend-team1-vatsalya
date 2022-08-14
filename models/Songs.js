import mongoose from "mongoose";
const {Scheme} = mongoose;

const SongsSchmema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    language:{
        type:String,
        required: true
    },
    artist:{
        type:String,
        required: true
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    bucket:{
        type:String,
    }
},
{timestamps:true});
export default mongoose.model("Songs", SongsSchmema);